import { IMessage } from '@src/models';
import { createMessage, getMessagesByUsersId } from '@src/services';
import { type Request, type Response } from 'express';

import { type ExtendedRequest } from '@src/types';

export const getMessagesController = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    // Retrieve payload.
    const { userId } = req.params;

    // Validate payload.
    if (!userId) {
      res.status(400).json({ err: 'Selected user id is required' });
    }

    const id = req.user?.id as string;
    const messages = await getMessagesByUsersId(id, userId);

    const messagesData = messages?.map((msg) => {
      return {
        id: msg._id,
        sender: msg.sender,
        recipient: msg.recipient,
        text: msg.text,
        file: msg.file,
      };
    });
    return res.status(200).json(messagesData);
  } catch (err: any) {
    console.log('Controller Error: ', err);
    res.status(500).json({ err: 'Internal server error' });
  }
};

export const createMessageController = async (req: Request, res: Response) => {
  try {
    // Retrieve payloads
    const { sender, recipient, text } = req.body;

    // Validate payload
    if (!sender || !recipient || !text) {
      return res.status(400).json({ err: 'All fields are required' });
    }

    //   // Check if message was registered successfully
    const newMessage = (await createMessage({
      sender,
      recipient,
      text,
    })) as IMessage;
    if (!newMessage) {
      return res.status(500).json({ err: 'Internal server error' });
    }

    return res.status(201).json(newMessage);
  } catch (err: any) {
    console.log('Error controller: ', err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};
