import { Box, Stack} from '@mui/material';
import React from 'react'
import Post from '../Post/Post'

const Feed = () => {
    return (
        <Box bgcolor="lightslategrey" flex={4} p={2}>Feed
            <Stack direction="column" spacing={0} justifyContent="center">
                <Post></Post>
                <Post></Post>
            </Stack>
        
        </Box>
    )
}

export default Feed;