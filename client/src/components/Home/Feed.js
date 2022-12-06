import { useQuery } from '@apollo/client';
import { Box, Stack} from '@mui/material';
import React from 'react'
import Post from '../Post/Post'
import gql from 'graphql-tag'
const Feed = () => {
    const {loading, error, data} = useQuery(GET_FEED);
    console.log(data);
    return (
        <Box bgcolor="lightslategrey" flex={4} p={2}>Feed
            <Stack direction="column" spacing={0} justifyContent="center">
                {data.recipe.map((recipe) => (
                    <Post></Post>
                ))}
            </Stack>
        
        </Box>
    )
}

const GET_FEED = gql`
    query feed{
        recipie{
            id name description ingredients steps
        }
    }

`

export default Feed;


