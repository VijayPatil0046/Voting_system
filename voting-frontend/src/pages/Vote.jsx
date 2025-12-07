// src/pages/Vote.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

export default function Vote({ user }) {
  const [candidates, setCandidates] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidates`);
        setCandidates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCandidates();
  }, []);

  const handleVote = async (candidate_id) => {
    setMsg('');
    try {
      const res = await axios.post(`${API_BASE}/vote`, {
        user_id: user.user_id,
        candidate_id,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Vote failed');
    }
  };

  return (
    <div>
      <h2>Cast Your Vote</h2>
      {msg && <p>{msg}</p>}

      {user.has_voted && (
        <p>You already voted (according to initial login). You can try voting again to test API.</p>
      )}

      <ul>
        {candidates.map((c) => (
          <li key={c.candidate_id}>
            {c.name} ({c.party}){' '}
            <button onClick={() => handleVote(c.candidate_id)}>Vote</button>
          </li>
        ))}
      </ul>

      <p>
        <Link to="/results">View Results</Link>
      </p>
    </div>
  );
}
