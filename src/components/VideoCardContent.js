// VideoCard.jsx
import '../App.css';
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player'
import { Button} from '@mui/material';


const VideoCardContent = ({ title, description, videoContenuUrl }) => {
  const filename = videoContenuUrl.split('/').pop();
  const videoUrl=`http://localhost:8080/api/contenus/videos/${encodeURIComponent(filename)}`
  return (
    <Card style={{ width: '100%', height: 'auto', marginBottom: 16 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography color="text.secondary">
        {description}
      </Typography>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        style={{ height: 'auto', width: '100%', maxWidth: '100%', alignItems: 'center' }}
      />
      <div style={{textAlign: 'center',marginTop:'10px'}}>
      <Button variant="contained" 
                    //color="success" 
                    style={{ textAlign: 'center', marginRight: '10px', backgroundColor:'#4CAF50' }}
                   // onClick={() => handleApproveClick(user.id)}
                   > Approve</Button>
                    <Button variant="contained" 
                    color="error"
                    style={{ textAlign: 'center', marginRight: '10px' }}
                    //onClick={() => handleUnapproveClick(user.id)}
                    >UnApprove</Button>
                     <Button variant="contained" 
                    color="warning"
                    //onClick={() => handleUnapproveClick(user.id)}
                    >Update</Button>
                    </div>
    </CardContent>
  </Card>
  );
};


export default VideoCardContent;
