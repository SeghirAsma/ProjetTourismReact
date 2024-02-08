import React, { useState,useEffect } from "react";
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField, Container, Paper, Typography } from '@mui/material';
import axios from 'axios'; // Importez Axios
import '../App.css';
import VideoCard from './VideoCard';
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FormComponent = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [titleContenu, setTitleContenu] = useState('');
  const [descriptionContenu, setDescriptionContenu] = useState('');


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/contenus/all`);
        setVideos(response.data);
        console.log('Réponse du serveur:', response);
      console.log('Vidéos récupérées:', response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des vidéos', error);
      }
    };

    fetchVideos();
  }, []);

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
      const response = await axios.post('http://localhost:8080/api/contenus/add', formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Affichez le snackbar avec un message de succès
      setIsSnackbarOpen(true);
      setSnackbarMessage(response.status === 201 ? 'Vidéo ajoutée avec succès' : 'Erreur lors de l\'ajout de la vidéo');
    } catch (error) {
      setIsSnackbarOpen(true);
      setSnackbarMessage('Erreur lors de l\'envoi de la requête');
    }
  }
};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  

  return (
    <div>
      <Button className="bouton-contenu bouton-rond" variant="contained"  onClick={toggleForm}>
      <AddCircleIcon />  Ajouter un contenu
      </Button>
      {showForm && (
        <div className="modal-container">
      <Container component="main" maxWidth="xs" >
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
            Ajout d'un contenu
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 16 }} encType="multipart/form-data" >
            <TextField
              id="titleContenu" label="Title Contenu" name="title" variant="outlined" margin="normal" autoComplete="title" required fullWidth
              value={titleContenu}   onChange={handleTitleChange}  />
            <TextField
              id="descriptionContenu" label="Description Contenu" name="description" variant="outlined" autoComplete="description"
              margin="normal"  required fullWidth value={descriptionContenu} onChange={handleDescriptionChange}
            />
      
            <input
              type="file"
              accept="video/*"
              style={{ marginTop: 16 }}
              onChange={handleFileChange}
            />
            <div className="button-container">
              <Button type="submit" variant="outlined" color="success" startIcon={<CloudUploadIcon />} className="submit-button" >
                Ajouter
              </Button>
              <Button type="button" variant="outlined" color="error" className="cancel-button" onClick={handleCancel}>
                Annuler
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      </div>
       )}
       {/* Liste des vidéos ajoutées */}
      <div className="video-list" style={{ width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {videos.map((video) => (
          <VideoCard
            key={video.idContenu} 
            title={video.titleContenu}
            description={video.descriptionContenu}
            videoContenuUrl={video.videoContenuUrl}
          />
        ))}
      </div>
      {isSnackbarOpen && (
  <Snackbar
    open={isSnackbarOpen}
    autoHideDuration={6000}
    onClose={() => setIsSnackbarOpen(false)}
    message={snackbarMessage}
    style={{ backgroundColor: 'rgb(34, 200, 34)' }}
  />
  
)}

    </div>
  );
};

export default FormComponent;

//   const convertVideoToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//         resolve(fileReader.result.split(',')[1]);
//       };

//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     const base64Video = await convertVideoToBase64(file);
//     setVideoFile(base64Video);
//   };