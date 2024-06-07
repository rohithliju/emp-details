import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import Home from "./pages/home.jsx"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css' 


function App(){
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
  </Router>
  )
}

export default App
