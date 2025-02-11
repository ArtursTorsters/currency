import axios from "axios";
import dotenv from "dotenv";
import pool from "../database/database.js";
import cron from 'node-cron';

dotenv.config();

async function fetchAndStoreRates() {
  try {
    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?apiKey=${process.env.API_KEY}`
    );
    console.log("API", response.data);

    const currencyPairs = [
      { from: "EUR", to: "USD", rate: response.data.rates.USD },
      { from: "EUR", to: "GBP", rate: response.data.rates.GBP },
      { from: "EUR", to: "AUD", rate: response.data.rates.AUD },
    ];

    for (const currency of currencyPairs) {
      await pool.query(
        "INSERT INTO exchange_rates (from_currency, to_currency, rate, date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
        [currency.from, currency.to, currency.rate]
      );
    }

  } catch (error) {
    console.error(error);
  }
}

cron.schedule('* * * * *', () => {
  fetchAndStoreRates();
  console.log('Daily exchange rates update');
});
