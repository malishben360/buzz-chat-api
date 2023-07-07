import express, { Application } from 'express';
import WebSocket from 'ws';
import http, { Server } from 'http';
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

// create RESTFul server.
export const server: Server = http.createServer(app);

// create stream server(websocket).
export const wss = new WebSocket.WebSocketServer({ server });
