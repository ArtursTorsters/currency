// server.js
const express = require('express');
const axios = require('axios');
const pool = require('./database');
require('dotenv').config();

const app = express();

// Fetch rates from external API and store in database
async function fetchAndStoreRates() {
    try {
        // Fetch from external API
        const response = await axios.get('YOUR_EXCHANGE_API_ENDPOINT', {
            headers: { 'apikey': process.env.API_KEY }
        });

        // Store in database
        await pool.query(
            'INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES ($1, $2, $3)',
            ['EUR', 'USD', response.data.rates.USD]
        );
    } catch (error) {
        console.error('Error:', error);
    }
}



// Run daily
setInterval(fetchAndStoreRates, 24 * 60 * 60 * 1000);
