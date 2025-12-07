export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2025 Online Voting System | Built using Cassandra & React</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: 'center',
    padding: '15px',
    background: '#111',
    color: 'white',
    marginTop: '50px'
  }
};
