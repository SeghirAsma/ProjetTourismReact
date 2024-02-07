// VideoCard.jsx
import '../App.css';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player/youtube'

const VideoCard = ({ title, description, videoContenuUrl }) => {
  return (
    <Card style={{ width: '60%', height: 'auto', marginBottom: 16}}>
      <CardContent >
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">
          {description}
        </Typography>
        

        <ReactPlayer 
          url={`http://localhost:8080/${videoContenuUrl}`}
          controls={true}
          style={{ height: 'auto', width: '100%', maxWidth:'100%',alignItems: 'center'}}
        />
      </CardContent>
    </Card>
  );
};


export default VideoCard;
