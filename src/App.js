// import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import About from './components/About'
import React from 'react';
import VerifyAccount from './components/VerifyAccount';
import ProfileSettingsAdmin from './components/ProfileSettingsAdmin';
import SignInAdmin from './components/SignInAdmin';
import UnapprovedProfile from './components/UnapprovedProfile';
import VerifyContent from './components/VerifyContent';
import ItemProgram from './components/ItemProgram';
import InfoProgram from './components/InfoProgram';
import UploadVideo from './components/UploadVideo';
import ApproveProgram from './components/ApproveProgram';
import DashboardAdmin from './components/DashboardAdmin';
import scrollDialog from './components/ScrollDialog';
import SignUp from './components/SignUp';
function App() {

  return (
   <Router>
    <Routes>
    <Route path="/about" exact Component={About}></Route>
    <Route path="/verifyaccount/*" exact Component={VerifyAccount}></Route>
    <Route path="/ProfileSettingsAdmin/*" exact Component={ProfileSettingsAdmin}></Route>
    <Route path="/" exact Component={SignInAdmin}  ></Route>
    <Route path="/UnapprovedProfile/*" exact Component={UnapprovedProfile}></Route>
    <Route path="/VerifyContent/*" exact Component={VerifyContent}></Route>
    <Route path="/ItemProgram/*" exact Component={ItemProgram}></Route>
    <Route path="/InfoProgram/*" exact Component={InfoProgram}></Route>
    <Route path="/UploadVideo/*" exact Component={UploadVideo}></Route>
    <Route path="/ApproveProgram/*" exact Component={ApproveProgram}></Route>
    <Route path="/DashboardAdmin/*" exact Component={DashboardAdmin}></Route> 
    <Route path="/scrollDialog/*" exact Component={scrollDialog}></Route>
    <Route path="/SignUp/*" exact Component={SignUp}></Route>
    </Routes>
   </Router>
  
  );
}

export default App;
