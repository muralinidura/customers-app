import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import InformationPopup from './InformationPopup';

const Login = ({ setLoggedInUser, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Add your authentication logic here (e.g., API call, validation)
    // For simplicity, this example considers a successful login when a username is provided.
    e.preventDefault();
    if (username.trim() !== '' && password.trim!=='') {
      setLoggedInUser(username);
      if(username==='SBCA_Test'){
        setUserRole('viewer');
        navigate('/customers');
      }
      else if(username==='SBCA_Prod'){
        setUserRole('admin');
        navigate('/customers');
      }
      else{
        // alert('User not registered');
        setShowInfoPopup(true);
        setInfoMessage(`User not registered`);
        // return;
      }
      // navigate('/home');
      
    } else {
      // alert('Invalid credentials. Please enter a username and password');
      setShowInfoPopup(true);
      setInfoMessage(`Invalid credentials. Please enter a username and password`);
    }
  };
  const handleInfoOk =()=>{
    setShowInfoPopup(false);
    setInfoMessage(``);
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> 
        </label> <br/>
        <label>
          Password :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label> <br/>
        <button onClick={handleLogin}>Login</button>
      </form>
      {showInfoPopup && (<InformationPopup onOk={handleInfoOk} message={infoMessage}></InformationPopup>)}
    </div>
  );
};

export default Login;