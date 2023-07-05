import { IRouter, Router } from 'express';

import authRouter from './v1/authRoutes';
import userRouter from './v1/userRoutes';

const router = Router();

export default (): IRouter => {
  authRouter(router);
  userRouter(router);

  return router;
};
