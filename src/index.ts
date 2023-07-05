import { Request, Response } from 'express';
import dotenv from 'dotenv-safe';

import { app, server } from '@src/config/ServerConfig';
import * as db from '@src/config/DatabaseConfig';

dotenv.config();

// Expose server.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Connect to database.
db.connect();

// Server entry point.
app.use('/', (req: Request, res: Response) => {
  return res.status(200).json({ alive: true });
});

// Register all routes.
