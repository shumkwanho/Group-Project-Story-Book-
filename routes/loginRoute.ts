import express, { Request, Response } from 'express';
import knex from 'knex';
import bcrypt from 'bcrypt';
import path from 'path';

const loginRoute = express.Router();

// Create a Knex instance
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 5432
  }
});

loginRoute.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login route
loginRoute.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Query the database to find the user record based on the email
    const user = await db('users')
      .where('email', email)
      .first();
    
    if (!user) {
      // If no user record is found, return a 401 Unauthorized error
      return res.status(401).json({ message: 'Invalid credentials user not exist' });
    }

    // Use bcrypt.compare() function to compare the user's input password and the encrypted password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If the password doesn't match, return a 401 Unauthorized error
      return res.status(401).json({ message: 'Invalid credentials password not match' });
    }
    req.session.userId = (user.id).toString()
    
    // The password matches, return a 202 Accepted response
    return res.status(202).json({ message: 'Login successful', data:user.id});
  } catch (err) {
    console.error('Error in login route:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Serve the text.html page
loginRoute.get('/text', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'text.html'));
});

export default loginRoute;