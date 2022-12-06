
import jwt_decode from "jwt-decode";
import { Avatar, Button, Paper, Grid, Container, Typography, styled} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import Input from './Input';
import { Navigate, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'


const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  });
const StyledAvatar = styled(Avatar)({
    margin: 1,
    backgroundColor: "red"
  });
const initState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = (props) => {
    const [ user, setUser ] = useState({});

    function handleCall(res) {
        console.log("Encoded token: " + res.credential);
        var userObj = jwt_decode(res.credential); // holds all the user info
        console.log(userObj);
        setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
    }

    function signOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "32372470210-brjbikf0p0gq4ps68prkq41hcb9mp2u2.apps.googleusercontent.com",
            callback: handleCall
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline" }
        );
    }, []);

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword]= useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
  

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup)=> !prevIsSignup);
    handleShowPassword(false);
  };
  const [addUser] = useMutation(REGISTER_USER, {
    update(_, result){
        console.log(result)
        navigate("/")
    },
    onError(err){
        console.log(err.graphQLErrors[0].extensions.exception.errors);
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData
  })
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result){
        console.log(result)
        navigate("/")
    },
    onError(err){
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? addUser() : loginUser();
  }

  return (
    <Container component="main" maxWidth="xs">
        <StyledPaper elevation={3}>
            <StyledAvatar>
                <LockOutlined></LockOutlined>
            </StyledAvatar>
            <Typography variant='h6'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label="Last Name" handleChange={handleChange} half/>
                                <Input name='username' label="Username" handleChange={handleChange}/>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                
                <div id="signInDiv"></div>
                {Object.keys(user).length !== 0 &&
                    <button onClick={(e) => signOut(e)}>Sign Out</button>
                }
                {user &&
                    <div>
                        <img src={ user.picture }></img>
                        <h2>{ user.name }</h2>
                    </div>
                }
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Have an account? Sign in' : "Don't have an account? Sign up"}
                        </Button>
                    </Grid>
                </Grid>
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
            email: $username
            password: $password
        ) {
            id username email token firstName lastName registerDate
        }
    }

`

export default Auth;