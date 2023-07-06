import { type Request, type Response } from 'express';

import { getUserByUsername, createUser } from '@src/services';
import { random, generateToken, encryptPassword } from '@src/utilities';
import { IUser } from '@src/models';

export const login = async (req: Request, res: Response) => {
  try {
    // Get all payload.
    const { username, password } = req.body;

    // Validate request payload.
    if (!username || !password) {
      return res.status(400).json({ err: 'All fields are required' });
    }

    // Check if user exist.
    const userExist = (await getUserByUsername(username)) as IUser;
    if (!userExist) {
      return res.status(401).json({ err: 'Invalid username or password' });
    }

    // Authenticate user.
    const encryptedPassword = encryptPassword(
      userExist.authentication?.salt as string,
      password
    );

    if (encryptedPassword !== userExist.authentication?.password) {
      return res.status(401).json({ err: 'Invalid username or password' });
    }

    // Generate token.
    const userData = {
      id: userExist._id,
      username: userExist.username,
    } as IUser;
    const token = generateToken(userData);

    // Set cookie.
    res.cookie('BC-TOKEN', token);
    return res
      .status(200)
      .json({ id: userExist._id, username: userExist.username });
  } catch (err: any) {
    console.log('Error controller: ', err);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    // get payloads
    const { username, password } = req.body;

    // Validate payload
    if (!username || !password) {
      return res.status(400).json({ err: 'All fields are required' });
    }

    // Check if user exist
    const userExist = await getUserByUsername(username);
    if (userExist) {
      return res.status(409).json({ err: 'Username most be unique' });
    }

    const salt = random();
    const encryptedPassword = encryptPassword(salt, password);

    //   // Check if user was registered successfully
    const newUser = (await createUser({
      username: username,
      authentication: { salt: salt, password: encryptedPassword },
    })) as IUser;
    if (!newUser) {
      return res.status(500).json({ err: 'Internal server error' });
    }

    // Remove password for security.
    const userData = {
      id: newUser._id,
      username: newUser.username,
    } as IUser;

    // Set client cookie.
    const token = generateToken(userData);
    res.cookie('BC-TOKEN', token);
    return res.status(201).json({
      message: 'Registered successfully',
      id: newUser._id,
    });
  } catch (err: any) {
    console.log('Error controller: ', err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

export const logout = async (_: Request, res: Response) => {
  try {
    res.clearCookie('BC-TOKEN');
    return res.status(200).json({ message: 'User logout successfully' });
  } catch (err: any) {
    console.log('Error controller: ', err);
  }
};
