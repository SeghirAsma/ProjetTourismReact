import React,{ useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        Content Tourism
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignInAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showApprovalAlert, setShowApprovalAlert] = useState(false);

  const navigate = useNavigate(); 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.post('http://localhost:8099/auth/authenticate', {
          email,
          password,
      });
      const accessToken = response.data.token;
      localStorage.setItem('token', accessToken);
      const userDetailsResponse = await axios.get('http://localhost:8099/api/users/currentUser', {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });
      const currentUserDetails = userDetailsResponse.data;
      if (currentUserDetails.authorities[0].authority === 'admin') {
          navigate('/scrollDialog');
      } else {
        navigate('/VerifyContent');
      }
  } catch (error) {
      console.error('Authentication Failed', error);
      if (error.response && error.response.status === 401) {
        setShowApprovalAlert(true);
        setTimeout(() => {
          setShowApprovalAlert(false);
        }, 4500);
    } 
        else {
          alert('An error occurred during authentication. Please try again later.');
        }
  }
};

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false}  sm={4} md={7} sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> 
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box  sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',  }} >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }} onSubmit={handleSubmit}>
              <TextField margin="normal" id="email"  label="Email Address" name="email" 
              autoComplete="email" autoFocus required fullWidth  value={email}
              onChange={(e) => setEmail(e.target.value)}             
              />
              <TextField margin="normal" id="password"  label="Password" name="password" 
              autoComplete="current-password" type="password" autoFocus required fullWidth
              value={password}
               onChange={(e) => setPassword(e.target.value)}/>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} color='secondary' >
                Sign In
              </Button>
             
              {showApprovalAlert && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                <AlertTitle>Account Approval Required</AlertTitle>
                Your account requires approval from the admin. Please wait for admin confirmation.
              </Alert>
            )}
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
   
  );
}


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:8099/auth/authenticate', {
  //       email,
  //       password,
  //     });

  //   const accessToken = response.data.token;

  //   localStorage.setItem('token', accessToken);
  //     console.log('Authentication Successful', response.data);
  //     navigate('/UnapprovedProfile');

  //   } catch (error) {
  //     console.error('Authentication Failed', error);
  //   }
  // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         const response = await axios.post('http://localhost:8099/auth/authenticate', {
//             email,
//             password,
//         });

//         const accessToken = response.data.token;

//         localStorage.setItem('token', accessToken);
//         console.log('Authentication Successful', response.data);

//         // Récupérer les détails de l'utilisateur actuellement authentifié
//         const userDetailsResponse = await axios.get('http://localhost:8099/api/users/currentUser', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });

//         console.log('Current User Details:', userDetailsResponse.data);

//         navigate('/UnapprovedProfile');
//     } catch (error) {
//         console.error('Authentication Failed', error);
//     }
// };