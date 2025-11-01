import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { requireUser } from './auth';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// Ruta protegida de ejemplo
app.get('/me', requireUser, (req, res) => {
  res.json({ user: (req as any).user });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
