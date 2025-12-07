import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>🗳️ Online Voting System</h1>
        <p style={styles.subtitle}>Secure • Transparent • Fast</p>

        <div style={styles.btns}>
          <Link to="/voter-login">
            <button style={{ ...styles.button, background: '#2563eb' }}>
              👤 Voter Login
            </button>
          </Link>

          <Link to="/admin-login">
            <button style={{ ...styles.button, background: '#dc2626' }}>
              👑 Admin Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ✅ ADVANCED STYLING */
const styles = {
  wrapper: {
    minHeight: '80vh',
    background: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    background: 'rgba(255,255,255,0.85)',
    padding: '60px',
    borderRadius: '18px',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    backdropFilter: 'blur(10px)',
    animation: 'fadeIn 0.8s ease'
  },

  title: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#1e40af',
    marginBottom: '10px'
  },

  subtitle: {
    color: '#475569',
    fontSize: '18px',
    marginBottom: '35px'
  },

  btns: {
    display: 'flex',
    gap: '25px',
    justifyContent: 'center'
  },

  button: {
    color: 'white',
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    transition: 'all 0.25s ease',
  }
};
