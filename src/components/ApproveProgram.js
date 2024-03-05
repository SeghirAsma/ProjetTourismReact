import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button, TextField,MenuItem } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Sidebar from './Sidebar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import ReactPlayer from 'react-player'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#033568',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: { fontSize: 14 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover },
  '&:last-child td, &:last-child th': { border: 0 },
}));
dayjs.extend(utc);  //pour prend notre time sans ajouter 1 à l'heure

function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [successAlert, setSuccessAlert] = useState(false);
  const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

//   const filename = selectedProgram?.contents?.[0]?.videoContenuUrl ? selectedProgram.contents[0].videoContenuUrl.split('/').pop() : '';
// const videoUrl = filename ? `http://localhost:8099/api/contenus/videos/${encodeURIComponent(filename)}` : '';

        //get all program
        useEffect(() => {
            const getAllPrograms = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8099/api/programs/gelAllPrograms', {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
                });
                setTotalRows(response.data.length);
                const startIndex = page * rowsPerPage;
                const endIndex = startIndex + rowsPerPage;
                const paginatedPrograms = response.data.slice(startIndex, endIndex);
                setPrograms(paginatedPrograms);
                console.log("data", paginatedPrograms)

            } catch (error) {
                console.error('Error fetching programs:', error);
            } finally {
                setLoading(false);
            }
            };
            getAllPrograms();
        }, [page, rowsPerPage, loading]);

       
        //filter data
        useEffect(() => {
            const filteredData = programs.filter((program) => {
            const nameMatch = program.referenceProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            program.nameProgram.toLowerCase().includes(searchTerm.toLowerCase());

            const statusMatch = filterStatus ? (program.approved && filterStatus === 'approved') ||
            (program.deleted && filterStatus === 'deleted') ||
            (!program.approved && !program.deleted && filterStatus === 'pending') : true;

            return nameMatch && statusMatch;
            });
            setFilteredPrograms(filteredData);
        }, [searchTerm, programs,filterStatus]);

        // approve program
        const handleApproveClick = async (idProgram) => { 
            try {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            await axios.put(`http://localhost:8099/api/programs/approveProgram/${idProgram}`, {}, {
                headers: {
                Authorization: `Bearer ${storedToken}`,
                }, 
            });
            setPrograms((prevPrograms) => prevPrograms.filter((program) => program.idProgram !== idProgram));
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
            }, 4000);
            } catch (error) {
            console.error('Erreur lors de l\'approbation du programme :', error);
            }
            finally {
            setLoading(false);
            }
        };
        
        // archive program
        const handleUnapproveClick = async (idProgram) => {
            try {
            const storedToken = localStorage.getItem('token');
            setLoading(true);
            await axios.put(`http://localhost:8099/api/programs/archiveProgram/${idProgram}`, {}, {
                headers: {
                Authorization: `Bearer ${storedToken}`,
                },
            });
            setPrograms((prevPrograms) => prevPrograms.filter((program) => program.idProgram !== idProgram));
            setDeleteSuccessAlert(true);
            setTimeout(() => {
                setDeleteSuccessAlert(false);
            }, 4000);
            } catch (error) {
            console.error('Erreur lors de l\'archivage du programme :', error);
            } finally {
            setLoading(false);
            }
        };
  
        const handleClickOpenDetailsDialog = (program) => {
            setSelectedProgram(program);
            setOpenDetailsDialog(true);
          };
        
          const handleCloseDetailsDialog = () => {
            setOpenDetailsDialog(false);
            setSelectedProgram(null);
          };
  return (
    <div>
        <Sidebar /> 
       <div style={{ marginLeft: '240px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <TextField label="Search" variant="outlined" margin="normal" id="search" name="search" style={{ width: '270px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: (
                    <InputAdornment position="start"> {' '} <SearchIcon />{' '}</InputAdornment> ),
                }}>
            </TextField>
            <TextField select label="Filter by Status"  variant="outlined" id="select" name="select" margin="normal"
               style={{ width: '270px' }} value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="pending">Pending Approval</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
              </TextField>
        </div>

        <TableContainer component={Paper} style={{ maxHeight: '60vh' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell>Reference Program</StyledTableCell>
                <StyledTableCell>Name Program</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>Status</StyledTableCell>
                <StyledTableCell style={{ textAlign: 'center' }}>Action</StyledTableCell>
                <StyledTableCell >Details</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPrograms.map((program) => (
                <StyledTableRow key={program.idProgram}>
                   <StyledTableCell>{program.referenceProgram}</StyledTableCell>

                  <StyledTableCell>{program.nameProgram}</StyledTableCell>
                  <StyledTableCell  style={{ textAlign: 'center'}}>
                        <div  style={{ display: 'inline-block', padding: '5px 10px', borderRadius: '5px',
                                    color: '#fff', fontWeight: 'bold',
                                      backgroundColor: program.approved ? '#bfe283' : program.deleted ? '#ee6b6b' : '#fcb557',
                                    }} > 
                          {program.approved ? 'Approved' : program.deleted ? 'Archived' : 'Pending Approval'}
                       </div>
                 </StyledTableCell>             
                 <StyledTableCell style={{ textAlign: 'center'}}>
                    {program.deleted? (
                        <ErrorIcon style={{ color: 'rgb(220, 0, 0)' }} />
                    ) : (
                        !program.approved ? (
                            <div>
                            <Button 
                                variant="contained"  style={{ textAlign: 'center', marginRight: '10px' , backgroundColor:'#4CAF50'}}
                                onClick={() => handleApproveClick(program.idProgram)}
                            >
                                Approve
                            </Button>
                            <Button 
                            variant="contained" color="error" style={{ textAlign: 'center', marginRight: '10px' }}       
                            onClick={() => handleUnapproveClick(program.idProgram)} 
                            >
                            UnApprove
                           </Button>
                        </div>
                        ) : (
                            <CheckCircleIcon style={{ color: '#4CAF50' }} />
                        )
                    )}
                 </StyledTableCell>
                 <StyledTableCell>
                        <Button variant="text" style={{color:'orange'}} 
                               onClick={() => handleClickOpenDetailsDialog(program)}
                                                             >
                            <VisibilityIcon />
                        </Button>
                </StyledTableCell>

                    </StyledTableRow>
              ))}
            </TableBody>
      <Dialog
        open={openDetailsDialog}
        onClose={handleCloseDetailsDialog}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Program Details</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
        
          {selectedProgram && (
  <>
    <div>
      <strong style={{color:'#033568'}}>Reference Program:</strong> {selectedProgram.referenceProgram}
    </div>
    <div>
      <strong style={{color:'#033568'}}>Name Program:</strong> {selectedProgram.nameProgram}
    </div>
    {selectedProgram.items && (
      <div>
        <strong style={{color:'#033568'}}>Items:</strong>
        {selectedProgram.items.map((item) => (
           <div key={item.idItem}>
            <ul>
                <li>
           <p>
             <strong>Name:</strong> {item.name}
           </p>
           <p>
             <strong>Type:</strong> {item.type}
           </p>
           <p>
             <strong>Destination:</strong> {item.destination}
           </p>
           <p>
             <strong>Date Début:</strong> 
             {dayjs.utc(item.dateDebut).format('DD-MM-YYYY')}
           </p>
           <p>
             <strong>Date Fin:</strong> 
             {dayjs.utc(item.dateFin).format('DD-MM-YYYY')}  </p>
           <p>
             <strong>Price:</strong> {item.price}
           </p>
           <p>
            <strong>Required:</strong>  {item.required ? 'Obligatoire' : 'Facultatif'} 

           </p>
           </li>
           </ul>
         </div>
        ))}
      </div>
    )}
    {selectedProgram.contents && (
      <div>
        <strong style={{color:'#033568'}}>Contents:</strong>
        {selectedProgram.contents.map((content) => (
          <div key={content.idContenu}>
            <ul>
                <li>
            <p>
              <strong>Title:</strong> {content.titleContenu}
            </p>
            <p>
              <strong>Description:</strong> {content.descriptionContenu}
            </p>
           {/* <div>{content.videoContenuUrl && (
                <ReactPlayer url={videoUrl} controls />
              )} </div>  */}
            </li>
            </ul>
          </div>
        ))}
      </div>
    )}
  </>
)}

             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]} component="div" count={totalRows} rowsPerPage={rowsPerPage}
          page={page} onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);  }}
        />

        {successAlert && (
                <Alert severity="success" color="success"
                    onClose={() => setSuccessAlert(false)}
                    style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
                >
                    Program approved successfully
                </Alert>
                )}
        {deleteSuccessAlert && (
        <Alert severity="success"  color="success"
          onClose={() => setDeleteSuccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
          Program not accepted with success
        </Alert>
      )}
      </div>
    </div>
  );
}

export default ProgramList;
