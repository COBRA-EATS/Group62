import React, {useEffect, useState, useContext} from 'react'
import jwt_decode from "jwt-decode";
import { Avatar, Button, Paper, Grid, Container, Typography, styled} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Input from './Input';
import { Navigate, useNavigate } from "react-router-dom";
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import { AuthContext } from "../../context/auth";

const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  });
  
const initState = {firstName: '', lastName: '', bio : ''};

const Auth = (props) => {
    const context=useContext(AuthContext);
    const [ user, setUser ] = useState({});

    function handleCall(res) {
        console.log("Encoded token: " + res.credential);
        var userObj = jwt_decode(res.credential); // holds all the user info
        console.log(userObj);
        setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
    }



  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
  

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const [editProfile] = useMutation(EDIT_PROFILE, {
    update(_, {data: {register: userData}}){
        context.login(userData)
        navigate("/")
    },
    onError(err){
        console.log(err.graphQLErrors[0].extensions.exception.errors);
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    editProfile();
  }

  return (
    <Container component="main" maxWidth="xs">
        <StyledPaper elevation={3}>
            <Typography variant='h6'>Edit Profile</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name='firstName' label="New First Name" handleChange={handleChange} autoFocus half/>
                    <Input name='lastName' label="New Last Name" handleChange={handleChange} half/>
                    <Input name="bio" label="New Bio" handleChange={handleChange} type="email"/>
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary'>Confirm Changes</Button>
            </form>
        </StyledPaper>

    </Container>
  )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                firstName: $firstName
                lastName: $lastName
                password: $password
                confirmPassword: $confirmPassword

            }
        ) {
            id username email token firstName lastName registerDate
        }
    }

`
const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            id username email token firstName lastName registerDate
        }
    }

`

export default Auth;