// // VideoCard.jsx
// import '../App.css';
// import React from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import ReactPlayer from 'react-player'

// const VideoCard = ({ title, description, videoContenuUrl }) => {
//   const filename = videoContenuUrl.split('/').pop();
//   const videoUrl=`http://localhost:8099/api/contenus/videos/${encodeURIComponent(filename)}`
//   return (
//     <Card style={{ width: '40%', height: 'auto', marginBottom: 16}}>
//       <CardContent >
//         <Typography variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography color="text.secondary">
//           {description}
//         </Typography>
//         <ReactPlayer 
//           url={videoUrl}
//           controls={true}
//           style={{ height: 'auto', width: '100%', maxWidth:'100%',alignItems: 'center'}}
//         />
//       </CardContent>
//     </Card>
//   );
// };


// export default VideoCard;
