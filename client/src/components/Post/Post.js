import {Button, Paper, Grid, Container, Typography, styled, TextField, Box} from '@mui/material';
import { Link, Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useState, useContext} from 'react'
import gql from 'graphql-tag'

import { bgcolor } from '@mui/system';

const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    
  });


const Post = () => {
    const {user,logout} = useContext(AuthContext);
  return (
    <Container component="main" maxWidth='lg'>
        <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'grey.500', m: 1, border: 3, borderColor: 'secondary.main',  borderRadius: '16px'}}>
            <Typography sx={{ml: 20, mr: 20}} variant='h3'>Profile</Typography>
        </Box>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Name: {user.firstName} {user.lastName}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Username: {user.username}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Email: {user.email}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Bio:</Typography>
        <p className="Bio">{user.bio}</p>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Date registered:</Typography>
        <Button component={Link} to="/profile/edit" variant="contained" color='primary'>Edit Profile</Button>
    </Container>
  )
}

export default Post;