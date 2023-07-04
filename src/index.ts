import { Request, Response } from 'express';
import dotenv from 'dotenv-safe';

import { app, server } from '@src/config/ServerConfig';

dotenv.config();

// Expose server.
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

// Connect to database.

// Server entry point.
app.use('/', (req: Request, res: Response) => {
  return res.status(200).json({ alive: true });
});

// Register all routes.
