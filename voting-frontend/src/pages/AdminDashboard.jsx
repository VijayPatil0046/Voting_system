import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [name, setName] = useState('');
  const [party, setParty] = useState('');
  const [msg, setMsg] = useState('');

  const [candidates, setCandidates] = useState([]);
  const [voters, setVoters] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // ✅ FETCH CANDIDATES
  const fetchCandidates = async () => {
    try {
      const res = await axios.get(`${API}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FETCH VOTERS
  const fetchVoters = async () => {
    try {
      const res = await axios.get(`${API}/admin/voters`);
      setVoters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchVoters();
  }, []);

  // ✅ ADD OR UPDATE CANDIDATE
  const saveCandidate = async () => {
    if (!name || !party) {
      setMsg('❌ Please fill all fields');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API}/candidates/${editingId}`, { name, party });
        setMsg('✅ Candidate updated successfully');
      } else {
        await axios.post(`${API}/candidates`, { name, party });
        setMsg('✅ Candidate added successfully');
      }

      setName('');
      setParty('');
      setEditingId(null);
      fetchCandidates();
    } catch (err) {
      console.error(err);
      setMsg('❌ Operation failed');
    }
  };

  // ✅ DELETE CANDIDATE
  const deleteCandidate = async (id) => {
    try {
      await axios.delete(`${API}/candidates/${id}`);
      setMsg('✅ Candidate deleted');
      fetchCandidates();
    } catch (err) {
      console.error(err);
      setMsg('❌ Delete failed');
    }
  };

  // ✅ DELETE VOTER
  const deleteVoter = async (id) => {
    try {
      await axios.delete(`${API}/admin/voters/${id}`);
      setMsg('✅ Voter deleted');
      fetchVoters();
    } catch (err) {
      console.error(err);
      setMsg('❌ Voter delete failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ color: '#1e40af' }}>👑 Admin Dashboard</h2>
        <p style={{ color: '#555' }}>Manage candidates and voters</p>

        {msg && <p>{msg}</p>}

        {/* ✅ FORM */}
        <input
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />

        <button style={styles.addBtn} onClick={saveCandidate}>
          {editingId ? '✅ Update Candidate' : '➕ Add Candidate'}
        </button>

        {/* ✅ CANDIDATES */}
        <div style={styles.list}>
          <h3>📋 Candidates</h3>

          {candidates.length === 0 && <p>No candidates added</p>}

          {candidates.map((c) => (
            <div key={c.candidate_id?.toString()} style={styles.row}>
              <div>
                <strong>{c.name}</strong>
                <p style={{ margin: 0 }}>{c.party}</p>
              </div>

              <div>
                <button
                  style={styles.editBtn}
                  onClick={() => {
                    setEditingId(c.candidate_id.toString());
                    setName(c.name);
                    setParty(c.party);
                  }}
                >
                  ✏️
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    deleteCandidate(c.candidate_id.toString())
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ VOTERS */}
        <div style={styles.list}>
          <h3>👥 Voters</h3>

          {voters.length === 0 && <p>No voters found</p>}

          {voters.map((v) => (
            <div key={v.user_id?.toString()} style={styles.row}>
              <div>
                <strong>{v.name}</strong>
                <p style={{ margin: 0 }}>{v.email}</p>
              </div>

              <button
                style={styles.deleteBtn}
                onClick={() =>
                  deleteVoter(v.user_id.toString())
                }
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ✅ STYLES */
const styles = {
  page: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '500px',
    background: 'white',
    padding: '35px',
    borderRadius: '14px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  addBtn: {
    width: '100%',
    marginTop: '10px',
    background: '#2563eb',
    padding: '12px',
    fontSize: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: 'white'
  },
  list: {
    marginTop: '30px',
    textAlign: 'left'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  editBtn: {
    background: '#facc15',
    marginRight: '6px',
    borderRadius: '6px',
    padding: '6px 10px'
  },
  deleteBtn: {
    background: '#dc2626',
    color: 'white',
    borderRadius: '6px',
    padding: '6px 10px'
  }
};
