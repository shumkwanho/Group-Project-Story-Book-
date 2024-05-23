import express, { Request, Response } from 'express';
import knex, { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { log } from 'console';

const db: Knex = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    port: 5432
  }
});

const registerRoute = express.Router();

registerRoute.get('/register', (req: Request, res: Response) =>
  res.render('register', { title: 'Register' })
);

registerRoute.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // 1. Check if passwords match
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Password and confirm password fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // 2. Check if username, email, or password already exists in the database
    const existingUser = await db('users').where({ username, email }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // 3. If all input data does not exist in the database, insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({ username, email, password: hashedPassword });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export { registerRoute };