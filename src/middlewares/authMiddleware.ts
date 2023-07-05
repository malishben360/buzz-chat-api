import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the authorization token from the request header.
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token was send with the request.
    if (!token) {
      return res.status(401).json({ err: 'Access denied' });
    }

    // Validate the token.
    const JWT_SECRET = process.env.JWT_SECRET!;
    const jwtPayload = await jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err: any) {
    console.log('Error middleware: ', err);
    return res.status(401).json({ err: 'Invalid token.' });
  }
};
