import axios from "axios";
import dotenv from "dotenv";
import pool from "../database/database.js";

dotenv.config();

async function fetchAndStoreRates() {
  try {
    const response = await axios.get(
      `https://anyapi.io/api/v1/exchange/rates?apiKey=${process.env.API_KEY}`
    );

    console.log("API", response.data);

    // multi currency
    const currencyPairs = [
      { from: "EUR", to: "USD", rate: response.data.rates.USD },
      { from: "EUR", to: "GBP", rate: response.data.rates.GBP },
      { from: "EUR", to: "AUD", rate: response.data.rates.AUD },
    ];

    // clear rates
    await pool.query("DELETE FROM exchange_rates");

    // loop trough and inserrt rates
    for (const currency of currencyPairs) {
      await pool.query(
        "INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES ($1, $2, $3)",
        [currency.from, currency.to, currency.rate]
      );
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// run once in 24/7
fetchAndStoreRates();
setInterval(fetchAndStoreRates, 24 * 60 * 60 * 1000);
