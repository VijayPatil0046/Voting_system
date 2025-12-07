// src/routes/candidateRoutes.js
import express from 'express';
import client from '../db/cassandra.js';
import cassandra from 'cassandra-driver';

const router = express.Router();

// ➕ Add candidate (you can hit via Postman)
router.post('/', async (req, res) => {
  try {
    const { name, party } = req.body;
    if (!name || !party) {
      return res.status(400).json({ message: 'Name and party required' });
    }

    const candidateId = cassandra.types.Uuid.random();
    const query = 'INSERT INTO candidates (candidate_id, name, party) VALUES (?, ?, ?);';
    await client.execute(query, [candidateId, name, party], { prepare: true });

    res.status(201).json({
      message: 'Candidate added',
      candidate: { candidate_id: candidateId.toString(), name, party },
    });
  } catch (err) {
    console.error('Add candidate error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📃 Get all candidates
router.get('/', async (_req, res) => {
  try {
    const query = 'SELECT candidate_id, name, party FROM candidates;';
    const result = await client.execute(query);
    const candidates = result.rows.map((row) => ({
      candidate_id: row.candidate_id.toString(),
      name: row.name,
      party: row.party,
    }));
    res.json(candidates);
  } catch (err) {
    console.error('Get candidates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
