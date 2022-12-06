
import {Button, Paper, Grid, Container, Typography, styled, TextField} from '@mui/material';
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

  const StyledPaperList = styled(Paper)({
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  });
//not sure if this is how you would initialize the arrays.
const initState = {name: '', description: '', ingredients: [], steps: []};

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
    /*//probably allows a user to be accessed and maybe passed to the backend to store alongside other post information
    const [ user, setUser ] = useState({});
    
    function handleCall(res) {
        console.log("Encoded token: " + res.credential);
        var userObj = jwt_decode(res.credential); // holds all the user info
        console.log(userObj);
        setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
    };
    */ 

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
  //neds work
  const [createPost] = useMutation(CREATE_POST, {
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
    createPost();
  }

  return (
    <Container component="main" maxWidth='lg'>
        <StyledPaper elevation={0}>
            <Typography variant='h6'>{'Create Post'}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Input name='name' label="Recipie Title" handleChange={handleChange} />
                    <Input name='description' label="Description" handleChange={handleChange} />
                        
                        <div className="row my">
                        {//ingredient field expansion
                            ingredientInputFields.map((data, ingredientIndex)=>{
                                const {ingredient}= data;
                                return(
                                    <div className="row my-3" key={ingredientIndex}>
                                <div className="col">
                                    <div className="form-group">
                                        <Input name="recipieSteps" label='Ingredients' handleChange={handleChange} />
                                    </div>
                                    </div>
                                
                                    <div className="col">
                                
                                
                                {(ingredientInputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeIngredientInputFields}>x</button>:''}
                                
                                
                                    </div>
                                </div>
                                        )
                                    })
                                }
                    
                                <div className="row">
                                    <div className="col-sm-12">
                                    <button className="btn btn-outline-success " onClick={addIngredientInputField}>Add New</button>
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
                                        <Input name="recipieSteps" label='Steps' handleChange={handleChange} />
                                    </div>
                                    </div>
                                
                                    <div className="col">
                                
                                
                                {(stepInputFields.length!==1)? <button className="btn btn-outline-danger" onClick={removeStepInputFields}>x</button>:''}
                                
                                
                                    </div>
                                </div>
                                        )
                                    })
                                }
                    
                                <div className="row">
                                    <div className="col-sm-12">
                                    <button className="btn btn-outline-success " onClick={addStepInputField}>Add New</button>
                                    </div>
                                </div>
                            </div>
                        <div className="col-sm-4">
                    </div>
                </Grid>
                <Button type='submit' halfWidth variant='contained' color='secondary'>
                    {'Create Post'}
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
        login(
            email: $username
            password: $password
        ) {
            id username email token firstName lastName registerDate
        }
    }

`

export default CreatePost;
