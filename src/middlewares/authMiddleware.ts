import { type Response, type NextFunction } from 'express';

import { type ExtendedRequest, type Payload } from '@src/types';
import { authenticateToken } from '@src/utilities';

export const authorize = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the authorization token from the request header.
  const token = req.cookies['BC-TOKEN'];

  // Check if token was send with the request.
  if (!token) {
    return res.status(401).json({ err: 'No token' });
  }

  // Validate the token.
  const payload = (await authenticateToken(token)) as Payload;
  if (!payload) {
    return res.status(401).json({ err: 'Invalid token.' });
  }

  req.user = payload;

  return next();
};
