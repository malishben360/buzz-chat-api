import { type Request, type Response } from 'express';
import http from 'http';
import dotenv from 'dotenv-safe';

import { app, server, wss } from '@src/config/ServerConfig';
import * as database from '@src/config/DatabaseConfig';
import router from '@src/routes';
import { authenticateToken } from './utilities';
import { type ExtendedWebSocket, type Payload } from './types';
import { createMessage } from './services';

dotenv.config();

// Expose server.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

// Connect to database.
database.connect();

// Server entry point.
app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ alive: true });
});

// Register all routes.
app.use('/api/v1/', router());

// Listen to  websocket server connections.
wss.on(
  'connection',
  async (connection: ExtendedWebSocket, req: http.IncomingMessage) => {
    // Get BC-TOKEN from the cookies.
    const tokenCookieString = req.headers.cookie
      ?.split(';')
      .find((token) => token.startsWith('BC-TOKEN'));

    if (tokenCookieString) {
      const token = tokenCookieString.split('=')[1];
      if (token) {
        //TODO: Rename Payload to TokenPayload
        const { id, username } = (await authenticateToken(token)) as Payload;
        connection.id = id;
        connection.username = username;
      }
    }

    // Send incoming message to a specified user.
    connection.on('message', async (message: string | Buffer) => {
      const messageData = JSON.parse(message.toString());
      const { recipient, text } = messageData;

      if (recipient && text) {
        // Save message in database.
        const message = await createMessage({
          sender: connection.id,
          recipient: recipient,
          text: text,
        });

        // If message was create send it to the recipients.
        if (message) {
          [...wss.clients]
            .filter((c: ExtendedWebSocket) => c.id === recipient)
            .map((c: ExtendedWebSocket) => {
              c.send(
                JSON.stringify({
                  sender: connection.id,
                  recipient: recipient,
                  text: text,
                  id: message?._id,
                })
              );
            });
        }
      }
    });

    // Notify all connected user about a connection.
    [...wss.clients].forEach((c: ExtendedWebSocket) => {
      c.send(
        JSON.stringify({
          online: [...wss.clients].map((c: ExtendedWebSocket) => {
            return {
              id: c.id,
              username: c.username,
            };
          }),
        })
      );
    });
  }
);
