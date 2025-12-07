import express from 'express';
import client from '../db/cassandra.js';

const router = express.Router();

// ✅ Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const query =
      'SELECT admin_id, username, password FROM admins WHERE username = ? ALLOW FILTERING;';
    
    const result = await client.execute(query, [username], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    const admin = result.rows[0];

    if (admin.password !== password) {
      return res.status(400).json({ message: 'Invalid admin credentials' });
    }

    res.json({
      message: 'Admin login successful',
      admin: {
        admin_id: admin.admin_id.toString(),
        username: admin.username
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
