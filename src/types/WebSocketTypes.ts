import { type WebSocket } from 'ws';

export interface ExtendedWebSocket extends WebSocket {
  id?: string;
  username?: string;
  isAlive?: boolean;
  timer?: NodeJS.Timeout;
  deathTimer?: NodeJS.Timeout;
}
