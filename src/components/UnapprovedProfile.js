import '../App.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Sidebar from './Sidebar';
import React , {useState, useEffect} from "react";
import axios from 'axios';
import { Button, Alert ,TextField,MenuItem} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TablePagination from '@mui/material/TablePagination';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: { backgroundColor: '#033568', color: theme.palette.common.white,},
  [`&.${tableCellClasses.body}`]: {fontSize: 14, },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover,},
  '&:last-child td, &:last-child th': { border: 0, },
}));


function UnapprovedProfile() {
    const [users, setUsers] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [approvedUsersCount, setApprovedUsersCount] = useState(0);
    const [unapprovedUsersCount, setUnApprovedUsersCount] = useState(0);
    const [pendingUsersCount, setPendingUsersCount] = useState(0);
  
     
// approve user
      const handleApproveClick = async (userId) => { 
        try {
         const storedToken = localStorage.getItem('token');
          setLoading(true);
          await axios.put(`http://localhost:8099/api/users/approve/${userId}`, {}, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            }, 
          });
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          setSuccessAlert(true);
          setTimeout(() => {
            setSuccessAlert(false);
          }, 4000);
        } catch (error) {
          console.error('Erreur lors de l\'approbation de l\'utilisateur :', error);
        }
        finally {
          setLoading(false);
        }};


         // disapprove user
      const handleUnapproveClick = async (id) => {
        try {
          const storedToken = localStorage.getItem('token');
          setLoading(true);
          await axios.put(`http://localhost:8099/api/users/archive/${id}`, {}, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setDeleteSuccessAlert(true);
          setTimeout(() => {
            setDeleteSuccessAlert(false);
          }, 4000);
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        } finally {
          setLoading(false);
        }
      };

        // get all uesr 
        useEffect(() => {
          const getAllUsers = async () => {
            try {
              const storedToken = localStorage.getItem('token');
              const response = await axios.get('http://localhost:8099/api/users/all', {
               headers: {
                  Authorization: `Bearer ${storedToken}`,
                }, 
              });
              setTotalRows(response.data.length);

              //
              const approvedUsers = response.data.filter(user => user.approved);
              setApprovedUsersCount(approvedUsers.length);

              const unapprovedUsers = response.data.filter(user => user.deleted);
              setUnApprovedUsersCount(unapprovedUsers.length);

              const pendingUsers = response.data.filter(program => !program.approved &&  !program.deleted);
              setPendingUsersCount(pendingUsers.length);
              // Paginate the data
              const startIndex = page * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;
              const paginatedUsers = response.data.slice(startIndex, endIndex);
              setUsers(paginatedUsers);
              //setUsers(response.data);
            } catch (error) {
              console.error('Error fetching unapproved users:', error);
            }
          };
          getAllUsers();
        }, [page, rowsPerPage,loading]);
        
        //filtre
        useEffect(() => {
          const filteredData = users.filter((user) => {
            const nameMatch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.role.toLowerCase().includes(searchTerm.toLowerCase());
        
            const statusMatch = filterStatus ? (user.approved && filterStatus === 'approved') ||
                                                (user.deleted && filterStatus === 'deleted') ||
                                                (!user.approved && !user.deleted && filterStatus === 'pending') : true;
            return nameMatch && statusMatch;
          });
          setFilteredUsers(filteredData);
        }, [searchTerm, users, filterStatus]);
        
    return (
    <div >
        <Sidebar /> 
        <div style={{ marginLeft: '240px', padding: '20px', paddingTop:'0%', marginTop:'0' }}>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}} >
      <Card style={{ minHeight: '30px', minWidth: '200px' , backgroundColor:'#d9fff2', position: 'relative', overflow: 'hidden'}}  >
      <div className="shine-background" />
         <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#3798b8'}}>
              Totally Account
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#3798b8'}}>
            {totalRows}     
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '200px' , backgroundColor:'#e9fcc8', position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#8ab147'}}>
              Approved Account
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#8ab147'}}>
            {((approvedUsersCount / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
       </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '230px' , backgroundColor:'#ffd9d9', position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#e15252'}}>
              Archived Account
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#e15252'}}>
               {((unapprovedUsersCount / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '230px', backgroundColor:'#ffe9cb' , position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#cd8b2f'}}>
              Pending Account
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#cd8b2f'}}>
               {((pendingUsersCount / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px'  }}>
                        <TextField label="Search" variant="outlined"  margin="normal" id="search" name="search"
                          style={{ width: '270px' }} value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                            startAdornment: (
                              <InputAdornment position="start"> <SearchIcon /> </InputAdornment>  ), }} >  
                        </TextField>

                        <TextField select label="Filter by Status"  variant="outlined" id="select" name="select" margin="normal"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          style={{ width: '270px' }}
                        >
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="approved">Approved</MenuItem>
                          <MenuItem value="pending">Pending Approval</MenuItem>
                          <MenuItem value="deleted">Deleted</MenuItem>
                        </TextField>
              </div> 

         <TableContainer component={Paper} style={{maxHeight: '51.1vh'}}>
        <Table sx={{ minWidth: 700}} aria-label="customized table" >
          <TableHead  >
            <TableRow >
              <StyledTableCell >First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center' }}>Status</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
              {filteredUsers.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>{user.firstName}</StyledTableCell>
                  <StyledTableCell>{user.lastName}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell  style={{ textAlign: 'center'}}>
                        <div  style={{ display: 'inline-block', padding: '5px 10px', borderRadius: '5px',
                                    color: '#fff', fontWeight: 'bold',
                                      backgroundColor: user.approved ? '#bfe283' : user.deleted ? '#ee6b6b' : '#fcb557',
                                    }} > 
                          {user.approved ? 'Approved' : user.deleted ? 'Archived' : 'Pending Approval'}
                       </div>
                 </StyledTableCell>
                 <StyledTableCell style={{ textAlign: 'center'}}>
    {user.deleted? (
        <ErrorIcon style={{ color: 'rgb(220, 0, 0)' }} />
    ) : (
        !user.approved ? (
            <div>
            <Button 
                variant="contained" 
                style={{ textAlign: 'center', marginRight: '10px' , backgroundColor:'#4CAF50'}}
                onClick={() => handleApproveClick(user.id)}
            >
                Approve
            </Button>
             <Button 
             variant="contained" 
             color="error" 
             style={{ textAlign: 'center', marginRight: '10px' }}
             onClick={() => handleUnapproveClick(user.id)}
         >
             UnApprove
         </Button>
         </div>
        ) : (
            <CheckCircleIcon style={{ color: '#4CAF50' }} />
        )
    )}
              </StyledTableCell>
         </StyledTableRow>
              ))}
      </TableBody>
   

     </Table>
  </TableContainer>
   <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        /> 
      {successAlert && (
          <Alert
            severity="success"
            color="success"
            onClose={() => setSuccessAlert(false)}
            style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
          >
            User approved successfully
          </Alert>
        )}
        {deleteSuccessAlert && (
        <Alert
          severity="success"
          color="success"
          onClose={() => setDeleteSuccessAlert(false)}
          style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}
        >
          User not accepted with success
        </Alert>
      )}
      </div>
    </div>
    );
  }
  
  export default UnapprovedProfile;
  