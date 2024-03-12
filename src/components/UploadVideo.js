import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Grid ,Alert} from '@mui/material';
// import { Card, CardContent, Typography, TextField, Button, IconButton, Grid ,Paper,Alert} from '@mui/material';

// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Sidebar from './Sidebar';
import '../App.css';
import axios from 'axios'; 
import '../stylesCss/UploadVideoCss.css'

const VideoUploadComponent = ({ onUpload }) => {
    const [titleContenu, setTitleContenu] = useState('');
    const [descriptionContenu, setDescriptionContenu] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false);

    const handleTitleChange = (event) => {
        setTitleContenu(event.target.value);
      };
      const handleDescriptionChange = (event) => {
        setDescriptionContenu(event.target.value);
      };

      
      const handleSubmit = async (event) => {
          event.preventDefault();
        
          if (videoFile && titleContenu && descriptionContenu) {
            const formData = new FormData();
            formData.append('titleContenu', titleContenu);
            formData.append('descriptionContenu', descriptionContenu);
            formData.append('videoContenuUrl', videoFile);
        
            try {
              const storedToken = localStorage.getItem('token');

              await axios.post('http://localhost:8099/api/contenus/add', formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${storedToken}`,
                },
              });
              setSuccessAlert(true);
              setTimeout(() => {
                setSuccessAlert(false);
              }, 4000);
              setTitleContenu('');
              setDescriptionContenu('');
              setVideoFile(null);
            
            } catch (error) {
            
            }
          }
        };

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);
      };


      // const fileInputRef = useRef(null);
      // const handleUploadButtonClick = () => {
      //   fileInputRef.current.click();
      // };
      const handleDiscardButtonClick = () => {
        setTitleContenu('');
        setDescriptionContenu('');
        setVideoFile(null);
      };


  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '80px' }}>
    <Sidebar />
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '70vh', width: '1000px', 
    margin: 'auto', padding: '16px', border:'1px solid #aaa',marginTop: '40px'}}>
     {/* <Card sx={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '70vh', width: '1000px', 
    margin: '30px', padding: '16px', marginRight: '30px' , border:'1px solid #aaa'}}>  */}
        <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Add a Video Content
              <Typography color="text.secondary"  style={{ alignItems: 'center' }}> Post a video to your account </Typography>
        </Typography>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
              {/* <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', 
              width: '100%', height: '350px', backgroundColor: 'rgb(236, 236, 236)', border: '2px dashed #aaa' }}>
              <input 
                type="file" accept="video/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <label htmlFor="video-upload">
                <IconButton component="span" style={{color:'rgb(235, 37, 143)'}}
                  onClick={handleUploadButtonClick} >
                   <CloudUploadIcon fontSize="large" style={{ width: '130px', height: '130px', marginTop:'25px'}}/>
                </IconButton>
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography color="text.secondary" variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                      Select Video to upload
                      <Typography color="text.secondary"  > All types of video are allowed </Typography> 
                      <Typography color="text.secondary"> Equal or Less than 2GB </Typography>
                      {videoFile && (
                  <Typography color="text.secondary" variant="body1" style={{ marginTop: '8px'  }}>
                    Selected Video: <br></br>
                    {videoFile.name}
                  </Typography>
            )}
                  </Typography>
              </div>
              
    
            </Paper> */}
            <form className="form">
              <span className="form-title">Upload your video</span>
              <p className="form-paragraph">
              All types of video are allowed    </p>
             <p className="form-paragraph"> Equal or Less than 2GB</p> 
              <label htmlFor="file-input" className="drop-container">
              <span className="drop-title">Drop files here</span>
              or
              <input type="file" accept="video/*"
              //  ref={fileInputRef}
               onChange={handleFileChange} required="" id="file-input"/>
            </label>
            </form>
          </Grid>

          <Grid item xs={12} sm={6.5}>
              <div style={{ fontWeight: 'bold', marginBottom: '16px', marginTop:'50px' }}>
              <TextField label="Title Contenu" margin="normal" fullWidth required
               value={titleContenu}   onChange={handleTitleChange}/> <br></br>
              <TextField label="Description Contenu" margin="normal" fullWidth required
              value={descriptionContenu} onChange={handleDescriptionChange} /> <br></br>

              {/* <Button variant="contained" 
              style={{ marginTop: '16px' , marginRight: '8px',backgroundColor:'rgb(28, 174, 28)', width:'150px'}}
              onClick={handleSubmit}>
                Post
              </Button> */}
          <button className="button"  onClick={handleSubmit} style={{marginRight: '10px'}}> Download </button>
          <button className="button2"  onClick={handleDiscardButtonClick}> Discard </button>
          </div>
              {/* <Button variant="outlined" color="success" style={{ marginTop: '16px',width:'150px' }}
              onClick={handleDiscardButtonClick}>
                Discard
              </Button> */}
                         
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    {successAlert && (
      <Alert
        severity="success"
        color="success"
        onClose={() => setSuccessAlert(false)}
        style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
      >
        Video Content is added  successfully
      </Alert>
    )}
    </div>
   
  );
};

export default VideoUploadComponent;
