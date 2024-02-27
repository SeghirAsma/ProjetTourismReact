import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import {Container,Typography,Box,Card,CardContent,Button ,TextField,Grid,
    ListItemText,ListItemIcon,MenuItem,MenuList,Paper,Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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
    const [selectedItem, setSelectedItem] = useState(null);



    useEffect(() => {
      axios.get('http://localhost:8099/api/items/gelAllItems')
        .then(response => setInfoPrograms(response.data))
        .catch(error => console.error('Error fetching info programs:', error));
    }, []);

    const toggleForm = () => {
      setShowForm(!showForm);
    };
  
    const handleReferenceItemChange = (event) => {
      setReferenceItem(event.target.value);
    };
    const handleNameItemChange = (event) => {
      setName(event.target.value);
    };
    const handleTypeItemChange = (event) => {
        setType(event.target.value);
      };
      const handlePriceItemChange = (event) => {
        setPrice(event.target.value);
      };
      const handleDestinationItemChange = (event) => {
        setDestination(event.target.value);
      };

    const handleDateDebutItemChange = (date) => {
        setDateDebut(dayjs(date));
      };
      
      const handleDateFinItemChange = (date) => {
        setDateFin(dayjs(date));
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
            price:price
        });
  
        setName('');
        setPrice('');
        // setDateDebut('');
        // setDateFin('');
        setDateDebut(dayjs());
      setDateFin(dayjs());
        setDestination('');
        setReferenceItem('');
        setType('');
        setShowForm(false);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du programme:', error);
      }
    };
  

const handleMenuClick = (event, selectedInfoProgram) => {
    setSelectedItem({
      ...selectedInfoProgram,
      dateDebut: dayjs(selectedInfoProgram.dateDebut),
      dateFin: dayjs(selectedInfoProgram.dateFin),
    });
    setShowFormDetails(true);
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
  <div container key={infoProgram.idInfoProgram} alignItems="center" >
    <MenuItem onClick={(event) => handleMenuClick(event, infoProgram)} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
      <div>{infoProgram.referenceItem} </div>
      <div> <Typography color="text.secondary">{infoProgram.name}</Typography> </div>
    </MenuItem>
    {index !== infoPrograms.length - 1 && <Grid item xs={12}><Divider key={`divider-${infoProgram.idInfoProgram}`} /></Grid>}
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
        <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
          Edit Item
        </Typography>
        <form style={{ width: '100%', marginTop: 16 }}>
          <TextField
            id="referenceItem" label="Reference Item" name="referenceItem" variant="outlined" margin="normal" autoComplete="referenceItem" required fullWidth
            value={selectedItem.referenceItem} onChange={handleReferenceItemChange}
          />
          {/* ... Autres champs du formulaire ... */}
          <TextField
              id="name" label="Name Item" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth value={selectedItem.name} onChange={handleNameItemChange}
            />
             <TextField
              id="type" label="Type" name="type" variant="outlined" margin="normal" autoComplete="type" required fullWidth
              value={selectedItem.type}   onChange={handleTypeItemChange}  />

            <TextField
              id="destination" label="Destination" name="destination" variant="outlined" autoComplete="destination"
              margin="normal"  required fullWidth value={selectedItem.destination} onChange={handleDestinationItemChange}
            />
          
          <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start Date" value={selectedItem.dateDebut} onChange={handleDateDebutItemChange} required fullWidth />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="End Date" value={selectedItem.dateFin} onChange={handleDateFinItemChange} required fullWidth />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <TextField
            type="number"  id="price" label="Price" name="price" variant="outlined" margin="normal" autoComplete="price" required fullWidth
              value={selectedItem.price}   onChange={handlePriceItemChange}  />
            <div className="button-container">
              <Button type="submit" variant="contained" color="success"  className="submit-button" onClick={handleSubmit}>
                Submit
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
          <Typography component="h1" variant="h5" style={{ fontWeight: 'bold' }}>
            Add New program
          </Typography>
          <form  style={{ width: '100%', marginTop: 16 }}  >
            <TextField
              id="referenceItem" label="Reference Item" name="referenceItem" variant="outlined" margin="normal" autoComplete="referenceItem" required fullWidth
              value={referenceItem}   onChange={handleReferenceItemChange}  />

            <TextField
              id="name" label="Name Item" name="Name" variant="outlined" autoComplete="Name"
              margin="normal"  required fullWidth value={name} onChange={handleNameItemChange}
            />
             <TextField
              id="type" label="Type" name="type" variant="outlined" margin="normal" autoComplete="type" required fullWidth
              value={type}   onChange={handleTypeItemChange}  />

            <TextField
              id="destination" label="Destination" name="destination" variant="outlined" autoComplete="destination"
              margin="normal"  required fullWidth value={destination} onChange={handleDestinationItemChange}
            />
          
          <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Start Date" value={dateDebut} onChange={handleDateDebutItemChange} required fullWidth />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="End Date" value={dateFin} onChange={handleDateFinItemChange} required fullWidth />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <TextField
            type="number"  id="price" label="Price" name="price" variant="outlined" margin="normal" autoComplete="price" required fullWidth
              value={price}   onChange={handlePriceItemChange}  />

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

export default ItemProgram;