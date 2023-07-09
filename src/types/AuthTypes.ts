import { type Request } from 'express';

export type Payload = {
  id: string;
  username: string;
  iot: number;
};

export interface ExtendedRequest extends Request {
  user?: Payload;
}
