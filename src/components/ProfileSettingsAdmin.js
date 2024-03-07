import Sidebar from './Sidebar';
import React, {useState, useEffect, useRef} from 'react';
import { Container, Typography, Paper, Grid, TextField, Button,Divider } from '@mui/material';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

function Profile() {
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        const userDetailsResponse = await axios.get('http://localhost:8099/api/users/currentUser', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const currentUserDetails = userDetailsResponse.data;
        setCurrentUserDetails(currentUserDetails);

      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    fetchCurrentUserDetails();
  }, []);  

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        // Handle the selected image, you can set it in the state if needed
        console.log(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };


  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '80px' }}>
   <Sidebar />
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height:'525px' ,backgroundColor: '#fbf9f3'}}>
            <Typography variant="h6" gutterBottom style={{fontWeight:'bold', color:'#033568'}}>
           
              Profile Details
            </Typography>
            <div style={{ textAlign: 'center' }}>
            <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="imageInput"
                  ref={fileInputRef}
                />
                <img
                  src="https://static.vecteezy.com/ti/vecteur-libre/p1/24191699-profil-icone-ou-symbole-dans-rose-et-blanc-couleur-vectoriel.jpg"
                  alt=""
                  style={{
                    borderRadius: '50%',
                    maxWidth: '100%',
                    maxHeight: '150px',
                    cursor: 'pointer',
                  }}
                  onClick={handleImageClick}
                />
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
                JPG or PNG no larger than 5 MB
              </Typography>
           <Divider />
                 <Typography  variant="body2" color="textSecondary" style={{ padding: '15px' }} >
          {currentUserDetails && (
        <div style={{ fontSize: '18px'}}>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Email:</span> {currentUserDetails.userEntity.email}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>First Name:</span>  {currentUserDetails.userEntity.firstName}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Last Name: </span> {currentUserDetails.userEntity.lastName}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Role:</span>  {currentUserDetails.userEntity.role}</p>

        </div>
      )}
        </Typography>
              {/* <Button variant="contained" color="primary" fullWidth>
                Upload new image
              </Button> */}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 , backgroundColor: '#fbf9f3'}}>
            <Typography variant="h6" gutterBottom style={{fontWeight:'bold', color:'#033568'}}>
            <IconButton color="inherit" >
              <SettingsIcon />
            </IconButton>
              Profile Settings
            </Typography>
            {currentUserDetails && (
            <form>
              <TextField fullWidth  id="inputfirstname" variant="outlined" margin="normal"
              value={currentUserDetails.userEntity.firstName}/>
               <TextField fullWidth id="inputlastname" variant="outlined" margin="normal"
                value={currentUserDetails.userEntity.lastName}/>
                <TextField fullWidth  id="inputemail" variant="outlined" margin="normal"
                 value={currentUserDetails.userEntity.email}/>
               <TextField fullWidth label="Address" id="inputadress" variant="outlined" margin="normal"/>
              <TextField fullWidth label="Phone Number" id="inputadress" variant="outlined" margin="normal"/>
              <Button variant="contained"  type="button" style={{backgroundColor:'#3bc01a'}}>
                Save changes
              </Button>
             
            </form> )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

export default Profile;
