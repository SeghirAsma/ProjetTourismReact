// import './App.css';
import Sidebar from './Sidebar';
import About from './About';
function ProfileSettingsAdmin() {
    return (
      <div> 
        <Sidebar />
        <div style={{ marginLeft: '240px', padding: '20px' }}>

        <About/> 
        </div>
      </div>
      
    );
  }
  
  export default ProfileSettingsAdmin;
  