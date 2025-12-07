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
      setMsg('Invalid login');
    }
  };

  return (
    <div style={styles.box}>
      <h2>Voter Login</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}

const styles = {
  box: {
    maxWidth: '300px',
    margin: '80px auto',
    textAlign: 'center'
  }
};
