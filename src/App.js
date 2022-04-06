
import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
const auth = getAuth(app);
function App() {
  const [user,setUser]=useState({})
  const {displayName,email}=user
  const provider = new GoogleAuthProvider();
  const handelSignIn=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      
      setUser(user)
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
    });
  }
  return (
    <div className="App">
      <button onClick={handelSignIn}> Googke sign-in</button>
      <div>
        <h3>Name:{displayName}</h3>
        <h3>Email:{email}</h3>
      </div>
    </div>
  );
}

export default App;
