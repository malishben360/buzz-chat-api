import { type Request, type Response } from 'express';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
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
    const notifyAboutOnlineUsers = () => {
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
    };

    // Monitor the connection heartbeat.
    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        notifyAboutOnlineUsers();
      }, 1000);
    }, 5000);

    connection.on('pong', () => {
      clearTimeout(connection.deathTimer);
    });

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
      const { recipient, text, file } = messageData;

      let filename = '';

      if (file) {
        const parts = file.name.split('.');
        const ext = parts[parts.length - 1];
        filename = Date.now() + '.' + ext;
        const filePath = await path.resolve(
          __dirname,
          '../public/uploads/',
          filename
        );

        const buffer = file.data.split(',')[1];
        const bufferData = Buffer.from(buffer, 'base64');
        fs.writeFile(filePath, bufferData, { encoding: 'base64' }, () => {
          console.log('File uploaded');
        });
      }

      if (recipient && (text || file)) {
        // Save message in database.
        const message = await createMessage({
          sender: connection.id,
          recipient: recipient,
          text: text,
          file: filename ? filename : null,
        });

        // If message was create send it to the recipients.
        if (message) {
          [...wss.clients]
            .filter((c: ExtendedWebSocket) => c.id === recipient)
            .map((c: ExtendedWebSocket) => {
              c.send(
                JSON.stringify({
                  id: message?._id,
                  sender: connection.id,
                  recipient: recipient,
                  text: text,
                  file: filename,
                })
              );
            });
        }
      }
    });

    // Notify all connected user about a connection.
    notifyAboutOnlineUsers();
  }
);
