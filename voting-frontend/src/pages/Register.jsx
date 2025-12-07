import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const registerUser = async () => {
    if (!name || !email || !password) {
      setMsg('❌ Please fill all fields');
      return;
    }

    try {
      await axios.post(`${API}/auth/register`, {
        name,
        email,
        password
      });

      setMsg('✅ Registration successful! Redirecting...');
      setTimeout(() => navigate('/voter-login'), 1500);
    } catch (err) {
      console.error(err);
      setMsg('❌ Registration failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Voter Registration</h2>
        <p style={styles.subTitle}>Create your voting account</p>

        {msg && <p style={styles.msg}>{msg}</p>}

        <input
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.btn} onClick={registerUser}>
          ✅ Register
        </button>

        <p style={styles.loginText}>
          Already registered?{' '}
          <Link to="/voter-login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ✅ STYLES */
const styles = {
  page: {
    minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f8fafc'
  },
  card: {
    width: '400px',
    background: 'white',
    padding: '35px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '5px',
    color: '#1e40af'
  },
  subTitle: {
    marginBottom: '20px',
    color: '#666'
  },
  msg: {
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  btn: {
    width: '100%',
    marginTop: '10px',
    background: '#2563eb',
    color: 'white',
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none'
  },
  loginText: {
    marginTop: '15px',
    fontSize: '14px'
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
    textDecoration: 'none'
  }
};
