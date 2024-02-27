import Sidebar from './Sidebar';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
 import TextField from '@mui/material/TextField';
import {Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Menu from '@mui/material/Menu';

function Programme() {
    const [infoPrograms, setInfoPrograms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [referenceProgram, setReferenceProgam] = useState('');
    const [TitleProgram, setTitleProgram] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);



    useEffect(() => {
      axios.get('http://localhost:8099/api/infoStandardProgram/getallinfoprogram')
        .then(response => setInfoPrograms(response.data))
        .catch(error => console.error('Error fetching info programs:', error));
    }, []);

    const toggleForm = () => {
      setShowForm(!showForm);
    };
  
    const handleReferenceChange = (event) => {
      setReferenceProgam(event.target.value);
    };
    const handleTitleProgramChange = (event) => {
      setTitleProgram(event.target.value);
    };

  
    const handleCancel = () => {
      setReferenceProgam('');
      setTitleProgram('');
      setShowForm(false);

    };

    const handleSubmit = async () => {
      try {
        if (!TitleProgram || !referenceProgram) {
          console.error('Veuillez remplir tous les champs du formulaire.');
          return;
        }
  
        await axios.post('http://localhost:8099/api/infoStandardProgram/createinfoprogram', {
          referenceProgram: referenceProgram,
          titleProgram: TitleProgram,
        });
  
        setReferenceProgam('');
        setTitleProgram('');
        setShowForm(false);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du programme:', error);
      }
    };
  
    const handleMenuClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};


  

  
  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '80px' }}>
    <Sidebar />
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '80vh', padding: '16px', marginRight: '30px' }}>
 
  <Grid container spacing={2} >
    <Grid item xs={12} >
      <Card sx={{ width: '100%' }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant="contained" style={{ alignSelf: 'flex-end', marginBottom: '16px' }} onClick={toggleForm}>
    Add info Program <AddCircleIcon />
  </Button>
          <Paper sx={{width: 345, maxWidth: '100%', marginTop: '12px', maxHeight: '65vh',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '7px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#8497aa',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            <MenuList>
              <MenuItem>
                <ListItemIcon style={{ color: '#033568' }}>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Program List
                  </Typography>
                </ListItemText>
              </MenuItem>
              <Divider />

              {infoPrograms.map((infoProgram, index) => (
                <Grid container key={infoProgram.idInfoProgram} spacing={2} alignItems="center" >
                  <Grid item xs={8}>
                    <MenuItem sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center'  }}>
                      <div>{infoProgram.referenceProgram} </div>
                      <div> <Typography color="text.secondary">{infoProgram.titleProgram}</Typography> </div>
                    </MenuItem>
                  </Grid>
                  <Grid item xs={4}>
                    <MenuItem sx={{ display: 'flex', flexDirection: 'column' ,alignItems: 'center' }}>
                      <div style={{ alignSelf: 'flex-end' }}>
                        <IconButton size="large" edge="start" color="inherit"
                          onClick={handleMenuClick}> <MoreVertIcon />
                        </IconButton>
                        <Menu
                         anchorEl={anchorEl}
                         open={Boolean(anchorEl)}
                         onClose={handleClose} >
                            <MenuItem> <AddCircleIcon  style={{ color: 'green' }}/> Add Program</MenuItem>
                            <MenuItem> <VisibilityIcon  style={{ color: 'orange' }}/> Details Program</MenuItem>
                           
                        </Menu>
                      </div>
                    </MenuItem>
                  </Grid>
                  {index !== infoPrograms.length - 1 && <Grid item xs={12}><Divider key={`divider-${infoProgram.idInfoProgram}`} /></Grid>}
                </Grid>
              ))}
            </MenuList>
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>

{showForm && (
        <div >
      <Container component="main" maxWidth="xs" >
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
            Add Info program
          </Typography>
          <form  style={{ width: '100%', marginTop: 16 }}  >
            <TextField
              id="referenceProgram" label="Reference Program" name="referenceProgram" variant="outlined" margin="normal" autoComplete="referenceProgram" required fullWidth
              value={referenceProgram}   onChange={handleReferenceChange}  />
            <TextField
              id="TitleProgram" label="Title Program" name="TitleProgram" variant="outlined" autoComplete="TitleProgram"
              margin="normal"  required fullWidth value={TitleProgram} onChange={handleTitleProgramChange}
            />
            <div className="button-container">
              <Button type="submit" variant="contained" color="success"  className="submit-button" onClick={handleSubmit}>
                Submit
              </Button>
              <Button type="button" variant="contained" color="error" className="cancel-button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      </div>
)}
      
   
        
     
    </div>
  );
}

export default Programme;


 