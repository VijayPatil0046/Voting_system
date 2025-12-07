import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>🗳 Voting System</h2>
      <div>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/voter-login">Voter</Link>
        <Link style={styles.link} to="/admin-login">Admin</Link>
        <Link style={styles.link} to="/results">Results</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: '100%',
    padding: '16px 40px',
    background: '#2563eb',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    marginLeft: '20px',
    color: 'white',
    fontWeight: '600'
  }
};
