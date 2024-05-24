import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Customers from './Customers';
import GenerateSQL from './GenerateSQL';


function App() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userRole, setUserRole] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setLoggedInUser={setLoggedInUser} setUserRole={setUserRole}/>} />
        <Route path="/customers" element={<Customers loggedInUser={loggedInUser} userRole={userRole}/>} />
        <Route path="/generateSQL" element={<GenerateSQL/>} />
      </Routes>
    </Router>
  );
}

export default App;
