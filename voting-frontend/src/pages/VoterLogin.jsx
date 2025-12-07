import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API = 'http://localhost:5000/api';

export default function VoterLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      setUser(res.data.user);
      navigate('/vote');
    } catch {
      setMsg('Invalid login credentials');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Voter Login</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" style={{ width: '100%' }}>Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        No account? <Link to="/register" style={{ color: '#2563eb' }}>Register</Link>
      </p>
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
  },
  form: {
    marginTop: '20px'
  }
};
