import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Customers from './Customers';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userRole, setUserRole] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} setUserRole={setUserRole}/>} />
        <Route path="/customers" element={<Customers loggedInUser={loggedInUser} userRole={userRole}/>} />
      </Routes>
    </Router>
  );
}

export default App;
