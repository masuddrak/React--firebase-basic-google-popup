
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({})
  const { displayName, email,photoURL } = user
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handelSignIn = () => {
    signInWithPopup(auth, googleProvider)
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
  const gitHendalSingin = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user)
        console.log(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(email)
        // ...
      });
  }

  const singOutHandel = () => {
    signOut(auth).then(() => {
      setUser({})
      console.log('logout')
    }).catch((error) => {
      setUser({})
    });
  }
  return (
    <div className="App">
      {
        email ? <button onClick={singOutHandel}> Long Out</button> :
          <>
            <button onClick={handelSignIn}>sign-in</button>
            <button onClick={gitHendalSingin}>Github</button>
          </>
      }
      <div>
        <h3>Name:{displayName}</h3>
        <h3>Email:{email}</h3>
        <img src={photoURL} alt="" />
      </div>
    </div>
  );
}

export default App;
