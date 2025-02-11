# Exchange Rates Dashboard

A full-stack application that displays and manages currency exchange rates. The application fetches exchange rates daily at midnight and displays them in a paginated table with sorting capabilities.

## Features

- Daily exchange rate updates at midnight
- Currency selection (EUR to USD/GBP/AUD)

## Prerequisites

- Node.js
- PostgreSQL database
- API key from [anyapi.io](https://anyapi.io)

## Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../front
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your environment variables

4. Set up the database:
```sql
CREATE TABLE exchange_rates (
    id SERIAL PRIMARY KEY,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    rate DECIMAL NOT NULL,
    date TIMESTAMP NOT NULL
);
```
## Running the Application

1. Start the backend server:
```bash
cd server
node server.js
```

2. Start the query service
```bash
cd server
node query.js
```

3. Start the frontend development server:
```bash
cd front
npm run dev
```
## How It Works

- The backend runs a cron job that fetches exchange rates at midnight every day
- Frontend fetches and displays this data, also syncing at midnight
- Data is stored in PostgreSQL and served via Express API
- React frontend provides a user interface with filtering and pagination
