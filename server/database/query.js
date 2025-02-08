const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// API endpoint for frontend
app.get('/api/rates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exchange_rates');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
