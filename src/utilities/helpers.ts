import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';
import { type Payload } from '@src/types';
import { IUser } from '@src/models';

//expose the environment variable.
dotenv.config();

// Define secret for crypto update
const JWT_SECRET: string = process.env.JWT_SECRET!;

// Generates salt.
export const random = () => crypto.randomBytes(128).toString('base64');

// Encrypt user password.
export const encryptPassword = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(JWT_SECRET)
    .digest('hex');
};

// Generate token.
export const generateToken = (user: IUser): string => {
  return jwt.sign(user, JWT_SECRET);
};

// Authenticate token.
export const authenticateToken = async (
  token: string
): Promise<Payload | void> => {
  try {
    const payload = (await jwt.verify(token, JWT_SECRET)) as Payload;
    return payload;
  } catch (err: any) {
    console.log('Error auth: ', err);
    return;
  }
};
