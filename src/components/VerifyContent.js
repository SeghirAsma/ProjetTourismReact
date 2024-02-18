import Sidebar from "./Sidebar";
import ContentVideo from "./ContentVideo";


function VerifyContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row',  marginTop: '80px'}}>
    <Sidebar />
    <ContentVideo/>
  </div>
    
  );
}

export default VerifyContent;