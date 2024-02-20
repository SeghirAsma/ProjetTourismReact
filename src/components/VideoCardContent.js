import '../App.css';
import {React,useState} from 'react';
import { Card, CardContent, Typography,TextField } from '@mui/material';
import ReactPlayer from 'react-player'
import { Button} from '@mui/material';
import axios from 'axios';



const VideoCardContent = ({username, title, description, videoContenuUrl, idContenu}) => {
  const filename = videoContenuUrl.split('/').pop();
  const videoUrl=`http://localhost:8099/api/contenus/videos/${encodeURIComponent(filename)}`

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

//updateClick
  const handleUpdateClick = async (id) => {
    try {
      const storedToken = localStorage.getItem('token');
      const updatedContenu = {
        titleContenu: updatedTitle,
        descriptionContenu: updatedDescription,
      };

     const response= await axios.put(`http://localhost:8099/api/contenus/update/${id}`, updatedContenu, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log('Update Response:', response.data);
      setIsEditing(false); 
    } catch (error) {
      console.error('Erreur lors de la mise à jour : ', error);
    } 
  };


//approveClick
  const handleApproveClick = async (idContenu) => {
    try {
      const storedToken = localStorage.getItem('token');
      await axios.put(`http://localhost:8099/api/contenus/approve/${idContenu}`, {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
     
    } catch (error) {
      console.error('Erreur lors de l\'approbation : ', error);
    }
  };


  //CancelClick
  const handleCancelClick = () => {
    setUpdatedTitle(title);
    setUpdatedDescription(description);
    setIsEditing(false);
  };


  return (
    <Card style={{ width: '100%', height: 'auto', marginBottom: 16 }}>
    <CardContent>
      {isEditing ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ marginRight: '10px' ,color:'#033568',fontWeight: 'bold'}}>Title:</label>
              <TextField
                type="text" id="titleContenu" placeholder="Title" name="title" variant="outlined" margin="normal"
                autoComplete="title" required fullWidth
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' ,fontWeight: 'bold'}}>
              <label  style={{ marginRight: '10px' ,color:'#033568'}}>Description:</label>
              <TextField
                type="text" id="descriptionContenu" placeholder="Description" name="description" variant="outlined"
                margin="normal" autoComplete="description" required fullWidth
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
          </div>

          <ReactPlayer
            url={videoUrl}
            controls={true}
            style={{ height: 'auto', width: '100%', maxWidth: '100%', alignItems: 'center' }}
          />
        </div>

      ) : (
        <div>
            <Typography color="text.secondary">Creator: {username}</Typography>

          <Typography variant="h5" component="div">{updatedTitle} </Typography>
          <Typography color="text.secondary">{updatedDescription}</Typography>

          <ReactPlayer
            url={videoUrl}
            controls={true}
            style={{ height: 'auto', width: '100%', maxWidth: '100%', alignItems: 'center' }}
          />
        </div>
      )}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        {isEditing ? (
          <div>
          <Button variant="contained"
          style={{backgroundColor: '#4CAF50'}}
           onClick={() => handleUpdateClick(idContenu)} >
            Submit
          </Button>
          <Button variant="contained" 
          style={{ marginLeft: '10px', backgroundColor:'grey' }}
          onClick={handleCancelClick} >
          Cancel
        </Button>
        </div>

        ) : (
          <div>
            <Button
              variant="contained"
              style={{ textAlign: 'center', marginRight: '10px', backgroundColor: '#4CAF50' }}
              onClick={() => handleApproveClick(idContenu)}
            >
              Approve
            </Button>
            <Button variant="contained" color="error" style={{ textAlign: 'center', marginRight: '10px' }}>
              UnApprove
            </Button>
            <Button variant="contained" color="warning" onClick={() => setIsEditing(true)}>
              Update
            </Button>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
  );
};


export default VideoCardContent;
