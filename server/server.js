import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import pool from './database/database.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/rates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exchange_rates');
        console.log('Query results:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error in /rates endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.VITE_SERVER_PORT;

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
