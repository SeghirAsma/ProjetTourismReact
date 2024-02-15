// import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import About from './components/About'
import Contenu from './components/Contenu';
import Sidebar from './components/Sidebar';
import VerifyAccount from './components/VerifyAccount';
import ProfileSettingsAdmin from './components/ProfileSettingsAdmin';
import SignInAdmin from './components/SignInAdmin';
import UnapprovedProfile from './components/UnapprovedProfile';
function App() {
  return (
    //  <div> hello world
    // </div>
   <Router>
    <Routes>
    <Route path="/about" exact Component={About}></Route>
    <Route path="/contenu" exact Component={Contenu}></Route>
    <Route path="/sidebar" exact Component={Sidebar}></Route>
    <Route path="/verifyaccount" exact Component={VerifyAccount}></Route>
    <Route path="/ProfileSettingsAdmin" exact Component={ProfileSettingsAdmin}></Route>
    <Route path="/SignInAdmin" exact Component={SignInAdmin}></Route>
    <Route path="/UnapprovedProfile" exact Component={UnapprovedProfile}></Route>
    
    </Routes>
   </Router>
  
  );
}

export default App;
