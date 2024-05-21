import express from 'express';
import knex from 'knex';

const app = express();
const db = knex({
  client: 'mysql',
  connection: {
    host: '8080',
    user: 'USERNAME',
    password: 'PASSWORD',
    database: 'DB'
  }
});

app.use(express.json());

async function login(req: express.Request, res: express.Response) {
  const { username, password } = req.body;

  try {
    const user = await db('users')
      .where({ username })
      .first();

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'wrong user name or password' });
    }

    await db('users')
      .where({ id: user.id })
      .update({ last_login: new Date() });

    res.json({ message: 'login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server internal error' });
  }
}

async function register(req: express.Request, res: express.Response) {
  const { new_username, new_password } = req.body;

  try {

    const existingUser = await db('users')
      .where({ username: new_username })
      .first();

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }


    await db('users').insert({
      username: new_username,
      password: new_password,
      created_at: new Date(),
      last_login: new Date()
    });

    res.json({ message: 'registration success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server internal error' });
  }
}

app.post('/login', login);
app.post('/register', register);

app.listen(8080, () => {
    console.log('The server is running on port 8080');
  });