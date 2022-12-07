import {
    styled,
    InputBase,
    Container,
    TextField
    } from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import { Link, redirect, useNavigate } from "react-router-dom";
import gql from 'graphql-tag'
import {useQuery} from '@apollo/client'

const initState = {keywords: ''};

const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "80%",
  }));

const SearchBar = () => {
    const [searchRecipe] = useState({});
    const [keywords, setKeywords] = useState(initState);

    const {loading, error, data} = useQuery(SEARCH, {
            update(_, result){
                console.log('searching');
            },
            variables: keywords
        })
    const onChange = (e) => {
        setKeywords(keywords => e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Search onChange={onChange}>
                    <InputBase placeholder='search recipes'/>
                </Search>
            </form>
        </Container>
    )
}

const SEARCH = gql`
query SearchRecipe($keywords: String) {
    searchRecipe(keywords: $keywords) {
      id
      name
      description
      ingredients
      steps
      likes
      createdBy
      createdAt
    }
  }
`

export default SearchBar;