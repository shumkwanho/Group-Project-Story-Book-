import express, { Request, Response } from 'express';
import { Pool } from 'pg';

const loginRoute = express.Router();

// Create a PostgreSQL client
const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Login route
loginRoute.post('/login', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Query the database to find the user
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a session token or JWT and return it to the client
    const sessionToken = 'some-session-token';
    return res.json({ sessionToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default loginRoute;