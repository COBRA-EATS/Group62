
import {Button, Paper, Grid, Container, Typography, styled, TextField, Box} from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/client'
import { bgcolor } from '@mui/system';


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
//not sure if this is how you would initialize the arrays.
//comment
const initState = {name: '', description: '', ingredients: [''], steps: ['']};

const CreatePost = (props) => {
    const [ingredientInputFields, setIngredientInputFields] = useState([{
        ingredient:'',
    } ]);
    const [stepInputFields, setStepInputFields] = useState([{
        step:'',
    } ]);

    const addIngredientInputField = ()=>{
        setIngredientInputFields([...ingredientInputFields, {
            ingredient:'',
        } ])

    }
    const addStepInputField = ()=>{
        setStepInputFields([...stepInputFields, {
            step:'',
        } ])

    }

    const removeIngredientInputFields = (index)=>{
        const rows = [...ingredientInputFields];
        rows.splice(index, 1);
        setIngredientInputFields(rows);
   }

    const removeStepInputFields = (index)=>{
    const rows = [...stepInputFields];
    rows.splice(index, 1);
    setStepInputFields(rows);
}

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initState);
  const navigate = useNavigate();

  const handleChange = (ingredientIndex, e, stepIndex) => {
    setFormData({...formData, [e.target.name]:e.target.value});
    const { name, value } = e.target;
    const ingredientList = [...ingredientInputFields];
    const stepList = [...ingredientInputFields];
    ingredientList[ingredientIndex][name] = value;
    stepList[stepIndex][name] = value;
    setIngredientInputFields(ingredientList);
    setStepInputFields(stepList)
  };
 
  const [createPost] = useMutation(CREATE_POST, {
    update(_, result){
        console.log('create post')
        navigate("/")
    },
    onError(err){
        console.log('test');
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formData
  })
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
                    <TextField name='name' label="Recipie Title" handleChange={handleChange} fullWidth/>
                    <TextField margin="normal" xs={12} label="Description" multiline fullWidth rows={4} name='description' handleChange={handleChange}/>

                        <div className="row my">
                        {//ingredient field expansion
                            ingredientInputFields.map((data, ingredientIndex)=>{
                                const {ingredient}= data;
                                return(
                                    <div className="row my-3" key={ingredientIndex}>
                                <div className="col">
                                    <div className="form-group">
                                        <TextField name="ingredients" label='Ingredients' handleChange={handleChange} />
                                    </div>
                                    </div>

                                    <div className="col">


                                {(ingredientInputFields.length!==1)?(
                                <Box p={1} >
                                <Button onClick={removeIngredientInputFields} color='error'>x</Button>
                                </Box>       
                                ):''}
                                    </div>
                                </div>
                                        )
                                    })
                                }
                                <div className="row">
                                    <div className="col-sm-12">
                                    <Box p={1} >
                                    <Button onClick={addIngredientInputField}>Add New</Button>
                                    </Box>
                                    </div>
                                </div>
                            </div>
                        <div className="col-sm-4">
                    </div>
                    <div className="row my">
                        {//step field expansion
                            stepInputFields.map((data, stepIndex)=>{
                                const {step}= data;
                                return(
                                    <div className="row my-3" key={stepIndex}>
                                <div className="col">
                                    <div className="form-group">
                                        <TextField name="steps" variant="outlined" label='Steps' handleChange={handleChange}/>
                                    </div>
                                    </div>

                                    <div className="col">


                                {(stepInputFields.length!==1)? (
                                <Box p={1} >
                                <Button onClick={removeStepInputFields} color='error'>x</Button>
                                </Box>       
                                ):''}
                                    </div>
                                </div>
                                        )
                                    })
                                }
                                <div className="row">
                                    <div className="col-sm-12">
                                    <Box p={1} >
                                    <Button  margin='10px' onClick={addStepInputField}>Add New</Button>
                                    </Box>
                                    </div>
                                </div>
                            </div>
                        <div className="col-sm-4">
                    </div>
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='secondary' component={Link} to='/'>
                    Create Post
                </Button>
            </form>
        </StyledPaper>

    </Container>
  )
}

//NEED TO EDIT!!
const CREATE_POST = gql`
    mutation createRecipe(
        $name : String!
        $description : String!
        $ingredients : [String]!
        $steps : [String]!
    ) {
        RecipeInput(
            name : $name
            description : $description
            ingredients : $ingredients
            steps : $steps
        ) {
            id
        }
    }
`

export default CreatePost;