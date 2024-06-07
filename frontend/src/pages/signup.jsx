import { useState } from 'react'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { MdLockOpen } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { VscOrganization } from "react-icons/vsc";
import React from 'react';

const Signup = () => {

    const navigate = useNavigate();
    const [username, setUName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    function handleLoginClick() {
        navigate('/'); 
    }

    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:8090/signup', {
          username: username,
          email: email,
          password1: password1,
          password2: password2
        })
        .then(response => {
          if(response.data['statusCode']==200){
            navigate('/');
          }
          else{
            alert(response.data['messege'])
          }
        })
        .catch(error => {
          alert(error)
        });
    }


    return(
        <>
  
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-box">
              <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUName(e.target.value)}/>
              <FiUser className="icon" />
            </div>
            <div className="input-box">
              <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              <MdOutlineMailOutline className="icon" />
            </div>
            <div className="input-box">
              <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
              <MdLockOpen className="icon"/>
            </div>  
            <div className="input-box">
              <input type="password" className="form-control" placeholder="Repeat Password" onChange={(e) => setPassword2(e.target.value)} />
              <MdLockOpen className="icon"/>
            </div>  
            <button type="submit">Sign up</button>
            <div className="register-link">
                <p>Already have an account? <a href="" onClick={handleLoginClick}>Login</a></p>
            </div>
          </form>
        </>
      )
}

export default Signup