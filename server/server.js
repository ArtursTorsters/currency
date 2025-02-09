import express from 'express';
import cors from 'cors';
import pool from './database/database.js';
import dotenv from 'dotenv';

dotenv.config();
console.log('Environment variables:', {
  SERVER_PORT: process.env.VITE_SERVER_PORT
});
const app = express();
app.use(cors());
app.use(express.json());

app.get('/rates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exchange_rates');
        console.log('query:', result.rows);
        res.setHeader('Content-Type', 'application/json');
        //return as json
        res.json(result.rows);
    } catch (error) {
        (error)
    }
});

const PORT = process.env.VITE_SERVER_PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
