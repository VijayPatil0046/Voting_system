import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>🗳️ Voting System</h2>
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
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 40px',
    background: '#111',
    color: 'white',
  },
  link: {
    marginLeft: '20px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};
