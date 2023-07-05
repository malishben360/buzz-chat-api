import { type Request, type Response } from 'express';
import dotenv from 'dotenv-safe';

import { app, server } from '@src/config/ServerConfig';
import * as database from '@src/config/DatabaseConfig';
import router from '@src/routes';

dotenv.config();

// Expose server.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Connect to database.
database.connect();

// Server entry point.
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ alive: true });
});

// Register all routes.
app.use('/api/v1/', router());
