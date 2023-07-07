import { IMessage } from '@src/models';
import { createMessage } from '@src/services';
import { type Request, type Response } from 'express';

export const createMessageController = async (req: Request, res: Response) => {
  try {
    // get payloads
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
