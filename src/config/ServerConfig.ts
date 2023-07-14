import express, { Application } from 'express';
import WebSocket from 'ws';
import http, { Server } from 'http';
import path from 'node:path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv-safe';

dotenv.config();
export const app: Application = express();

// Cross origin resource server.
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL!,
  })
);

// Enable cookies and JSON data transfer.
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

// Expose the upload folder to the public.
const uploadsPath = path.resolve(__dirname, '../../public/uploads');
app.use('/api/v1/uploads', express.static(uploadsPath));

// create RESTFul server.
export const server: Server = http.createServer(app);

// create stream server(websocket).
export const wss = new WebSocket.WebSocketServer({ server });
