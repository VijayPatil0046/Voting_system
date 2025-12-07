// src/routes/resultRoutes.js
import express from 'express';
import client from '../db/cassandra.js';

const router = express.Router();

// 📊 Get voting results
router.get('/', async (_req, res) => {
  try {
    const countQuery = 'SELECT candidate_id, total_votes FROM vote_count;';
    const candQuery = 'SELECT candidate_id, name, party FROM candidates;';

    const [countResult, candResult] = await Promise.all([
      client.execute(countQuery),
      client.execute(candQuery),
    ]);

    const candidateMap = new Map();
    candResult.rows.forEach((row) => {
      candidateMap.set(row.candidate_id.toString(), {
        candidate_id: row.candidate_id.toString(),
        name: row.name,
        party: row.party,
        total_votes: 0,
      });
    });

    countResult.rows.forEach((row) => {
      const id = row.candidate_id.toString();
      if (candidateMap.has(id)) {
        candidateMap.get(id).total_votes = row.total_votes.toNumber
          ? row.total_votes.toNumber()
          : row.total_votes;
      }
    });

    res.json(Array.from(candidateMap.values()));
  } catch (err) {
    console.error('Results error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
