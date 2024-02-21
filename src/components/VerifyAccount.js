// import './App.css';
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
import { Button, Alert } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#033568',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function VerifyAccount() {
    const [users, setUsers] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [deleteSuccessAlert, setDeleteSuccessAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalRows, setTotalRows] = useState(0);

     
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


        // get all uesr unapproved
   useEffect(() => {
    const getAllUsers = async () => {
            try {
      const storedToken = localStorage.getItem('token');
       const response = await axios.get('http://localhost:8099/api/users/all', {
         headers: {
         Authorization: `Bearer ${storedToken}`,
                },
              });

        // Filter out archived and approved users
        const filteredUsers = response.data.filter((user => !user.deleted && !user.approved) );
        setTotalRows(filteredUsers.length);
              // setUsers(filteredUsers);

               // Paginate the data
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

        setUsers(paginatedUsers);
            } catch (error) {
              console.error('Error fetching unapproved users:', error);
            }
          };
          getAllUsers();
        }, [page, rowsPerPage,loading]);
        

    return (
        <div>
        <Sidebar /> 
        <div style={{ marginLeft: '240px', padding: '20px' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
          <TableHead  >
            <TableRow >
              <StyledTableCell >First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', paddingRight: '5px' }}>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>{user.firstName}</StyledTableCell>
                  <StyledTableCell>{user.lastName}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.role}</StyledTableCell>
                  <StyledTableCell style={{ textAlign: 'center'}}>
                    <Button variant="contained" 
                    //color="success" 
                    style={{ textAlign: 'center', marginRight: '10px', backgroundColor:'#4CAF50' }}
                    onClick={() => handleApproveClick(user.id)}> Approved</Button>
                    <Button variant="contained" 
                    color="error"
                    onClick={() => handleUnapproveClick(user.id)}>UnApproved</Button>
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
  
  export default VerifyAccount;
  