import { Request, Response } from 'express';

import { getUsers } from '@src/services';
import { IUser } from '@src/models';

export const getUsersController = async (req: Request, res: Response) => {
  const users = (await getUsers()) as IUser[];

  return res
    .status(200)
    .json({ message: 'Fetched users successfully', data: users });
};
