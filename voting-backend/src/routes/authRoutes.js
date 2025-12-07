// src/routes/authRoutes.js
import express from 'express';
import client from '../db/cassandra.js';
import cassandra from 'cassandra-driver';   // ✅ ADD THIS LINE


const router = express.Router();

// 🔐 Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Check if email already exists (ALLOW FILTERING ok for small project)
    const checkQuery = 'SELECT * FROM users WHERE email = ? ALLOW FILTERING;';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });
    if (checkResult.rowLength > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const userId = cassandra.types.Uuid.random();

    const query =
      'INSERT INTO users (user_id, name, email, password, has_voted) VALUES (?, ?, ?, ?, false);';
    await client.execute(query, [userId, name, email, password], { prepare: true });

    res.status(201).json({
      message: 'User registered successfully',
      user: { user_id: userId.toString(), name, email, has_voted: false },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔑 Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const query =
      'SELECT user_id, name, email, password, has_voted FROM users WHERE email = ? ALLOW FILTERING;';
    const result = await client.execute(query, [email], { prepare: true });

    if (result.rowLength === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        user_id: user.user_id.toString(),
        name: user.name,
        email: user.email,
        has_voted: user.has_voted,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
