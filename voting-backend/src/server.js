// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import client from './db/cassandra.js';

import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import voteRoutes from './routes/voteRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Online Voting API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/results', resultRoutes);

// Start server only after Cassandra connects
client
  .connect()
  .then(() => {
    console.log('Connected to Cassandra');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Cassandra connection error:', err);
  });
