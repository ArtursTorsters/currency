import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
// load env from root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

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
