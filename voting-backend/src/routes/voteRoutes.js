// src/routes/voteRoutes.js
import express from 'express';
import client from '../db/cassandra.js';
import cassandra from 'cassandra-driver';

const router = express.Router();

// 🗳️ Cast vote
router.post('/', async (req, res) => {
  const { user_id, candidate_id } = req.body;

  if (!user_id || !candidate_id) {
    return res.status(400).json({ message: 'user_id and candidate_id required' });
  }

  try {
    const userUUID = cassandra.types.Uuid.fromString(user_id);
    const candidateUUID = cassandra.types.Uuid.fromString(candidate_id);

    // ✅ 1️⃣ Check if user already voted
    const userQuery = 'SELECT has_voted FROM users WHERE user_id = ?;';
    const userResult = await client.execute(userQuery, [userUUID], { prepare: true });

    if (userResult.rowLength === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userResult.rows[0].has_voted) {
      return res.status(400).json({ message: 'User has already voted' });
    }

    // ✅ 2️⃣ Insert vote
    const insertVoteQuery =
      'INSERT INTO votes (user_id, candidate_id, vote_time) VALUES (?, ?, ?);';

    await client.execute(
      insertVoteQuery,
      [userUUID, candidateUUID, new Date()],
      { prepare: true }
    );

    // ✅ 3️⃣ Mark user as voted
    const updateUserQuery =
      'UPDATE users SET has_voted = true WHERE user_id = ?;';

    await client.execute(updateUserQuery, [userUUID], { prepare: true });

    // ✅ 4️⃣ Increment vote counter (COUNTER must be isolated)
    const updateCounterQuery =
      'UPDATE vote_count SET total_votes = total_votes + 1 WHERE candidate_id = ?;';

    await client.execute(updateCounterQuery, [candidateUUID], { prepare: true });

    res.json({ message: 'Vote cast successfully' });

  } catch (err) {
    console.error('Vote error:', err);
    res.status(500).json({ message: 'Server error while casting vote' });
  }
});

export default router;
