import express from 'express';
import client from '../db/cassandra.js';
import cassandra from 'cassandra-driver';

const router = express.Router();

// ✅ GET all voters
router.get('/', async (req, res) => {
  try {
    const result = await client.execute('SELECT user_id, name, email FROM users;');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch voters' });
  }
});

// ✅ DELETE voter
router.delete('/:id', async (req, res) => {
  try {
    const id = cassandra.types.Uuid.fromString(req.params.id);

    await client.execute(
      'DELETE FROM users WHERE user_id = ?;',
      [id],
      { prepare: true }
    );

    res.json({ message: 'Voter deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete voter failed' });
  }
});

export default router;
