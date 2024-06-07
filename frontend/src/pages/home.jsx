import React,{ useState}  from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../authSlice';
import { useNavigate} from 'react-router-dom';


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

  const handleInsert = () => {
    axios.post('http://localhost:8090/insert', {
          name: name,
          userid: userid,
          email: email,
          age: age
        }, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
  })
        .then(response => {
          if(response.data['statusCode']==200){
            setMessage('insertion successful')
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

  const handleDelete = () => {
    axios.post('http://localhost:8090/delete', {
          email: email,
          password: password
        })
        .then(response => {
          if(response.data['statusCode']==200){
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

  const handleUpdate = () => {
    axios.post('http://localhost:8090/update', {
          email: email,
          password: password
        })
        .then(response => {
          if(response.data['statusCode']==200){
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

  const handleRead = () => {
    axios.post('http://localhost:8090/read', {
          email: email,
          password: password
        })
        .then(response => {
          if(response.data['statusCode']==200){
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
      <div>
        <p>{message}</p>
      </div>
      <div>
        <button onClick={() => setMode('insert')}>Insert</button>
        <button onClick={() => setMode('delete')}>Delete</button>
        <button onClick={() => setMode('update')}>Update</button>
        <button onClick={() => setMode('read')}>Read</button>
      </div>
      <div>
        {mode === 'insert' ? (
            <div>
                <form className="form" onSubmit={handleInsert}>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'delete' ? (
            <div>
                <form className="form" onSubmit={handleDelete}>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'update' ? (
            <div>
                <form className="form" onSubmit={handleUpdate}>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-box">
                    <input type="email" className="form-control" placeholder="Age" onChange={(e) => setAge(e.target.value)}/>
                    </div>
                
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : mode === 'read' ? (
            <div>
                <form className="form" onSubmit={handleRead}>
                    <div className="input-box">
                    <input type="text" className="form-control" placeholder="Userid" onChange={(e) => setId(e.target.value)}/>
                    </div>
                
                    <button type="submit">Submit</button>
                </form>
            </div>
        ) : (
            <div>Unknown mode</div>
        )}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home