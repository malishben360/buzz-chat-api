import { type Request, type Response } from 'express';

import { getUserByUsername, createUser } from '@src/services';
import { random, authentication, generateToken } from '@src/utilities';
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
    const authenticated = await authentication(userExist.password, password);
    if (!authenticated) {
      return res.status(401).json({ err: 'Invalid username or password' });
    }

    // Set cookie.
    res.cookie('BC-TOKEN', userExist.password);
    return res
      .status(200)
      .json({ message: 'User authenticated', data: { userId: userExist._id } });
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
    const token = generateToken(salt, password);

    const userData = {
      username: username,
      password: token,
    };

    //   // Check if user was registered successfully
    const newUser = (await createUser(userData)) as IUser;
    if (!newUser) {
      return res.status(500).json({ err: 'Internal server error' });
    }

    res.cookie('BC-TOKEN', token);
    return res.status(201).json({
      message: 'Registered successfully',
      data: { userId: newUser._id },
    });
  } catch (err: any) {
    console.log('Error controller: ', err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('BC-TOKEN');
    return res
      .status(200)
      .json({ message: 'User logout successfully', data: {} });
  } catch (err: any) {
    console.log('Error controller: ', err);
  }
};
