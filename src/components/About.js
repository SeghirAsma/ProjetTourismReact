// // import './App.css';
// function About() {
//   return (
//     <div> hello About !!
//     </div>
    
//   );
// }

// export default About;
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-required"
          label="First Name"
        />
        
      </div>

      <div>
      <TextField
          id="outlined-required"
          label="Last Name"
        />
    
      </div>
      <div>
      <TextField
          id="filled-search"
          label="Address Email"
          type="email"
          variant="filled"
        />
       
       
      </div>
    </Box>
  );
}