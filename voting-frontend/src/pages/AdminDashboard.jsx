import { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [msg, setMsg] = useState('');

  const addCandidate = async () => {
    await axios.post(`${API}/candidates`, { name, party });
    setMsg('Candidate Added Successfully');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Admin Dashboard</h2>

      <input placeholder="Candidate Name" onChange={e => setName(e.target.value)} />
      <br /><br />
      <input placeholder="Party" onChange={e => setParty(e.target.value)} />
      <br /><br />
      <button onClick={addCandidate}>Add Candidate</button>

      <p>{msg}</p>
    </div>
  );
}
