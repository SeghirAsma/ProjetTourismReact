import '../App.css';

import Sidebar from './Sidebar';
import React , {useState, useEffect} from "react";
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';



function UnapprovedProfile() {
    const [totalRows, setTotalRows] = useState(0);
    const [approvedUsersCount, setApprovedUsersCount] = useState(0);
    const [unapprovedUsersCount, setUnApprovedUsersCount] = useState(0);
    const [pendingUsersCount, setPendingUsersCount] = useState(0);

    const [totalRowsProgram, setTotalRowsProgram] = useState(0);

    const [approvedprogram, setApprovedProgram] = useState(0);
    const [unapprovedProgram, setUnApprovedProgram] = useState(0);
    const [pendingProgram, setPendingProgram] = useState(0);
    
//data user
    const data = {
      labels: ['Approved', 'Unapproved', 'Pending'],
      datasets: [
        {
          label: 'Approved',
          data: [approvedUsersCount],
          backgroundColor: '#4CAF50', 
        },
        {
          label: 'Unapproved',
          data: [unapprovedUsersCount],
          backgroundColor: '#F44336', 
        },
        {
          label: 'Pending',
          data: [pendingUsersCount],
          backgroundColor: '#FFC107', 
        },
      ],
    };
    
    //data Program
    const dataprogram = {
      labels: ['Approved', 'Unapproved', 'Pending'],
      datasets: [
        {
          label: 'Approved',
          data: [approvedprogram],
          backgroundColor: '#4CAF50', 
        },
        {
          label: 'Unapproved',
          data: [unapprovedProgram],
          backgroundColor: '#F44336', 
        },
        {
          label: 'Pending',
          data: [pendingProgram],
          backgroundColor: '#FFC107', 
        },
      ],
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
              //setUsers(response.data);
            } catch (error) {
              console.error('Error fetching unapproved users:', error);
            }
          };
          getAllUsers();
        }, []);
        
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
              setTotalRowsProgram(response.data.length);
              
              const approvedPrograms = response.data.filter(program => program.approved);
              setApprovedProgram(approvedPrograms.length);

              const unapprovedPrograms= response.data.filter(program => program.deleted);
              setUnApprovedProgram(unapprovedPrograms.length);

              const pendingPrograms = response.data.filter(program => !program.approved &&  !program.deleted);
              setPendingProgram(pendingPrograms.length);

          } catch (error) {
              console.error('Error fetching programs:', error);
          } 
          };
          getAllPrograms();
      }, []);
    return (
<div >     
   <Sidebar /> 
        <div style={{ marginLeft: '240px', padding: '20px', paddingTop:'0%' }}>
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



    <div>
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

    <Card style={{ backgroundColor: '#fffdf6', marginTop: '10px', width: '615px', maxWidth: '100%',marginRight: '15px' }}>
         <CardContent>
         <BarChart
          xAxis={[
            { scaleType: 'band', data: ['Accounts'] },
            // { scaleType: 'band', data: ['Unapproved'] },
            // { scaleType: 'band', data: ['Pending'] },
          ]}
          series={data.datasets}
          width={totalRows * 30}
          height={300}
        />
          </CardContent>
        </Card>
        <Card style={{ backgroundColor: '#fffdf6', marginTop: '10px', width: '615px', maxWidth: '100%' }}>
         <CardContent>
         <BarChart
          xAxis={[
            { scaleType: 'band', data: ['Programs'] },
          ]}
          series={dataprogram.datasets}
          width={totalRows * 30}
          height={300}
        />
          </CardContent>
        </Card>
   </div>
   </div>
 
   <Grid container spacing={3} marginTop={'10px'}>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}} >
      <Card style={{ minHeight: '30px', minWidth: '200px' , backgroundColor:'#d9fff2', position: 'relative', overflow: 'hidden'}}  >
      <div className="shine-background" />
         <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#3798b8'}}>
              Totally Programs 
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#3798b8'}}>
            {totalRowsProgram}     
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '200px' , backgroundColor:'#e9fcc8', position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#8ab147'}}>
              Approved Programs
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#8ab147'}}>
            {((approvedprogram / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
       </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '230px' , backgroundColor:'#ffd9d9', position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#e15252'}}>
              Archived Programs
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#e15252'}}>
               {((unapprovedProgram / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3} style={{paddingTop:'0%'}}>
      <Card style={{ minHeight: '30px', minWidth: '230px', backgroundColor:'#ffe9cb' , position: 'relative', overflow: 'hidden'}}>
      <div className="shine-background" />
          <CardContent>
            <Typography variant="h6" component="div"  gutterBottom fontWeight={'bold'} style={{color:'#cd8b2f'}}>
              Pending Programs
            </Typography>
            <Typography variant="h4" component="div" style={{color:'#cd8b2f'}}>
               {((pendingProgram / totalRows) * 100).toFixed(2)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
      </div>
    </div>
    );
  }
  
  export default UnapprovedProfile;
  