import React, { useState,useEffect } from "react";
import axios from 'axios'; // Importez Axios
import '../App.css';
import VideoCardContent from './VideoCardContent';
import { Grid } from '@mui/material';


const FormComponent = () => {
  const [videos, setVideos] = useState([]);


 
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8099/api/contenus/unapproved`, {
          headers: {
          Authorization: `Bearer ${storedToken}`,
                 },
               });
        setVideos(response.data);
        console.log('Réponse du serveur:', response);
      console.log('Vidéos récupérées:', response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des vidéos', error);
      }
     
    };

    fetchVideos();
  }, []);

  return (
    <div>
      {/* Liste des vidéos ajoutées */}
      <div className="video-list" style={{ width: '100%', padding: '0 4%', boxSizing: 'border-box' }}>
        <Grid container spacing={2}>
          {videos.map((video, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <VideoCardContent
                 username={video.userEntity ? video.userEntity.firstName : ''} // Access the username
                title={video.titleContenu}
                description={video.descriptionContenu}
                videoContenuUrl={video.videoContenuUrl}
                idContenu={video.idContenu} // 
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default FormComponent;

