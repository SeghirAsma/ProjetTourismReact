import '../App.css';
import {React,useState} from 'react';
import { Card, CardContent, Typography,TextField } from '@mui/material';
import ReactPlayer from 'react-player'
import { Button} from '@mui/material';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {  deepPurple } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

const VideoCardContent = ({username, title, description, videoContenuUrl, idContenu,firstName,lastName}) => {
  const filename = videoContenuUrl.split('/').pop();
  const videoUrl=`http://localhost:8099/api/contenus/videos/${encodeURIComponent(filename)}`

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  // const [currentTime, setCurrentTime] = useState(0);

  // const handleProgress = (progress) => {
  //   setCurrentTime(progress.playedSeconds);
  // };

  // const getCurrentItem = () => {
  //   if (currentTime >= 0 && currentTime < 4) {
  //     return 'Item 1';
  //   } else if (currentTime >= 4 && currentTime < 8) {
  //     return 'Item 2';
  //   }
   
  //   return 'Aucun élément actuel';
  // };



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


  // UnapproveClick
  const handleUnapproveClick = async (idContenu) => {
    try {
      const storedToken = localStorage.getItem('token');
      await axios.put(`http://localhost:8099/api/contenus/archiveContenu/${idContenu}`, {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

    } catch (error) {
      console.error('Erreur lors de la désapprobation : ', error);
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
                type="text" id="titleContenu" placeholder="Title" name="title" variant="standard" margin="normal"
                autoComplete="title" required fullWidth
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
          </div>

          <div style={{ display: 'flex', alignItems: 'center' ,fontWeight: 'bold'}}>
              <label  style={{ marginRight: '10px' ,color:'#033568'}}>Description:</label>
              <TextField
                type="text" id="descriptionContenu" placeholder="Description" name="description" variant="standard"
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
          <Typography color="text.secondary">
              <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: deepPurple[500], width: 35, height: 35 }}>
                  {/* {username.charAt(0).toUpperCase()} */}
                  {`${lastName.charAt(0).toUpperCase()}${firstName.charAt(0).toUpperCase()}`}

                </Avatar>
                <div style={{ marginLeft: '8px' }}>
                Creator: {`${lastName.toUpperCase()} ${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`}
                {/* Creator: {username} */}

                </div>
              </Stack>
          </Typography>

          <Typography variant="h5" component="div">{updatedTitle} </Typography>
          <Typography color="text.secondary">{updatedDescription}</Typography>

          <ReactPlayer
            url={videoUrl}
            controls={true}
            style={{ height: 'auto', width: '50%', maxWidth: '100%', alignItems: 'center' }}
           // onProgress={handleProgress}
          />
                       
      {/* <p>Élément actuel : {getCurrentItem()}</p> */}

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
            {/* <Button
              variant="contained"
              style={{ textAlign: 'center', marginRight: '10px', backgroundColor: '#4CAF50' }}
              onClick={() => handleApproveClick(idContenu)}
            >
              Approve
            </Button>
            <Button variant="contained" color="error" style={{ textAlign: 'center', marginRight: '10px' }}
              onClick={() => handleUnapproveClick(idContenu)}
            >
              UnApprove
            </Button>
            <Button variant="contained" color="warning" onClick={() => setIsEditing(true)}>
              Update
            </Button> */}
             <IconButton
    style={{ marginRight: '10px', backgroundColor: '#4CAF50' }}
    onClick={() => handleApproveClick(idContenu)}
  >
    <CheckCircleOutlineIcon />
  </IconButton>
  <IconButton
   
    style={{ marginRight: '10px' ,backgroundColor: 'red'}}
    onClick={() => handleUnapproveClick(idContenu)}
  >
    <HighlightOffIcon />
  </IconButton>
  <IconButton
    style={{ marginRight: '10px' ,backgroundColor: 'orange'}}
    onClick={() => setIsEditing(true)}
  >
    <EditIcon />
  </IconButton>
          </div>
        )}
      </div>
    </CardContent>
    </Card>
  );
};


export default VideoCardContent;
