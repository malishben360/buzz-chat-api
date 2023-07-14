import { IRouter, Router } from 'express';

import authRouter from './v1/authRoutes';
import userRouter from './v1/userRoutes';
import messageRouter from './v1/messageRoutes';

const router = Router();

export default (): IRouter => {
  authRouter(router);
  userRouter(router);
  messageRouter(router);

  return router;
};
