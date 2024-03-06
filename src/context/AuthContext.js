// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [userId, setUserId] = useState('');
//     const [email, setEmail]= useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName]= useState('');
//     const [userData, setUserData] = useState({});
   

//     return (
//         <AuthContext.Provider value={{ userId,  setUserId, email, setEmail ,
//         firstName, setFirstName,lastName, setLastName , userData, setUserData}}>
//             {children}
//         </AuthContext.Provider>
       
//     );
// }

// export function useAuth() {
//     return useContext(AuthContext);
// }