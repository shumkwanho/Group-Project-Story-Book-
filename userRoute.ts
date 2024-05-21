import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // 加載 .env 文件中的環境變量

const userRoute = express.Router();

// 建立 PostgreSQL 連接池
const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// 獲取所有用戶
userRoute.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '獲取用戶數據失敗' });
  }
});

// 根據用戶名獲取特定用戶
userRoute.get('/users/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '用戶未找到' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '獲取用戶數據失敗' });
  }
});

export default userRoute;