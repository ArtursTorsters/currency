// db query
const express = require('express');
const pool = require('./database/database'); // Adjust path if needed
require('dotenv').config();

const app = express();
app.use(express.json());
app.get('/api/rates', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exchange_rates');

        // Convert rows to a text representation
        const ratesText = result.rows.map(row =>
            `${row.from_currency} to ${row.to_currency}: ${row.rate}`
        ).join('\n');

        // Set content type to plain text
        res.setHeader('Content-Type', 'text/plain');
        res.send(ratesText);

        console.log(ratesText);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
