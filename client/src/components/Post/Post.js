import {Avatar, Button, Paper, Grid, Container, Typography, styled, TextField, Box} from '@mui/material';
import { Link, Navigate, useNavigate} from "react-router-dom";
import React, {useEffect, useState, useContext} from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const StyledAvatar = styled(Avatar)({
  margin: 0,
  backgroundColor: "#B64955"
});

const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'normal',
    padding: 0,
    justifyContent: 'center',
    
  });

const Post = () => {
  const like = () =>{
    console.log(isLiked);
    isLiked = true;
  }
  const unlike = () =>{
    console.log(isLiked);
    isLiked = false;
  }
  var isLiked = false;
  const likeButton = isLiked ? (
    <Button variant="outlined" color='secondary'>
          Like
          <ThumbUpAltIcon/>
           1
    </Button>
  ) : (
    <Button variant="outlined" color='secondary'>
          Like
          <ThumbUpOffAltIcon/>
           1
    </Button>
  )
  return (
    <Container component="post" maxWidth='md'>
      <StyledPaper elevation={2}>
        <Typography sx={{ml: 0, mr: 0}} variant='h5'>Title: {}</Typography>
        <p className="description">Description: {}</p>
        <p className="ingredients">Ingredients: {}</p>
        <p className="steps">Steps: {}</p>
        <Typography sx={{ml: 0, mr: 0}} variant='body1'>Date Created: {}</Typography>
        <Typography sx={{ml: 0, mr: 0}} variant='body1'>By: {}</Typography>
        {isLiked ? 
          <Button variant="outlined" color='secondary' onClick={unlike}>
              Unlike
              <ThumbUpAltIcon/>
            1
          </Button> :
          <Button variant="outlined" color='secondary' onClick={like}>
              Like
              <ThumbUpOffAltIcon/>
            1
          </Button>
        }
        </StyledPaper>
    </Container>
  )
}

export default Post;