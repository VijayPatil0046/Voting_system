import express from 'express';
import client from '../db/cassandra.js';
import cassandra from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// ✅ GET all candidates
router.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM candidates;');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Fetch failed' });
  }
});

// ✅ ADD candidate
router.post('/', async (req, res) => {
  const { name, party } = req.body;
  const id = cassandra.types.Uuid.fromString(uuidv4());

  try {
    await client.execute(
      'INSERT INTO candidates (candidate_id, name, party) VALUES (?, ?, ?);',
      [id, name, party],
      { prepare: true }
    );
    res.json({ message: 'Candidate added' });
  } catch (err) {
    res.status(500).json({ message: 'Add failed' });
  }
});

// ✅ UPDATE candidate
router.put('/:id', async (req, res) => {
  const { name, party } = req.body;
  const id = cassandra.types.Uuid.fromString(req.params.id);

  try {
    await client.execute(
      'UPDATE candidates SET name = ?, party = ? WHERE candidate_id = ?;',
      [name, party, id],
      { prepare: true }
    );
    res.json({ message: 'Candidate updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// ✅ DELETE candidate
router.delete('/:id', async (req, res) => {
  const id = cassandra.types.Uuid.fromString(req.params.id);

  try {
    await client.execute(
      'DELETE FROM candidates WHERE candidate_id = ?;',
      [id],
      { prepare: true }
    );
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

export default router;
