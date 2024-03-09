import React, { useState,useEffect } from "react";
import axios from 'axios'; 
import '../App.css';
import VideoCardContent from './VideoCardContent';
import { Grid } from '@mui/material';
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

const FormComponent = () => {
  const [videos, setVideos] = useState([]);
  const videosPerPage = 4; 
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8099/api/contenus/all`, {
          headers: {
          Authorization: `Bearer ${storedToken}`,
                 },
               });
               const filteredContenus = response.data.filter((contenu => !contenu.deleted && !contenu.approved) );
        // // setVideos(response.data);
        setVideos(filteredContenus);
  
      } catch (error) {
        console.error('Erreur lors du chargement des vidéos', error);
      }
    };
    fetchVideos();
  }, []);

  const pageCount = Math.ceil(videos.length / videosPerPage);

 
  const handleChangePage = (event, value) => {
    setPage(value);
  };
 
  return (
    <div>
      <div className="video-list" style={{ width: '100%', padding: '0 4%', boxSizing: 'border-box' }}>
        <Grid container spacing={2}>
          {videos
            .slice((page - 1) * videosPerPage, page * videosPerPage)
            .map((video) => (
              <Grid item xs={12} sm={3} key={video.idContenu}>
                <VideoCardContent
                  username={video.userEntity ? video.userEntity.firstName : ''}
                  firstName={video.userEntity ? video.userEntity.firstName : ''}
                  lastName={video.userEntity ? video.userEntity.lastName : ''}
                  title={video.titleContenu}
                  description={video.descriptionContenu}
                  videoContenuUrl={video.videoContenuUrl}
                  idContenu={video.idContenu}
                />
              </Grid>
            ))}
        </Grid>
        <Stack spacing={2} style={{ marginTop: '10px', justifyContent: 'center' }}>
          <Pagination count={pageCount} page={page} onChange={handleChangePage} variant="outlined" color="primary" />
        </Stack>
      </div>
    </div>
  );
};

export default FormComponent;

  // <div>
    //   {/* Liste des vidéos ajoutées */}
    //   <div className="video-list" style={{ width: '100%', padding: '0 4%', boxSizing: 'border-box' }}>
    //     <Grid container spacing={2}>
    //       {videos.map((video, index) => (
    //         <Grid item xs={12} sm={4} key={index} >
    //           <VideoCardContent
    //             //  username={video.userEntity ? video.userEntity.firstName : ''} // Access the username
    //             username={video.userEntity ? video.userEntity.firstName : ''}
    //             firstName={video.userEntity ? video.userEntity.firstName : ''}
    //             lastName={video.userEntity ? video.userEntity.lastName : ''}
    //             title={video.titleContenu}
    //             description={video.descriptionContenu}
    //             videoContenuUrl={video.videoContenuUrl}
    //             idContenu={video.idContenu} // 
    //           />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </div>
    // </div>