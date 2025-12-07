import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/admin/login`, {
        username,
        password
      });

      if (res.data.admin) {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setMsg('Invalid admin credentials');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Login</h2>

      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} style={{ width: '100%' }}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '30px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    textAlign: 'center'
  }
};
