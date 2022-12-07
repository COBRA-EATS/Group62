import { useQuery } from '@apollo/client';
import { Box, Stack, Typography} from '@mui/material';
import React from 'react'
import Post from '../Post/Post'
import gql from 'graphql-tag'
const Feed = () => {
    const { loading, error, data } = useQuery(GET_FEED);
    console.log("error loading data: ");
    console.log(error);
    console.log("loading: ");
    console.log(loading);
    console.log("data: ");
    console.log(data);
    return (
        <Box bgcolor="#dbd8da" justifyContent='center' flex={4} p={2}>
            <h2>Most Recent Posts</h2>
            {error ? <Typography sx={{ml: 20, mr: 20}} variant='h3'>Error getting feed</Typography> : 
            <div>
                {loading ? <Typography sx={{ml: 20, mr: 20}} variant='h3'>Loading feed...</Typography>: <div>
                <Stack direction="column" spacing={0} justifyContent="center">
                    {data.feed.map((recipe) => (
                        <Post key={recipe} recipe={recipe}></Post>
                    ))}
                </Stack>
                </div>}
            </div>}
        </Box>
    )
}

const GET_FEED = gql`
query Query {
    feed {
      name description id ingredients steps createdBy createdAt
    }
  }
  

`

export default Feed;

