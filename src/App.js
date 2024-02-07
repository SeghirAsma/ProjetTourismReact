// import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import About from './components/About'
import Contenu from './components/Contenu';
import VideoCard from './components/VideoCard';
function App() {
  return (
    //  <div> hello world
    // </div>
   <Router>
    <Routes>
    <Route path="/about" exact Component={About}></Route>
    <Route path="/contenu" exact Component={Contenu}></Route>
    <Route path="videocard" exact Component={VideoCard}></Route>
    </Routes>
   </Router>
  
  );
}

export default App;
