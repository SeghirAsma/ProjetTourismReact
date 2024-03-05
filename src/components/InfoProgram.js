import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {Container,Typography,Box,Card,CardContent,Button ,TextField,Grid,
    ListItemText,ListItemIcon,MenuItem,MenuList,Paper,Divider,InputLabel,
    Select,Checkbox,OutlinedInput ,FormControl,Alert} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ReactPlayer from 'react-player'

function InfoProgram({videoContenuUrl}) {
    const [infoProgram, setInfoProgram] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormDetails, setShowFormDetails] = useState(false);
    const [nameProgram, setNameProgram] = useState('');
    const [referenceProgram, setReferenceProgram] = useState('');
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [items, setItems] = useState([]);
    const [contents, setContents] = useState([]);  //
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedContents, setSelectedContents] = useState([]);
    const [selectedItemsDetails, setSelectedItemsDetails] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
    const [modifiedSuccessAlert, setModifieduccessAlert] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedContent, setSelectedContent] = useState(null);
    const [selectedContentsDetails, setSelectedContentsDetails] = useState([]);
    const [referenceProgramError, setReferenceProgramError] = useState('');
    const [nameError, setNameError] = useState('');


    const filename = selectedContent?.videoContenuUrl ? selectedContent.videoContenuUrl.split('/').pop() : '';
    const videoUrl = filename ? `http://localhost:8099/api/contenus/videos/${encodeURIComponent(filename)}` : '';
    dayjs.extend(utc);  //pour prend notre time sans ajouter 1 à l'heure
 
      const getItems = async () => {
        try {
          const response = await axios.get('http://localhost:8099/api/items/nonDeletedItems');
          setItems(response.data); 
          console.log('All Items:', response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des items:', error);
        }
      };

      const getContents = async () => {
        try {
          const response = await axios.get('http://localhost:8099/api/contenus/all');
          // setContents(response.data);
          const filteredContenus = response.data.filter((contenu => !contenu.deleted && contenu.approved) );
          setContents(filteredContenus); 
          console.log('All Contents:', response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des items:', error);
        }
      };
      
      useEffect(() => {
        axios.get('http://localhost:8099/api/programs/gelAllPrograms')
          .then(response => {
            setInfoProgram(response.data);
            console.log('Programs:', response.data);
        })
          .catch(error => console.error('Error fetching info programs:', error));
        getItems();
        getContents();
      }, []); 
    
    
    const toggleForm = () => {
      setShowForm(!showForm);
    };
  
    const handleReferenceProgramChange = (event) => {
      const { value } = event.target;
      const referenceProgramValidationRegex = /^[A-Z0-9-_ *]{3,}$/;
      const isValid = referenceProgramValidationRegex.test(value);
      setReferenceProgram(value);
      setReferenceProgramError(isValid ? '' : 'Reference Item must be in uppercase and have at least 3 characters.');
    };
    
    const handleNameProgramChange = (event) => {
      const { value } = event.target;
      const nameValidationRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
      const isValid = nameValidationRegex.test(value);
      setNameProgram(value);
      setNameError(isValid ? '' : 'Name must start with an uppercase letter and have at least 3 characters.');
    };
    const handleCancel = () => {
      setReferenceProgram('');
      setNameProgram('');
      setShowForm(false);
    };

    const handleCancelFormDetails = () => {   
        setShowFormDetails(false);
      };
   
  const handleMenuClick = (event, selectedInfoProgram) => {
    setSelectedProgram({
      ...selectedInfoProgram,
      id: selectedInfoProgram.idProgram,
    });
    // setSelectedItems(selectedInfoProgram.items || []); 
    setSelectedItemsDetails(selectedInfoProgram.items || []); 
    // setSelectedContents(selectedInfoProgram.contents|| []); 
    setSelectedContentsDetails(selectedInfoProgram.contents || []); 
    setShowFormDetails(true);
  };
  

  const handleReferenceProgramDetailsChange = (event) => {
  setSelectedProgram({ ...selectedProgram, referenceProgram: event.target.value });

  };

  const handleNameprogramDetailsChange = (event) => {
  setSelectedProgram({ ...selectedProgram, nameProgram: event.target.value });
  };


  const handleArchiveItem = async () => {
   
    try {
      if (!selectedProgram || !selectedProgram.id) {
        console.error("ID de l'élément non valide.");
        return;
      }
      const storedToken = localStorage.getItem('token');

      await axios.put(`http://localhost:8099/api/programs/archiveProgram/${selectedProgram.id}`, {}, {
        headers: {
        Authorization: `Bearer ${storedToken}`,
        }, 
    });
      
      axios.get('http://localhost:8099/api/programs/gelAllPrograms')
        .then(response => setInfoProgram(response.data))
        .catch(error => console.error('Erreur lors du rechargement des éléments après archivage:', error));

      setShowFormDetails(false);
    
      setDeleteSuccessAlert(true);
      setTimeout(() => {
        setDeleteSuccessAlert(false);
      }, 4000);
    } catch (error) {
      console.error('Erreur lors de l\'archivage de l\'élément:', error);
    }
  };

//pour trier les nn deleted avant les deleted
  infoProgram.sort((a, b) => {
    if (!a.deleted && b.deleted) {
      return -1;
    } else if (a.deleted && !b.deleted) {
      return 1;
    }
    return a.referenceProgram.localeCompare(b.referenceProgram);
  });

  //create program
    const handleSubmit = async () => {
      const programData = {
        referenceProgram: referenceProgram,
        nameProgram: nameProgram,
        items: Array.isArray(selectedItems) ? selectedItems : [selectedItems],
        contents: Array.isArray(selectedContents) ? selectedContents : [selectedContents],
      };
      const storedToken = localStorage.getItem('token');

    await axios.post('http://localhost:8099/api/programs/createProgram', programData, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      }, 
    });
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
    }, 4000);
    };

//pour selectionner les items
  const handleItemsChange = (event) => {
    const selectedItems = event.target.value.map(value => {
      if (typeof value === 'string') {
        return items.find(item => item.referenceItem === value) || {};
      }
      return value;
    });
  setSelectedItems(selectedItems);
  };

  //pour selectionner les contneus
  const handleContentsChange = (event) => {
    const selectedContentIds = event.target.value;
    const selectedContents = selectedContentIds.map(id => contents.find(content => content.idContenu === id) || {});
    setSelectedContents([...selectedContents]); 
    console.log("setSelectedContents", [...selectedContents]);
  };
  

  const handleItemsChangeDetails = (event) => {  
    const selectedItems = event.target.value.map(value => {
      if (typeof value === 'string') {
        return items.find(item => item.referenceItem === value) || {};
      }
      return value;
    });  
    setSelectedItemsDetails(selectedItems);
  };
  
  const handleContentsChangeDetails = (event) => {  
    const selectedContents = event.target.value.map(value => {
      if (typeof value === 'string') {
        return contents.find(content => content.idContenu === value) || {};
      }
      return value;
    });  
    setSelectedContentsDetails(selectedContents);
  };
  const handleSubmitDetails = async (event) => {
    event.preventDefault();
  
    try {
      if (!selectedProgram || !selectedProgram.id) {
        return;
      }
      const storedToken = localStorage.getItem('token');

      await axios.put(`http://localhost:8099/api/programs/updateProgram/${selectedProgram.id}`, {
        referenceProgram: selectedProgram.referenceProgram,
        nameProgram: selectedProgram.nameProgram,
        items: selectedItemsDetails.map(item => item.idItem),
        contents: selectedContentsDetails.map(content => content.idContenu),
      }, {
        headers: {
           Authorization: `Bearer ${storedToken}`,
         }, 
       });
  
      axios.get('http://localhost:8099/api/programs/gelAllPrograms')
        .then(response => setInfoProgram(response.data))
        .catch(error => console.error('Erreur lors du rechargement des éléments après mise à jour:', error));
  
      setShowFormDetails(false);
      setModifieduccessAlert(true);
      setTimeout(() => {
        setModifieduccessAlert(false);
      }, 4000);

    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'élément:', error);
    }
  };
  
  //pour items
  const handleVisibilityButtonClick = (itemId) => {
    if (selectedItem && selectedItem.idItem === itemId) {
      setSelectedItem(null);
    } else {
      const foundItem = items.find(item => item.idItem === itemId);
      setSelectedItem(foundItem);
    }
  };

   //pour contenus
   const handleVisibilityContenuButtonClick = (ContenuId) => {
    if (selectedContent && selectedContent.idContenu === ContenuId) {
      setSelectedContent(null);
    } else {
      const foundContent = contents.find(content => content.idContenu === ContenuId);
      setSelectedContent(foundContent);

    }
  };
 
  
  const handleCloseCardItem = () => {
    setSelectedItem(null);
  };

  const handleCloseCardContent = () => {
    setSelectedContent(null);
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
               <AddCircleIcon />
            </Button>
              <Paper sx={{width: 345, maxWidth: '100%', marginTop: '12px', maxHeight: '65vh',
                  overflow: 'auto', '&::-webkit-scrollbar': { width: '7px',},
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#8497aa', borderRadius: '10px',},
                  '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', },
                }} >
                <MenuList>
                  <MenuItem>
                    <ListItemIcon style={{ color: '#033568' }}>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        Program Created
                      </Typography>
                    </ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuList>
        {infoProgram.map((infoProgram, index) => (
          [
            <div key={`program-${infoProgram.idProgram}`} className={`menu-item ${infoProgram.deleted ? 'archived' : ''}`}>
              <MenuItem key={`menu-item-${infoProgram.idProgram}`} onClick={(event) => handleMenuClick(event, infoProgram)} 
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>{infoProgram.referenceProgram}</div>
                <div><Typography color="text.secondary">{infoProgram.nameProgram}</Typography></div>
              </MenuItem>
            </div>,
            index !== infoProgram.length - 1 && <Divider key={`divider-${infoProgram.idProgram}`} />
          ]
        ))}
      </MenuList>
            </MenuList>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>

{showFormDetails && selectedProgram &&  (
  <div>
    <Container component="main" maxWidth="sm" sx={{ margin: 'auto', marginTop: '25px' }}>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', marginRight: 'auto' }}>
        Details Program
      </Typography>
      {selectedProgram && selectedProgram.deleted ? (
        <Typography component="h1" variant="subtitle1" style={{color: 'red', marginLeft: '160px' }}>
          Program Already Deleted
        </Typography>
      ) : (
        <IconButton color="error" style={{ marginLeft: '300px', alignItems: 'flex-end' }} onClick={handleArchiveItem}>
          <DeleteIcon />
        </IconButton>
      )}
    </div>
        <form style={{ width: '100%', marginTop: 16 }} onSubmit={handleSubmitDetails}>
          <TextField
            id="referenceProgram" label="Reference Program" name="referenceProgram" variant="outlined" margin="normal" autoComplete="referenceProgram" required fullWidth
            value={selectedProgram.referenceProgram} onChange={handleReferenceProgramDetailsChange}
          />
          <TextField id="name" label="Name Program" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth 
              value={selectedProgram.nameProgram} onChange={handleNameprogramDetailsChange}/>
 
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="items-select-details">Select Items</InputLabel>
              <Select
                multiple label="Select Items"
                value={selectedItemsDetails.map(item => item.referenceItem)}
                onChange={handleItemsChangeDetails}
                input={<OutlinedInput label="Select Items" id="items-select-details" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={{ PaperProps: { style: { maxHeight: 300, }, },
                   }} >
                {items.map((item) => (   
                  <MenuItem key={item.idItem} value={item.referenceItem}>
                    <Checkbox checked={selectedItemsDetails.some(selectedItem => selectedItem.idItem === item.idItem)} />
                    <ListItemText primary={item.referenceItem} />
                    <Button
          variant="text"
          style={{color:'orange'}}
          onClick={() => handleVisibilityButtonClick(item.idItem)}
        >
        <VisibilityIcon />
        </Button>
                  </MenuItem>    
                 
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="contents-select-details">Select Contents</InputLabel>
              <Select
                multiple label="Select Contents"
                value={selectedContentsDetails.map(content => content.idContenu)}
                onChange={handleContentsChangeDetails}
                input={<OutlinedInput label="Select Contents" id="contents-select-details" />}
                renderValue={(selected) => {
                  const selectedTitles = selectedContentsDetails.map(content => content.titleContenu);
                  return selectedTitles.join(', ');
                }}        
                MenuProps={{ PaperProps: { style: { maxHeight: 300, }, },
                   }} >
                {contents.map((content) => (   
                  <MenuItem key={content.idContenu} value={content.idContenu}>
                    <Checkbox checked={selectedContentsDetails.some(selectedContent => selectedContent.idContenu === content.idContenu)} />
                    <ListItemText primary={content.titleContenu} />
                    <Button
          variant="text"
          style={{color:'orange'}}
          onClick={() => handleVisibilityContenuButtonClick(content.idContenu)}
        >
        <VisibilityIcon />
        </Button>
                  </MenuItem>    
                 
                ))}
              </Select>
            </FormControl>
            <div className="button-container">
              <Button type="submit" variant="contained" color="success"  className="submit-button" 
                  disabled={selectedProgram && selectedProgram.deleted}
                  >
                Update
              </Button>
              <Button type="button" variant="contained" color="error" className="cancel-button" onClick={handleCancelFormDetails}>
                Cancel
              </Button>
            </div>
        </form>
      </Paper>
    </Container>
  </div>
)}

  {showForm && (
        <div >
      <Container component="main" maxWidth="sm" sx={{ margin: 'auto',marginTop: '25px' }} >
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%' }}>
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold'  }}>
            Add New program
          </Typography>
          <form  style={{ width: '100%', marginTop: 16 }} onSubmit={handleSubmit}  >
            <TextField id="referenceProgram" label="Reference Program" name="referenceProgram" variant="outlined" margin="normal" 
            autoComplete="referenceProgram" required fullWidth
            value={referenceProgram}   
            onChange={handleReferenceProgramChange} 
            error={!!referenceProgramError}  
            helperText={referenceProgramError}>
            </TextField>
            <TextField id="name" label="Name Program" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth 
              value={nameProgram} 
              onChange={handleNameProgramChange}
              error={!!nameError}
              helperText={nameError}>
            </TextField>
     
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="items-select">Select Items</InputLabel>
                   <Select
                          multiple label="Select Items"
                          value={selectedItems.map(item => item.referenceItem)}
                          onChange={handleItemsChange}
                          input={<OutlinedInput label="Select Items" id="items-select" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={{ PaperProps: {
                                style: { maxHeight: 300,  },  },
                        }} >
                          {items.map((item) => (
                           <MenuItem key={item.idItem} value={item.referenceItem}>
                              <Checkbox checked={selectedItems.some(selectedItem => selectedItem.idItem === item.idItem)} />
                              <ListItemText primary={item.referenceItem} />
                              <Button
                                variant="text"
                                style={{color:'orange'}}
                                onClick={() => handleVisibilityButtonClick(item.idItem)}
                              >
                                <VisibilityIcon />
                              </Button>
                          </MenuItem>
                          ))}
                      </Select>                   
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="contents-select">Select Contents</InputLabel>
                <Select
                    multiple
                    label="Select Contents"
                    value={selectedContents.map(content => content.idContenu)}
                    onChange={handleContentsChange}
                    input={<OutlinedInput label="Select Contents" id="contents-select" />}
                    // renderValue={(selected) => selected.join(', ')}
                    renderValue={(selected) => {
                      const selectedTitles = selectedContents.map(content => content.titleContenu);
                      return selectedTitles.join(', ');
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 300 },
                        },
                    }}
                >
                    {contents.map((content) => (
                        <MenuItem key={content.idContenu} value={content.idContenu}>
                            <Checkbox checked={selectedContents.some(selectedContent => selectedContent.idContenu === content.idContenu)} />
                            <ListItemText primary={content.titleContenu} />
                            <Button
                                variant="text"
                                style={{color:'orange'}}
                                onClick={() => handleVisibilityContenuButtonClick(content.idContenu)}
                              >
                                <VisibilityIcon />
                              </Button>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <div className="button-container">
              <Button type="submit" variant="contained" color="success"  className="submit-button" >
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

    {selectedItem && (
            <Card style={{height:'250px', marginTop:'50px'}}>
              <CardContent>
              <Typography variant="h5" component="div"> {selectedItem.referenceItem}/{selectedItem.name} </Typography>
                <Typography color="text.secondary"> Name: {selectedItem.name} </Typography>
                <Typography color="text.secondary"> Type: {selectedItem.type} </Typography>
                <Typography color="text.secondary"> Destination: {selectedItem.destination} </Typography>
                <Typography color="text.secondary"> Date Debut: {dayjs.utc(selectedItem.dateDebut).format('DD-MM-YYYY')}</Typography>
                <Typography color="text.secondary"> Date Fin: {dayjs.utc(selectedItem.dateFin).format('DD-MM-YYYY')}</Typography>
                <Typography color="text.secondary"> price: {selectedItem.price} </Typography>
                <Typography color="text.secondary"> Required: {selectedItem.required ? 'Obligatoire' : 'Facultatif'} </Typography>

                <Button onClick={handleCloseCardItem}>Close</Button>
              </CardContent>
            </Card>
          )}

        {selectedContent && (
                <Card style={{height:'450px', marginTop:'25px', width:'350px'}}>
                  <CardContent>
                  <Typography variant="h5" component="div"> {selectedContent.titleContenu} </Typography>
                    <Typography color="text.secondary"> {selectedContent.descriptionContenu} </Typography>
                    {selectedContent.videoContenuUrl && (
                <ReactPlayer url={videoUrl} controls width="90%" height="340px"/>
              )}
                    <Button onClick={handleCloseCardContent}>Close</Button>
                  </CardContent>
                </Card>
              )}

      {successAlert && (
          <Alert
            severity="success"
            color="success"
            onClose={() => setSuccessAlert(false)}
            style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
          >
             Program Added successfully
          </Alert>
        )}  
       {deleteSuccessAlert && (
        <Alert
          severity="success"
          color="success"
          onClose={() => setDeleteSuccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
           Program deleted successfully
        </Alert>
      )}
       {modifiedSuccessAlert && (
        <Alert
          severity="success"
          color="success"
          onClose={() => setModifieduccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
           Program updated successfully
        </Alert>
      )}
        
     
    </div>
  );
}

export default InfoProgram;

// const handleReferenceProgramChange = (event) => {
    //   setReferenceProgram(event.target.value);
    // };
    
    // const handleNameProgramChange = (event) => {
    //   setNameProgram(event.target.value);
    // };