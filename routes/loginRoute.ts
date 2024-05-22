import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import path from 'path';

const loginRoute = express.Router();

// Create a PostgreSQL client
const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

loginRoute.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login route
loginRoute.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    // Query the database to find the user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Redirect the user to the .text.html page
    return res.redirect('/text');
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve the .text.html page
loginRoute.get('./text', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './text'));
});

export default loginRoute;