import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:5000/api';

export default function Vote({ user }) {
  const [candidates, setCandidates] = useState([]);
  const [msg, setMsg] = useState('');
  const [voted, setVoted] = useState(false);
  const navigate = useNavigate();

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
        candidate_id
      });

      setMsg(res.data.message);
      setVoted(true);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Vote failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ color: '#1e40af' }}>🗳️ Cast Your Vote</h2>
        <p style={{ color: '#555', marginBottom: '10px' }}>
          Logged in as <strong>{user?.name}</strong>
        </p>

        {msg && (
          <p style={{ color: msg.includes('success') ? 'green' : 'red' }}>
            {msg}
          </p>
        )}

        <div style={styles.list}>
          {candidates.map((c) => (
            <div key={c.candidate_id} style={styles.candidateBox}>
              <div>
                <h4>{c.name}</h4>
                <p style={{ color: '#666' }}>{c.party}</p>
              </div>

              <button
                disabled={voted}
                style={{
                  ...styles.voteBtn,
                  background: voted ? '#9ca3af' : '#2563eb'
                }}
                onClick={() => handleVote(c.candidate_id)}
              >
                {voted ? 'Voted' : 'Vote'}
              </button>
            </div>
          ))}
        </div>

        <button style={styles.resultBtn} onClick={() => navigate('/results')}>
          📊 View Results
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh'
  },
  card: {
    width: '450px',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  list: {
    marginTop: '20px'
  },
  candidateBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #e5e7eb'
  },
  voteBtn: {
    padding: '8px 18px',
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  resultBtn: {
    width: '100%',
    marginTop: '20px',
    background: '#16a34a',
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px'
  }
};
