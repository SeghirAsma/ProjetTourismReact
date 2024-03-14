
import React, { useState , useEffect} from "react";
// import { styled, useTheme, alpha } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import SettingsIcon from '@mui/icons-material/Settings';
import VerifyAccount from "./VerifyAccount";
import UnapprovedProfile from "./UnapprovedProfile";
import { useNavigate } from 'react-router-dom';
import VerifyContent from "./VerifyContent";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import UploadVideo from "./UploadVideo";
import ItemProgram from "./ItemProgram";
import InfoProgram from "./InfoProgram";
import EventIcon from '@mui/icons-material/Event';

import '../stylesCss/ItemCss.css';

import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";
import { Link,  Route, Routes } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ApproveProgram from "./ApproveProgram";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import scrollDialog from "./ScrollDialog";
import { Dashboard } from '@mui/icons-material';
import ProfileSettingsAdmin from './ProfileSettingsAdmin'
import Avatar from '@mui/material/Avatar';

import {
    // Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem,
    // ListItemButton, ListItemIcon, ListItemText, InputBase, MenuItem, Menu} from '@mui/material';
    Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem,
    ListItemButton, ListItemIcon, ListItemText, MenuItem, Menu} from '@mui/material';

    /* les constantes, les themes, les fct pour styles */ 
const drawerWidth = 240;
const iconsArray = [Dashboard, HowToRegIcon, AccountCircle,CheckCircleIcon,CloudUploadIcon,EventIcon,InfoIcon,AssignmentTurnedInIcon,DashboardIcon];
const colorsArray = [ '#2196F3','#FF5722', '#FFC107','#4CAF50']; 

const iconsArray2 = [AccountCircle,ExitToAppIcon,CloudUploadIcon,EventIcon,InfoIcon,AssignmentTurnedInIcon,DashboardIcon];


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

//drawerheader style
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

//appBar style
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#033568',

  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//drawer style
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      backgroundColor: '#001F3F', // Couleur bleu marine
      color: 'white', // Couleur du texte
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
          ...openedMixin(theme),
          backgroundColor: '#001F3F', 
          color: 'white', 
        },
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
          ...closedMixin(theme),
          backgroundColor: '#001F3F', 
          color: 'white', 
        },
      }),
    }),
  );
  
  
function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const routes = [
      { path: '/scrollDialog', label: 'Dashboard', component: scrollDialog },

      { path: '/verifyAccount', label: 'Verify Account', component: VerifyAccount },
      {path: '/UnapprovedProfile', label: 'Accounts', component: UnapprovedProfile},
      {path: '/VerifyContent', label: 'Verify Content', component: VerifyContent},
      {path: '/UploadVideo', label: 'Upload Video', component: UploadVideo},
      {path: '/ItemProgram', label: 'Item Program', component: ItemProgram},
      {path: '/InfoProgram', label: 'Info Program', component: InfoProgram},
      {path: '/ApproveProgram', label: 'Programs', component: ApproveProgram}
      
    ];

    const routes2=[
      { path: '/ProfileSettingsAdmin', label: 'Profile & Settings', component: ProfileSettingsAdmin },
      

    ]

    const navigate = useNavigate();

    const handleLogoutClick = () => {
       localStorage.clear();  //
        navigate('/');
    };

  
    
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget); 
      };
  
    const handleMenuClose = () => {
      setAnchorEl(null); };
  
    const menuId = 'primary-search-account-menu';
    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const profileImageUrl = currentUserDetails?.userEntity?.profileImageUrl || '';
    const filename = profileImageUrl ? profileImageUrl.split('/').pop() : '';
    const imageUrl=`http://localhost:8099/api/users/images/${encodeURIComponent(filename)}`

    useEffect(() => {
      const fetchCurrentUserDetails = async () => {
        try {
          const accessToken = localStorage.getItem('token');
          const userDetailsResponse = await axios.get('http://localhost:8099/api/users/currentUser', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
          const currentUserDetails = userDetailsResponse.data;
          setCurrentUserDetails(currentUserDetails);
  
        } catch (error) {
          console.error('Failed to fetch user details', error);
        }
      };
  
      fetchCurrentUserDetails();
    }, []);  
    const renderMenu = (
      <Menu 
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Typography   style={{ padding: '5px',Color: '#165a9d', textAlign:'center', fontWeight:'bold', color: '#165a9d' }}>
       <span >USER COORDINATES</span>   </Typography>
       <Divider />
       <Typography  variant="body2" color="textSecondary" style={{ padding: '15px' , backgroundColor:'#fbf9f3'}} >
          {currentUserDetails && (
        <div>
            <Avatar
          alt=""
          src={imageUrl }
          style={{ width: '75px', height: '75px', cursor: 'pointer', margin: '0 auto 10px',
          }}
          />
          <p>Email: {currentUserDetails.userEntity.email}</p>
          <p>User Name: {currentUserDetails.userEntity.lastName.toUpperCase()} {currentUserDetails.userEntity.firstName}</p>
          <p>Role: {currentUserDetails.userEntity.role}</p>

        </div>
      )}
        </Typography>
       


        <Divider />
       <MenuItem onClick={handleLogoutClick} sx={{ marginRight: 1, color: '#165a9d' }} >
         LogOut <ExitToAppIcon sx={{ marginRight: 1, color: '#165a9d' }} />
        </MenuItem>
      </Menu>
    );
   
     
    
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (
     
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" style={{ marginTop: '0' }} open={open} >
          <Toolbar >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div">
              Tourism Content
            </Typography>
           
          <Box sx={{ flexGrow: 1 }} />
   
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            > */}
              {currentUserDetails && (
                  <div>
                    <Avatar
                      alt=""
                      src={imageUrl || "https://www.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"}
                      style={{
                        width: '35px',
                        height: '35px',
                        cursor: 'pointer',
                        // margin: '0 auto 10px',
                      }}
                      size="large"
                              edge="end"
                              aria-label="account of current user"
                              aria-controls={menuId}
                              aria-haspopup="true"
                              onClick={handleProfileMenuOpen}
                              color="inherit"
                    />
                  </div>
                )}
            {/* </IconButton> */}
          </Box>

          </Toolbar>
        </AppBar>
        {renderMenu}

        <Drawer variant="permanent" open={open}>
          <DrawerHeader >
            <IconButton sx={{ backgroundColor: 'white' }} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader >
          <Divider sx={{ backgroundColor: 'white' }}/>
          <List>
            {routes.map((route, index) => (
              <ListItem key={route.label} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                component={Link}
                to={route.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: 'white', 

                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: colorsArray[index % colorsArray.length], // Définir la couleur de l'icône

                    }}
                  >
              {React.createElement(iconsArray[index % iconsArray.length])}
                  </ListItemIcon>
                  <ListItemText primary={route.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ backgroundColor: 'white' }}/>
          <List>
            {/* {['Profile', 'Settings', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: colorsArray[index % colorsArray.length], // Définir la couleur de l'icône

                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <SettingsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))} */}
            <List>
            {routes2.map((route, index) => (
              <ListItem key={route.label} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                component={Link}
                to={route.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    color: 'white', 

                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: colorsArray[index % colorsArray.length], // Définir la couleur de l'icône

                    }}
                  >
              {React.createElement(iconsArray2[index % iconsArray2.length])}
                  </ListItemIcon>
                  <ListItemText primary={route.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
         
          <Routes>
    {routes.map((route) => (
      <Route key={route.label} path={route.path} element={<route.component />} />
    ))}
  </Routes>
  <Routes>
    {routes2.map((route) => (
      <Route key={route.label} path={route.path} element={<route.component />} />
    ))}
  </Routes>
        </Box>
      </Box>
    );
  }
  
  export default Sidebar;
  
  // Effectuer la requête une fois après le rendu initial
    // const renderMenu = (
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: 'top',
    //       horizontal: 'right',
    //     }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //     <MenuItem onClick={handleLogoutClick}>LogOut <ExitToAppIcon sx={{ marginRight: 1,  color: '#165a9d' }} /></MenuItem>
    //   </Menu>
    // );


    // //search style
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// //input style pour search style
// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));