import axios from 'axios';
import dotenv from 'dotenv';
import pool from './database/database.js';

dotenv.config();

async function fetchAndStoreRates() {
    try {
        const response = await axios.get(`https://anyapi.io/api/v1/exchange/rates?apiKey=${process.env.API_KEY}`, {
            headers: { 'apikey': process.env.API_KEY }
        });

        console.log("API Response:", response.data);
        // store ir DB
        await pool.query(
            'INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES ($1, $2, $3)',
            ['EUR', 'USD', response.data.rates.USD]
        );

        console.log("Data stored in database");
    } catch (error) {
        console.error('Error:', error);
    }
}

// daily run
setInterval(fetchAndStoreRates, 24 * 60 * 60 * 1000);
fetchAndStoreRates();
