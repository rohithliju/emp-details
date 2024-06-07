import React,{ useState}  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authSlice';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('read');
    const [message, setMessage] = useState('');

    const [name, setName] = useState('');
    const [userid, setId] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');

    const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const clear = () => {
    setMessage('')
  };

  const handleInsert = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8090/insert', {
          name: name,
          userid: userid,
          email: email,
          age: age
        }, {
          headers: {
            'Authorization': `${token}` 
          }
  })
        .then(response => {
          if(response.data['statusCode']==200){
            setMessage('insertion successful')
            setName('');
            setId('');
            setEmail('');
            setAge('');
            alert('success')
          }
          else{
            alert('failed')
          }
        })
        .catch(error => {
          alert(error)
        });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8090/delete', {
          email: email
        }, {
          headers: {
            'Authorization': `${token}` 
          }
  })
        .then(response => {
          if(response.data['statusCode']==200){
            setMessage('deletion successful')
            setName('');
            setId('');
            setEmail('');
            setAge('');
            alert('success')
          }
          else{
            alert('failed')
          }
        })
        .catch(error => {
          alert(error)
        });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8090/update', {
      name: name,
      userid: userid,
      email: email,
      age: age
    }, {
      headers: {
        'Authorization': `${token}` 
      }
})
        .then(response => {
          if(response.data['statusCode']==200){
            setMessage('updation successful')
            setName('');
            setId('');
            setEmail('');
            setAge('');
            alert('success')
          }
          else{
            alert('failed')
          }
        })
        .catch(error => {
          alert(error)
        });
  };

  const handleRead = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8090/read', {
          email: email
        }, {
          headers: {
            'Authorization': `${token}` 
          }
    })
        .then(response => {
          if(response.data['statusCode']==200){
            setMessage(response.data['body'])
            setName('');
            setId('');
            setEmail('');
            setAge('');
            alert('success')
          }
          else{
            alert('failed')
          }
        })
        .catch(error => {
          alert(error)
        });
  };

return (
    <div>
      <p>Welcome, {user?.email}!</p>
      <h2>{mode}</h2> 
      <div>
        <p>{message}</p>
      </div>
      <div>
        <button onClick={() => {setMode('insert'); clear()}}>Insert</button>
        <button onClick={() => {setMode('delete'); clear()}}>Delete</button>
        <button onClick={() => {setMode('update'); clear()}}>Update</button>
        <button onClick={() => {setMode('read'); clear()}}>Read</button>
      </div>
      <br />
      <div>
        {mode === 'insert' ? (
            <div>
              <br />
                <form className="form" onSubmit={handleInsert}>
                    <div className="input-box">
                    <input type="text" className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" value={userid} placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="email" className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'delete' ? (
            <div>
                <form className="form" onSubmit={handleDelete}>
                    <div className="input-box">
                    <input type="email" className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'update' ? (
            <div>
                <form className="form" onSubmit={handleUpdate}>
                    <div className="input-box">
                    <input type="email" className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" value={userid} placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'read' ? (
            <div>
                <form className="form" onSubmit={handleRead}>
                    <div className="input-box">
                    <input type="email" className="form-control" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : (
            <div>Unknown mode</div>
        )}
      </div>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home