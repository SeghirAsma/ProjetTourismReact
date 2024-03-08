import Sidebar from './Sidebar';
import React, {useState, useEffect, useRef} from 'react';
import { Container, Typography, Paper, Grid, TextField, Button,Divider,Alert } from '@mui/material';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

function Profile() {
  const [currentUserDetails, setCurrentUserDetails] = useState(null);
  const fileInputRef = useRef(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const profileImageUrl = currentUserDetails?.userEntity?.profileImageUrl || '';
  const filename = profileImageUrl ? profileImageUrl.split('/').pop() : '';
  const imageUrl=`http://localhost:8099/api/users/images/${encodeURIComponent(filename)}`
  const [selectedFileName, setSelectedFileName] = useState('');

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
          console.log("deyails",currentUserDetails)
         setUpdatedUser({
          firstName: currentUserDetails.userEntity.firstName,
          lastName: currentUserDetails.userEntity.lastName,
          email: currentUserDetails.userEntity.email,
          profileImageUrl: currentUserDetails.userEntity.profileImageUrl,
        });
// // Vérifiez si l'URL de l'image est correctement mise à jour
// if (currentUserDetails.userEntity.profileImageUrl !== profileImageUrl) {
//   setProfileImageUrl(currentUserDetails.userEntity.profileImageUrl);
// }

      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    fetchCurrentUserDetails();
  }, [profileImageUrl]);  

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
        console.log('File read successfully:', reader.result);
      // setProfileImageUrl(reader.result); 
      setSelectedFileName(file.name); // Mettez à jour le nom du fichier
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedUser({
      ...updatedUser,
      [field]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8099/api/users/update/${currentUserDetails.userEntity.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 4000);

//  if (response.data.userEntity && response.data.userEntity.profileImageUrl) {
//   setProfileImageUrl(response.data.userEntity.profileImageUrl);
// }
      setCurrentUserDetails({
        ...currentUserDetails,
        userEntity: response.data,
      });
      
    } catch (error) {
      console.error('Failed to update user details', error);
    }
  };
  
  const handleImageUpload = async () => {
    try {
      const accessToken = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profileImage', fileInputRef.current.files[0]);

      const response = await axios.put(
        `http://localhost:8099/api/users/update-profile/${currentUserDetails.userEntity.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // setProfileImageUrl(response.data.profileImageUrl);  
      // console.log("profile img",setProfileImageUrl)

      console.log('Profile image updated:', response.data);
      // Remplacez la source de l'image avec la nouvelle URL
    setCurrentUserDetails({
      ...currentUserDetails,
      userEntity: {
        ...currentUserDetails.userEntity,
        profileImageUrl: response.data.profileImageUrl,
      },
    });
    

      setSuccessAlert(true);
      setTimeout(() => {
        setSuccessAlert(false);
      }, 4000);
      setSelectedFileName(null); 
    } catch (error) {
      console.error('Failed to update profile image', error);
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
        src={imageUrl || "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"}
        alt=""
                  style={{ borderRadius: '50%',
                    maxWidth: '200px',
                    maxHeight: '150px',
                    cursor: 'pointer',
                  }}
                  onClick={handleImageClick}
                />
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
              All types of pictures are allowed
              </Typography>
              {selectedFileName &&(
              <Typography variant="body2" color="textSecondary" gutterBottom>
  {`Selected Image: ${selectedFileName}`}
</Typography> )}
              <Button
                  variant="contained"
                  type="button"
                  style={{ backgroundColor: '#3bc01a', marginTop: '10px' }}
                  onClick={handleImageUpload}
                >
                  Import new Picture
                </Button>
           <Divider />
                 <Typography  variant="body2" color="textSecondary" style={{ padding: '15px' }} >
          {currentUserDetails && (
        <div style={{ fontSize: '17px'}}>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Email:</span> {currentUserDetails.userEntity.email}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>First Name:</span>  {currentUserDetails.userEntity.firstName}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Last Name: </span> {currentUserDetails.userEntity.lastName}</p>
          <p><span style={{fontWeight:'bold', color:'#84405a'}}>Role:</span>  {currentUserDetails.userEntity.role}</p>

        </div>
      )}
        </Typography>
             
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
              value={updatedUser.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}/>
               <TextField fullWidth id="inputlastname" variant="outlined" margin="normal"
                value={updatedUser.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                <TextField fullWidth  id="inputemail" variant="outlined" margin="normal"
                 value={updatedUser.email}
                 onChange={(e) => handleInputChange('email', e.target.value)}/>
               <TextField fullWidth label="Address" id="inputadress" variant="outlined" margin="normal"/>
              <TextField fullWidth label="Phone Number" id="inputadress" variant="outlined" margin="normal"/>
              <Button variant="contained"  type="button" style={{backgroundColor:'#3bc01a'}}
              onClick={handleSaveChanges}>
                Save changes
              </Button>
             
            </form> )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
    {successAlert && currentUserDetails &&(
      <Alert
        severity="success"
        color="success"
        onClose={() => setSuccessAlert(false)}
        style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
      >
     Dear {currentUserDetails.userEntity.firstName}, Your Profile is updated  successfully
      </Alert>
    )}
    </div>
  );
}

export default Profile;
