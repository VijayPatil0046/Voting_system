import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${API_BASE}/results`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  // ✅ EXPORT TO CSV FUNCTION
  const exportToCSV = () => {
    if (results.length === 0) return;

    const headers = ['Candidate', 'Party', 'Total Votes'];
    const rows = results.map(r => [r.name, r.party, r.total_votes]);

    let csvContent =
      headers.join(',') + '\n' +
      rows.map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'voting_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🗳️ Voting Results</h2>

<table style={styles.table}>
  <thead>
    <tr>
      <th style={{ textAlign: 'left' }}>Candidate</th>
      <th style={{ textAlign: 'left' }}>Party</th>
      <th style={{ textAlign: 'center' }}>Total Votes</th>
    </tr>
  </thead>
  <tbody>
    {results.map((r) => (
      <tr key={r.candidate_id}>
        <td style={{ textAlign: 'left', paddingLeft: '12px' }}>
          {r.name}
        </td>
        <td style={{ textAlign: 'left', paddingLeft: '12px' }}>
          {r.party}
        </td>
        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {r.total_votes}
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* ✅ EXPORT BUTTON */}
      <button style={styles.exportBtn} onClick={exportToCSV}>
        ⬇️ Export Results to CSV
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '70px auto',
    background: 'white',
    padding: '35px',
    borderRadius: '12px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.15)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '25px',
    color: '#1e40af'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '25px'
  },
  exportBtn: {
    background: '#16a34a',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer'
  }
  
};
