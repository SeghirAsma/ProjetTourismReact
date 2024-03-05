// import React, { useState } from 'react';
// import { Card, CardContent, TextField, Button, Typography } from '@mui/material';

// const App = () => {
//   const [champ1, setChamp1] = useState('');
//   const [champs2, setChamps2] = useState(['']);
//   const [valeursSoumises, setValeursSoumises] = useState([]);

//   const ajouterNouveauChamp2 = () => {
//     setChamps2([...champs2, '']);
//   };
  

//   const handleChangeChamp1 = (event) => {
//     setChamp1(event.target.value);
//   };

//   const handleChangeChamp2 = (value, index) => {
//     const nouveauxChamps2 = [...champs2];
//     nouveauxChamps2[index] = value;
//     setChamps2(nouveauxChamps2);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const soumission = {
//       champ1: champ1,
//       champs2: champs2
//     };
//     setValeursSoumises([...valeursSoumises, soumission]);
//     setChamp1('');
//     setChamps2(['']);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <Card style={{ minWidth: 600, textAlign: 'center' }}>
//         <CardContent>
//           <Typography variant="h5" component="div" gutterBottom>
//             Mon Formulaire
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
//               <TextField
//                 label="Champ 1"
//                 variant="outlined"
//                 fullWidth
//                 value={champ1}
//                 onChange={handleChangeChamp1}
//                 style={{ marginBottom: '10px' }}
//               />

//               {champs2.map((value, index) => (
//                 <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
//                   <TextField
//                     label={`Champ 2 - ${index + 1}`}
//                     variant="outlined"
//                     value={value}
//                     onChange={(event) => handleChangeChamp2(event.target.value, index)}
//                   />

//                   {index === champs2.length - 1 && (
//                     <Button
//                       type="button"
//                       variant="contained"
//                       onClick={ajouterNouveauChamp2}
//                       style={{ marginLeft: '10px' }}
//                     >+ </Button>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
//               Soumettre
//             </Button>
//           </form>

//           <div style={{ marginTop: '20px' }}>
//             {valeursSoumises.map((soumission, index) => (
//               <div key={index}>
//                 <Typography variant="body1" gutterBottom>
//                   Champ 1: {soumission.champ1}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Champs 2: {soumission.champs2.join(', ')}
//                 </Typography>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default App;
