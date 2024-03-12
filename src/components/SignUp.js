import React,{useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" > Content Tourism </Link>{' '}
      {new Date().getFullYear()}{'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate(); 

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8099/api/users/add', {
        firstName,
        lastName,
        email,
        password,
        role
      });

    const accessToken = response.data.token;
    localStorage.setItem('token', accessToken);
      console.log('Inscription Successful', response.data);
     navigate('/');

    } catch (error) {
      console.error('Authentication Failed', error);
    }
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField id="firstName" label="First Name"autoComplete="given-name" name="firstName" required fullWidth
                  autoFocus value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="lastName" label="Last Name" name="lastName" autoComplete="family-name" required fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField id="email" label="Email Address" name="email" autoComplete="email" required fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField name="password" label="Password" type="password" id="password" autoComplete="new-password"
                 required fullWidth value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </Grid>
              <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select labelId="role-label" id="role" value={role}  label="Role"
              onChange={handleRoleChange}
            >
              <MenuItem value="createur">Creator</MenuItem>
              <MenuItem value="responsable">Responsable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
            color='secondary' 
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2"> Already have an account? Sign in </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}