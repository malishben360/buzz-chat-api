import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv-safe';
import { type Payload } from '@src/types';

//expose the environment variable.
dotenv.config();

// Define secret for crypto update
const JWT_SECRET: string = process.env.JWT_SECRET!;

// Generates salt.
export const random = () => crypto.randomBytes(128).toString('base64');

// Generate token.
export const generateToken = (salt: string, password: string): string => {
  return jwt.sign({ password, salt }, JWT_SECRET);
};

// Authenticate token.
export const authentication = async (
  token: string,
  password: string
): Promise<Boolean | Error> => {
  try {
    const payload = (await jwt.verify(token, JWT_SECRET)) as Payload;
    if (payload.password !== password) {
      return false;
    }
    return true;
  } catch (err: any) {
    console.log('Error auth: ', err);
    return err;
  }
};
