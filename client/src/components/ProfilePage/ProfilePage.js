
import {Button, Paper, Container, Typography, styled, Box, TextField} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../../context/auth'
import gql from 'graphql-tag'
import {useMutation, useQuery} from '@apollo/client'


const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    
  });


const initState = {};

const ProfilePage = () => {
  
    const {user,logout} = useContext(AuthContext);
    const {loading, error, userData} = useQuery(GET_USER, {variables: ({userId: user.id})});
    console.log(user.id);
    console.log(userData);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(initState);
    const navigate = useNavigate();
 
  const [updateUser] = useMutation(EDIT_USER, {
    update(_, result){
        console.log(result)
        navigate("/")
    },
    variables: ({
      editProfileId: user.id,
      editProfileInput: {
        bio: formData['bio'],
        firstName: formData['firstName'],
        lastName: formData['lastName']
      }
    }
    )
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser();
  }
  return (
    <Container component="main" maxWidth='lg' >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'grey.200', m: 1, border: 3, borderColor: 'secondary.main',  borderRadius: '5px'}}>
            <Typography sx={{ml: 20, mr: 20}} variant='h3'>Profile</Typography>
        </Box>
        
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>First Name: {user.firstName}</Typography>
        <TextField name = "firstName" fullWidth label="Edit First Name" onChange={onChange}></TextField>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Last Name: {user.lastName}</Typography>

        <TextField name = "lastName" fullWidth label="Edit Last Name" onChange={onChange}></TextField>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Username: {user.username}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Email: {user.email}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Bio:</Typography>
        <TextField name = "bio" fullWidth label="Edit Bio" onChange={onChange}></TextField>
        <p className="Bio">{user.bio}</p>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Date registered: {user.createdAt}</Typography>
        <Button type="submit"  fullwidth variant="contained" color='primary'>Edit Profile</Button>
        </form>
    </Container>
    
  )
}

const EDIT_USER = gql`
  mutation editProfile(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $bio: String
  ) {
   editProfile(
      id: $editProfileId
    editProfileInput: {
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    }
   ) {
    id username email token firstName lastName registerDate
   }
  }

`
const GET_USER = gql `
query Query($userId: ID!) {
  user(id: $userId) {
    bio
    email
    firstName
    lastName
    registerDate
    username
  }
}
`
export default ProfilePage;