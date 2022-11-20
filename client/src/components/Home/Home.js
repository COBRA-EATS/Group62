import { Box, Stack } from '@mui/system'

import React from 'react'
import Sidebar from './Sidebar';
import Feed from './Feed';
import Rightbar from './Rightbar';

const Home = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
        <Feed/>
        <Rightbar/>
    </Stack>
  )
}

export default Home;