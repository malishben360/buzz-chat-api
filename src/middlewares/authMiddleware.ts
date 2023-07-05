import { Request, Response, NextFunction } from 'express';

import { authenticateToken } from '@src/utilities';
import { Payload } from '@src/types';

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the authorization token from the request header.
  const token = req.cookies['BC-TOKEN'];

  // Check if token was send with the request.
  if (!token) {
    return res.status(401).json({ err: 'Access denied' });
  }

  // Validate the token.
  const payload = (await authenticateToken(token)) as Payload;
  if (!payload) {
    return res.status(401).json({ err: 'Invalid token.' });
  }
  return next();
};
