import React from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { MdLockOpen } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    
    function handleSignUpClick() {
        navigate('/signup'); 
    }
  

    function handleUserSubmit(event){
        event.preventDefault()

    
        axios.post('http://localhost:8090/login', {
          email: email,
          password: password
        })
        .then(response => {
          const token = response.data['token'];
          
          if(response.data['statusCode']==200){
            console.log(token)
            dispatch(login({ email,token }));
            navigate('/home');
          }
          else{
            alert('invalid login')
          }
        })
        .catch(error => {
          alert(error)
        });
    }

    return(
        <>
          <form className="form" onSubmit={handleUserSubmit}>
            <div className="input-box">
              <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              <MdOutlineMailOutline className="icon" />
            </div>
            <div className="input-box">
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              <MdLockOpen className="icon"/>
            </div>  
            <button type="submit">Login</button>
            <div className="register-link">
                <p>Don't have an account? <a href="" onClick={handleSignUpClick}>Register</a></p>
            </div>
          </form>
        </>
    )
}

export default Login