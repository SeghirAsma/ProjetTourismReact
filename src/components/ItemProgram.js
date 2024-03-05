import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {Container,Typography,Box,Card,CardContent,Button ,TextField,Grid,
    ListItemText,ListItemIcon,MenuItem,MenuList,Paper,Divider,Alert } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function ItemProgram() {
    const [infoPrograms, setInfoPrograms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormDetails, setShowFormDetails] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    // const [dateDebut, setDateDebut] = useState('');
    // const [dateFin, setDateFin] = useState('');
    const [dateDebut, setDateDebut] = useState(dayjs());  
    const [dateFin, setDateFin] = useState(dayjs());
    const [price, setPrice] = useState('');
    const [referenceItem, setReferenceItem] = useState('');
    const [required, setRequired] = useState(true); // true par défaut, 

    const [selectedItem, setSelectedItem] = useState(null);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
    const [modifiedSuccessAlert, setModifieduccessAlert] = useState(false);
    const [referenceItemError, setReferenceItemError] = useState('');
    const [nameError, setNameError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [destinationError, setDestinationError] = useState('');
    const [dateDebutError, setDateDebutError] = useState('');
    const [dateFinError, setDateFinError] = useState('');
    
      useEffect(() => {
        axios.get('http://localhost:8099/api/items/gelAllItems')
          // .then(response => setInfoPrograms(response.data))
          .then(response => {
            setInfoPrograms(response.data);
          })
          .catch(error => console.error('Error fetching info programs:', error));
      }, []);

      const toggleForm = () => {
        setShowForm(!showForm);
      };
    
    
      const handleReferenceItemChange = (event) => {
        const { value } = event.target;
        const referenceItemValidationRegex = /^[A-Z0-9-_ *]{3,}$/;
        const isValid = referenceItemValidationRegex.test(value);
        setReferenceItem(value);
        setReferenceItemError(isValid ? '' : 'Reference Item must be in uppercase and have at least 3 characters.');
      };

      const handleNameItemChange = (event) => {
        const { value } = event.target;
        const nameValidationRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
        const isValid = nameValidationRegex.test(value);
        setName(value);
        setNameError(isValid ? '' : 'Name must start with an uppercase letter and have at least 3 characters.');
      };

      const handleTypeItemChange = (event) => {
        const { value } = event.target;
        const typeValidationRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
        const isValid = typeValidationRegex.test(value);
          setType(event.target.value);
          setTypeError(isValid ? '' : 'Type must start with an uppercase letter and have at least 3 characters.');

      };

      const handlePriceItemChange = (event) => {
        setPrice(event.target.value);
      };

      
      const handleDestinationItemChange = (event) => {
        const { value } = event.target;
        const destinationValidationRegex = /^[A-Z][a-zA-Z\s]{2,}$/;
        const isValid = destinationValidationRegex.test(value);
        setDestination(event.target.value);
        setDestinationError(isValid ? '' : 'Destination must start with an uppercase letter and have at least 3 characters.');

      };
       
    const handleDateDebutItemChange = (date) => {
      setDateDebut(dayjs(date));
      if (dateFin && dayjs(date) > dayjs(dateFin)) {
        setDateDebutError('Start Date must be before End Date.');
      } else {
        setDateDebutError('');
      }
    };
  
    const handleDateFinItemChange = (date) => {
      setDateFin(dayjs(date));
        if (dateDebut && dayjs(date) < dayjs(dateDebut)) {
        setDateFinError('End Date must be after Start Date.');
      } else {
        setDateFinError('');
      }
    };
  
      const handleCancel = () => {
        setDateDebut('');
        setDateFin('');
        setDestination('');
        setName('');
        setPrice('');
        setReferenceItem('');
        setType('');
        setShowForm(false);

      };

      const handleCancelFormDetails = () => {   
          setShowFormDetails(false);

        };

    //create item
      const handleSubmit = async () => {
        try {

          if (!referenceItem || !name || !type || !destination || !dateDebut || !dateFin || !price) {
            console.error('Veuillez remplir tous les champs du formulaire.');
            return;
          }
         await axios.post('http://localhost:8099/api/items/createItem', {
              referenceItem: referenceItem,
              name: name,
              type:type,
              destination:destination,
              // dateDebut:dateDebut,
              // dateFin:dateFin,
              dateDebut: dateDebut.toISOString(),
              dateFin: dateFin.toISOString(),
              price:price,
              required:required
          });
       

          setSuccessAlert(true);
          setTimeout(() => {
            setSuccessAlert(false);
          }, 6000);
          setName('');
          setPrice('');
          // setDateDebut('');
          // setDateFin('');
          setDateDebut(dayjs());
        setDateFin(dayjs());
          setDestination('');
          setReferenceItem('');
          setType('');
          setRequired(true);  //

          setShowForm(false);

         
        } catch (error) {
          console.error('Erreur lors de l\'ajout du programme:', error);
        }
      };
   
    
    const handleMenuClick = (event, selectedInfoProgram) => {
      setSelectedItem({
        ...selectedInfoProgram,
        id: selectedInfoProgram.idItem,
        dateDebut: dayjs(selectedInfoProgram.dateDebut),
        dateFin: dayjs(selectedInfoProgram.dateFin),
      });
      setShowFormDetails(true);

    };
    

    const handleReferenceItemDetailsChange = (event) => {
    setSelectedItem({ ...selectedItem, referenceItem: event.target.value });

    };

    const handleNameItemDetailsChange = (event) => {
    setSelectedItem({ ...selectedItem, name: event.target.value });
    };

    const handleTypeItemDetailsChange = (event) => {
    setSelectedItem({ ...selectedItem, type: event.target.value });
    };

    const handleDestinationItemDetailsChange = (event) => {
    setSelectedItem({ ...selectedItem, destination: event.target.value });
    };

    const handleDateDebutItemDetailsChange = (date) => {
    setSelectedItem({ ...selectedItem, dateDebut: dayjs(date) });
    };

    const handleDateFinItemDetailsChange = (date) => {
    setSelectedItem({ ...selectedItem, dateFin: dayjs(date) });
    };

    const handlePriceItemDetailsChange = (event) => {
    setSelectedItem({ ...selectedItem, price: event.target.value });
    };

    useEffect(() => {
      if (selectedItem && selectedItem.required !== undefined) {
        setRequired(selectedItem.required);
      }
    }, [selectedItem]);
    
    //update item
    const handleSubmitDetails = async (event) => {
    event.preventDefault(); 
    try {
      if (!selectedItem || !selectedItem.id) {
        return;
      }
      await axios.put(`http://localhost:8099/api/items/updateitem/${selectedItem.id}`, {
        referenceItem: selectedItem.referenceItem,
        name: selectedItem.name,
        type: selectedItem.type,
        destination: selectedItem.destination,
        dateDebut: selectedItem.dateDebut.toISOString(),
        dateFin: selectedItem.dateFin.toISOString(),
        price: selectedItem.price,
        required : required
      });

      axios.get('http://localhost:8099/api/items/gelAllItems')
      .then(response => setInfoPrograms(response.data))
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

  //archieve item
    const handleArchiveItem = async () => {

      try {
        if (!selectedItem || !selectedItem.id) {
          console.error("ID de l'élément non valide.");
          return;
        }
    
        await axios.put(`http://localhost:8099/api/items/archiveItem/${selectedItem.id}`);
        
        axios.get('http://localhost:8099/api/items/gelAllItems')
          .then(response => setInfoPrograms(response.data))
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
  infoPrograms.sort((a, b) => {
    if (!a.deleted && b.deleted) {
      return -1;
    } else if (a.deleted && !b.deleted) {
      return 1;
    }
    return a.referenceItem.localeCompare(b.referenceItem);
  });



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
                    Items List
                  </Typography>
                </ListItemText>
              </MenuItem>
              <Divider />
              {infoPrograms.map((infoProgram, index) => (
                <div key={`program-${index}`} className={`menu-item ${infoProgram.deleted ? 'archived' : ''}`}>
                  <MenuItem onClick={(event) => handleMenuClick(event, infoProgram)} 
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div>{infoProgram.referenceItem}</div>
                    <div><Typography color="text.secondary">{infoProgram.name}</Typography></div>
                  </MenuItem>
                  {index !== infoPrograms.length - 1 && <Divider key={`divider-${index}`} />}
                </div>
            ))}
         </MenuList>
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>

{showFormDetails && selectedItem && (
  <div>
    <Container component="main" maxWidth="sm" sx={{ margin: 'auto', marginTop: '13px' }}>
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}> 
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold', marginRight: 'auto' }}>
            Details Item
          </Typography>
          {selectedItem && selectedItem.deleted ? (
            <Typography component="h1" variant="subtitle1" style={{color: 'red', marginLeft: '240px' }}>
              Item Already Deleted
            </Typography>
          ) : (
            <IconButton color="error" style={{ marginLeft: '350px', alignItems: 'flex-end' }} onClick={handleArchiveItem}>
              <DeleteIcon />
            </IconButton>
          )}
        </div>

        <form style={{ width: '100%', marginTop: 16 }} onSubmit={handleSubmitDetails}>
          <TextField
            id="referenceItem" label="Reference Item" name="referenceItem" variant="outlined" margin="normal" autoComplete="referenceItem" required fullWidth
            value={selectedItem.referenceItem} onChange={handleReferenceItemDetailsChange}
          />
          <TextField id="name" label="Name Item" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth 
              value={selectedItem.name} onChange={handleNameItemDetailsChange}/>
             <TextField id="type" label="Type" name="type" variant="outlined" margin="normal" autoComplete="type" required fullWidth
              value={selectedItem.type}   onChange={handleTypeItemDetailsChange}  />
          <TextField
              id="destination" label="Destination" name="destination" variant="outlined" autoComplete="destination"
              margin="normal"  required fullWidth 
              value={selectedItem.destination} onChange={handleDestinationItemDetailsChange} />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Start Date" value={selectedItem.dateDebut} 
                  onChange={handleDateDebutItemDetailsChange} required fullWidth />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="End Date" value={selectedItem.dateFin} 
                  onChange={handleDateFinItemDetailsChange} required fullWidth />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

         <Grid container spacing={2}>
            <Grid item xs={6}>
               <TextField type="number"  id="price" label="Price" name="price" variant="outlined" margin="normal" 
               autoComplete="price" required fullWidth
              value={selectedItem.price}   
              onChange={handlePriceItemDetailsChange}
              InputProps={{startAdornment: (
                   <InputAdornment position="start">
                       <Typography variant="body2" color="textSecondary"> Accepts integer or double</Typography>
                    </InputAdornment> ), }} />
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="required-select-label">Required</InputLabel>
                    <Select
                      labelId="required-select-label"
                      id="required-select"
                      value={required}
                      label="Required"
                      onChange={(e) => setRequired(e.target.value)}
                    >
                      <MenuItem value={true}>Mandatory</MenuItem>
                      <MenuItem value={false}>Optional</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
         </Grid>

            <div className="button-container">
              <Button type="submit" variant="contained" color="success"  className="submit-button" 
                  disabled={selectedItem && selectedItem.deleted}
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
      <Container component="main" maxWidth="sm" sx={{ margin: 'auto',marginTop: '13px' }} >
        <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', width:'100%' }}>
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold'  }}>
            Add New Item
          </Typography>
          <form  style={{ width: '100%', marginTop: 16 }}  >
            <TextField id="referenceItem" label="Reference Item" name="referenceItem" variant="outlined" margin="normal" 
            autoComplete="referenceItem" required fullWidth
            value={referenceItem}   onChange={handleReferenceItemChange} 
            error={!!referenceItemError}  
            helperText={referenceItemError}  
             />
            <TextField id="name" label="Name Item" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth value={name} onChange={handleNameItemChange} 
              error={!!nameError}
              helperText={nameError}/>
             <TextField id="type" label="Type" name="type" variant="outlined" margin="normal" autoComplete="type" 
             required fullWidth value={type}   onChange={handleTypeItemChange}  
             error={!!typeError}
             helperText={typeError}/>
            <TextField id="destination" label="Destination" name="destination" variant="outlined" autoComplete="destination"
              margin="normal"  required fullWidth value={destination} onChange={handleDestinationItemChange} 
              error={!!destinationError}
              helperText={destinationError}/>
    
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="Start Date" required fullWidth
                      value={dateDebut} onChange={handleDateDebutItemChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="End Date" required fullWidth
                      value={dateFin} onChange={handleDateFinItemChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                { (
                  <Typography variant="body2" color="error">
                    {dateDebutError}
                  </Typography>
                )}
                { (
                  <Typography variant="body2" color="error">
                    {dateFinError}
                  </Typography>
                )}
              </Grid>
            </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                       <TextField
                         type="number" id="price" label="Price" name="price" variant="outlined" margin="normal"
                         autoComplete="price" required fullWidth
                         value={price}
                         onChange={handlePriceItemChange}
                        InputProps={{startAdornment: (
                            <InputAdornment position="start">
                                <Typography variant="body2" color="textSecondary"> Accepts integer or double</Typography>
                            </InputAdornment> ),
                                }} />
                     </Grid>
                    <Grid item xs={6}>
                      <FormControl fullWidth margin="normal" required>
                        <InputLabel id="required-select-label">Required</InputLabel>
                        <Select
                          labelId="required-select-label"
                          id="required-select"
                          value={required}
                          label="Required"
                          onChange={(e) => setRequired(e.target.value === 'true')}
                        >
                          <MenuItem value={'true'}>Mandatory</MenuItem>
                          <MenuItem value={'false'}>Optional</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
              </Grid>

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
      
   
      {successAlert && (
          <Alert
            severity="success"
            color="success"
            onClose={() => setSuccessAlert(false)}
            style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
          >
            Item Program Added successfully
          </Alert>
        )}  
       {deleteSuccessAlert && (
        <Alert
          severity="success"
          color="success"
          onClose={() => setDeleteSuccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
          Item Program deleted successfully
        </Alert>
      )}
       {modifiedSuccessAlert && (
        <Alert
          severity="success"
          color="success"
          onClose={() => setModifieduccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
          Item Program updated successfully
        </Alert>
      )}
    </div>
  );
}

export default ItemProgram;

 // const handleReferenceItemChange = (event) => {
      //   setReferenceItem(event.target.value);
      // };

      // const handleTypeItemChange = (event) => {
      //   setTypeItem(event.target.value);
      // };

        // const handleNameItemChange = (event) => {
      //   setName(event.target.value);
      // };
      // const handleDestinationItemChange = (event) => {
      //   setDestination(event.target.value);
      // };
    // const handleDateDebutItemChange = (date) => {
    //     setDateDebut(dayjs(date));
    //   };
      
    //   const handleDateFinItemChange = (date) => {
    //     setDateFin(dayjs(date));
    //   };

          
     /* <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start Date" value={dateDebut} onChange={handleDateDebutItemChange} required fullWidth
                />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="End Date" value={dateFin} onChange={handleDateFinItemChange} required fullWidth 
               />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid> */

       /* <TextField
            type="number"  id="price" label="Price" name="price" variant="outlined" margin="normal" autoComplete="price" required fullWidth
              value={price}   onChange={handlePriceItemChange} 
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="body2" color="textSecondary">
                      Accepts integer or double
                    </Typography>
                  </InputAdornment>
                ),      }} >
              </TextField>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="required-select-label">Required</InputLabel>
                <Select
                  labelId="required-select-label"
                  id="required-select"
                  value={required}
                  label="Required"
                  onChange={(e) => setRequired(e.target.value === 'true')} 
                >
                  <MenuItem value={'true'}>Obligatoire</MenuItem>
                  <MenuItem value={'false'}>Facultatif</MenuItem>
                </Select>
              </FormControl> */

              
      /* <TextField type="number"  id="price" label="Price" name="price" variant="outlined" margin="normal" autoComplete="price" 
      required fullWidth value={selectedItem.price}   onChange={handlePriceItemDetailsChange}  /> */