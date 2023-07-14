import { Message, type IMessage } from '@src/models';

export const getMessagesByUsersId = async (
  userId: string,
  selectedUserId: string
): Promise<IMessage[] | null> => {
  try {
    return await Message.find({
      $and: [
        { sender: { $in: [userId, selectedUserId] } },
        { recipient: { $in: [userId, selectedUserId] } },
      ],
    }).sort({ createdAt: 1 });
  } catch (err: any) {
    console.log('Message Error: ', err);
    return null;
  }
};

export const getMessageById = async (id: string): Promise<IMessage | null> => {
  try {
    return await Message.findById(id);
  } catch (err: any) {
    console.log('Message Error: ', err);
    return null;
  }
};

export const createMessage = async (
  message: Record<string, any>
): Promise<IMessage | null> => {
  try {
    return await Message.create(message);
  } catch (err: any) {
    console.log('Message Error: ', err);
    return null;
  }
};

export const updateMessage = async (
  id: string,
  message: Record<string, any>
): Promise<IMessage | null> => {
  try {
    return await Message.findByIdAndUpdate({ _id: id }, message, { new: true });
  } catch (err: any) {
    console.log('Message Error: ', err);
    return null;
  }
};

export const deleteMessageById = async (
  id: string
): Promise<IMessage | null> => {
  try {
    return await Message.findByIdAndDelete({ _id: id });
  } catch (err: any) {
    console.log('Message Error: ', err);
    return null;
  }
};
