import { User, type IUser } from '@src/models';

export const getUsers = async (): Promise<IUser[] | void> => {
  try {
    return await User.find();
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};

export const getUserById = async (id: string): Promise<IUser | void> => {
  try {
    return (await User.findById(id).select(
      '+authentication.salt +authentication.password'
    )) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};

export const getUserByUsername = async (
  username: string
): Promise<IUser | void> => {
  try {
    return (await User.findOne({ username: username }).select(
      '+authentication.salt +authentication.password'
    )) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};

export const createUser = async (
  user: Record<string, any>
): Promise<IUser | void> => {
  try {
    return (await User.create(user)) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};

export const updateUser = async (
  id: string,
  user: Partial<IUser>
): Promise<IUser | void> => {
  try {
    return (await User.findByIdAndUpdate(id, user, {
      new: true,
    }).exec()) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};

export const deleteUser = async (id: string): Promise<IUser | void> => {
  try {
    return (await User.findByIdAndDelete(id)) as IUser;
  } catch (err: any) {
    console.log('Error DB: ', err);
    return;
  }
};
