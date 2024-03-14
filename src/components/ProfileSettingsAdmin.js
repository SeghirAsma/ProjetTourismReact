import Sidebar from './Sidebar';
import React, {useState, useEffect, useRef} from 'react';
import { Container, Typography, Paper, Grid, TextField, Button,Divider,Alert ,Avatar,ListItem} from '@mui/material';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 
import EmailIcon from '@mui/icons-material/Email';
import FaceIcon from '@mui/icons-material/Face';
import WorkIcon from '@mui/icons-material/Work';
import '../stylesCss/ProfileCss.css';
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
    <div style={{ display: 'flex', marginTop: '80px' }}>  
    {/* flexDirection: 'row', */}
   <Sidebar />
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <div className="card">
            <div className="bg"></div>
            <div className="content">
              <Typography variant="h6" gutterBottom style={{fontWeight:'bold', color:'#033568'}}>
                    <IconButton color="inherit" >
                    <AccountCircleIcon fontSize="large" color="#033568" /> 
                    </IconButton>
                    Profile Details
                    </Typography>
                    <div style={{ textAlign: 'center', marginTop:'20px' }}>
                    <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                          id="imageInput"
                          ref={fileInputRef}

                        />
                    <Avatar
                    alt=""
                    src={imageUrl || "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"}
                    style={{ width: '140px', height: '140px', cursor: 'pointer', margin: '0 auto 10px'
                    }}
                    onClick={handleImageClick}
                    
                    />
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                    JPG, JPEG or PNG 
                    </Typography>
                    {selectedFileName &&(
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {`Selected Image: ${selectedFileName}`}
                    </Typography> )}
                    <Button 
                        variant="contained" type="button" style={{ backgroundColor: '#165ca1', marginTop: '10px' }}
                        onClick={handleImageUpload} className='button'
                      >
                        Save new Picture
                      </Button>
                  <Divider />
               <Typography  variant="body2" color="textSecondary" style={{ padding: '15px' }} >
                 {currentUserDetails && (
                     <div style={{ fontSize: '17px' , textAlign: 'center', marginLeft: '13px', marginTop:'10px'}}>
                        <ListItem disableGutters>
                            <EmailIcon color="primary" fontSize="small" />
                              <span style={{ fontWeight: 'bold', color: '#84405a' , marginLeft: '5px'}}>
                                Email:</span> {currentUserDetails.userEntity.email}
                        </ListItem>
                        <ListItem disableGutters>
                          <FaceIcon color="secondary" fontSize="small" />
                          <span style={{ fontWeight: 'bold', color: '#84405a', marginLeft: '5px'}}>
                            User Name: </span> {currentUserDetails.userEntity.lastName.toUpperCase()} {currentUserDetails.userEntity.firstName}  
                        </ListItem>
                        <ListItem disableGutters>
                          <WorkIcon color="warning" fontSize="small" />
                          <span style={{ fontWeight: 'bold', color: '#84405a' , marginLeft: '5px'}}>Role:</span> {currentUserDetails.userEntity.role}
                        </ListItem>
                      </div> )}
               </Typography>
            </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom style={{fontWeight:'bold', color:'#033568'}}>
            <IconButton color="inherit"  >
              <SettingsIcon  fontSize="large" color="#033568" />
            </IconButton>
              Profile Settings
            </Typography>
            {currentUserDetails && (
            <form>
              <TextField fullWidth  id="inputfirstname" variant="outlined" margin="normal" label="First Name"
              value={updatedUser.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}/>
               <TextField fullWidth id="inputlastname" variant="outlined" margin="normal"  label="Last Name"
                value={updatedUser.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                <TextField fullWidth  id="inputemail" variant="outlined" margin="normal"  label="Email"
                 value={updatedUser.email}
                 onChange={(e) => handleInputChange('email', e.target.value)}/>
               <TextField fullWidth label="Address" id="inputadress" variant="outlined" margin="normal" />
              <TextField fullWidth label="Phone Number" id="inputadress" variant="outlined" margin="normal" />
              <Button variant="contained"  type="button" style={{backgroundColor:'#165ca1'}} className='button'
              onClick={handleSaveChanges}>
                Save changes
              </Button>
            </form>
             )}
           
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


/* <Paper sx={{ p: 3, height:'543px' ,backgroundColor: '#fbf9f3'}} className='card'>
            
            <Typography variant="h6" gutterBottom style={{fontWeight:'bold', color:'#033568'}}>
            <IconButton color="inherit" >
            <AccountCircleIcon fontSize="large" color="#033568" /> 
            </IconButton>
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
          <Avatar
          alt=""
          src={imageUrl || "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"}
          style={{ width: '150px', height: '150px', cursor: 'pointer', margin: '0 auto 10px',
          }}
          onClick={handleImageClick}
          />
              <Typography variant="body2" color="textSecondary" gutterBottom>
              JPG, JPEG or PNG 
              </Typography>
              {selectedFileName &&(
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {`Selected Image: ${selectedFileName}`}
              </Typography> )}
              <Button 
                  variant="contained" type="button" style={{ backgroundColor: '#165ca1', marginTop: '10px' }}
                  onClick={handleImageUpload} className='button'
                >
                  Save new Picture
                </Button>
           <Divider />
               <Typography  variant="body2" color="textSecondary" style={{ padding: '15px' }} >
          {currentUserDetails && (
        <div style={{ fontSize: '17px' , textAlign: 'center', marginLeft: '39px'}}>
                  <ListItem disableGutters>
                      <EmailIcon color="primary" fontSize="small" />
                        <span style={{ fontWeight: 'bold', color: '#84405a' , marginLeft: '5px'}}>
                          Email:</span> {currentUserDetails.userEntity.email}
                    </ListItem>
                  <ListItem disableGutters>
                    <FaceIcon color="secondary" fontSize="small" />
                    <span style={{ fontWeight: 'bold', color: '#84405a', marginLeft: '5px' }}>
                      User Name:</span>{currentUserDetails.userEntity.lastName.toUpperCase()} {currentUserDetails.userEntity.firstName}  
                  </ListItem>
                
                  <ListItem disableGutters>
                    <WorkIcon color="warning" fontSize="small" />
                    <span style={{ fontWeight: 'bold', color: '#84405a' , marginLeft: '5px'}}>Role:</span> {currentUserDetails.userEntity.role}
                  </ListItem>
        </div> )}
               </Typography>

            </div>
          </Paper> */