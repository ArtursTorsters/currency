// db query
const express = require('express');
const pool = require('./database/database');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/api/rates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exchange_rates');
        res.json(result.rows);
        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
