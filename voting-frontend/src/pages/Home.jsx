import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.hero}>
      <h1>Online Voting System</h1>
      <p>Secure • Transparent • Fast</p>

      <div style={styles.btns}>
        <Link to="/voter-login"><button>Voter Login</button></Link>
        <Link to="/admin-login"><button>Admin Login</button></Link>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  btns: {
    marginTop: '25px',
    display: 'flex',
    gap: '20px'
  }
};
