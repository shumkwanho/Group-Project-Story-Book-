import express, { Request, Response } from 'express';
import knex from 'knex';
import { hashPassword } from '../utils/hash';

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

const registerRoute = express.Router();

registerRoute.get('/register', (req: Request, res: Response) =>
  res.render('register', { title: 'Register' })
);

registerRoute.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    await db('users').insert({ username, email, password: hashedPassword });

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export { registerRoute };