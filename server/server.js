import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import pool from './database/database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(express.json());

app.get('/rates', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT * FROM exchange_rates
        ORDER BY date DESC
      `);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error});
    }
  });


const PORT = process.env.VITE_SERVER_PORT;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
