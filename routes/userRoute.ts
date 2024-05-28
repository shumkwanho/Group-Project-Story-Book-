// userRoute.ts
import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // 載入 .env 檔案中的環境變數

const userRoute = express.Router();

// 建立 PostgreSQL 連接池
const pool = new Pool({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// 獲取所有使用者
userRoute.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '獲取使用者資料失敗' });
  }
});

// 根據使用者名稱獲取特定使用者
userRoute.get('/users/:username', async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '使用者未找到' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '獲取使用者資料失敗' });
  }
});

// 登錄路由
userRoute.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 使用 Express 的 fetch 方法發送 POST 請求到 /login 路由
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('登錄失敗');
    }

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '登錄失敗' });
  }
});

export default userRoute;