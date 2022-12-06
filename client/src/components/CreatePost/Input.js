import React from 'react'
import { TextField, Grid } from '@mui/material'



const Input = ({name, label, half, autoFocus, type,}) => {
  return (
    <Grid item xs={12} sm={half? 6 : 12}>
        <TextField
            name={name}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            />
    </Grid>
  )
};

export default Input