import { User, type IUser } from '@src/models';
import { Error } from 'mongoose';

export const getUsers = async (): Promise<IUser[] | Error> => {
  try {
    return await User.find();
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};

export const getUserById = async (id: string): Promise<IUser | Error> => {
  try {
    return (await User.findById(id).select('+password')) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};

export const getUserByUsername = async (
  username: string
): Promise<IUser | Error> => {
  try {
    return (await User.findOne({ username: username }).select(
      '+password'
    )) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};

export const createUser = async (
  user: Record<string, any>
): Promise<IUser | Error> => {
  try {
    return (await User.create(user)) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};

export const updateUser = async (
  id: string,
  user: Partial<IUser>
): Promise<IUser | Error> => {
  try {
    return (await User.findByIdAndUpdate(id, user, {
      new: true,
    }).exec()) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};

export const deleteUser = async (id: string): Promise<IUser | Error> => {
  try {
    return (await User.findByIdAndDelete(id)) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return err as Error;
  }
};
