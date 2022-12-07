
import {Button, Paper, Grid, Container, Typography, styled, TextField, Box} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'



const StyledPaper = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    
  });

  const StyledPaperList = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  });

const initState = {name: '', description: '', ingredients: '', steps: ''};


const CreatePost = (props) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();
 
  const [createPost] = useMutation(CREATE_RECIPE, {
    update(_, result){
        console.log('create post')
        navigate("/")
    },
    variables: formData
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log('test');
    e.preventDefault();
    createPost();
  }
  return (
    <Container component="main" maxWidth='lg'>
        <StyledPaper elevation={0}>
            <form onSubmit={handleSubmit} >
                <Grid container spacing={2} justifyContent="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'grey.500', m: 1, border: 3, borderColor: 'secondary.main',  borderRadius: '16px'}}>
                        <Typography sx={{ml: 20, mr: 20}} variant='h3'>Create Post</Typography>
                    </Box>
                    <TextField name='name' label="Recipie Title" fullWidth onChange={onChange}/>
                    <TextField name='description'margin="normal" xs={12} label="Description" multiline fullWidth rows={4} onChange={onChange}/>
                    <TextField name='ingredients'margin="normal" xs={12} label="Ingredients" multiline fullWidth rows={4} onChange={onChange}/>
                    <TextField name='steps'margin="normal" xs={12} label="Steps" multiline fullWidth rows={4} onChange={onChange}/>

                </Grid>
                <Button type='submit' fullWidth variant='contained' color='secondary'>
                    Create Post
                </Button>
            </form>
        </StyledPaper>

    </Container>
  )
}

//NEED TO EDIT!!
const CREATE_RECIPE = gql`
    mutation createRecipe(
        $name : String!
        $description : String!
        $ingredients : String!
        $steps : String!
    ) {

        createRecipe(
            recipeInput: {
            name: $name
            description: $description
            ingredients: $ingredients
            steps: $steps
            }
        ) {

            id name description createdAt createdBy ingredients steps likes

        }
    }
`

export default CreatePost;