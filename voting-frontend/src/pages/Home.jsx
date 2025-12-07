import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Online Voting System</h1>
      <p>Secure | Fast | Transparent</p>

      <div style={styles.buttons}>
        <Link to="/voter-login"><button>Voter Login</button></Link>
        <Link to="/admin-login"><button>Admin Login</button></Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px'
  },
  buttons: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px'
  }
};
