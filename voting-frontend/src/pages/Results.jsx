// src/pages/Results.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  return (
    <div>
      <h2>Voting Results</h2>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Party</th>
            <th>Total Votes</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.candidate_id}>
              <td>{r.name}</td>
              <td>{r.party}</td>
              <td>{r.total_votes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}
