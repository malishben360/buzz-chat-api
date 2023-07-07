import { type Request, type Response } from 'express';

import { getUsers } from '@src/services';
import { IUser } from '@src/models';
import { authenticateToken } from '@src/utilities';
import { type Payload } from '@src/types';

export const getUsersController = async (req: Request, res: Response) => {
  const users = (await getUsers()) as IUser[];

  return res.status(200).json({ message: 'Fetched users successfully', users });
};

export const getUserProfileController = async (req: Request, res: Response) => {
  // Get the authorization token from the request header.
  const token = req.cookies['BC-TOKEN'];

  // Get payload from token.
  const payload = (await authenticateToken(token)) as Payload;
  return res.status(200).json(payload);
};
