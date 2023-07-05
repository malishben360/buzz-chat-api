import { IRouter, Router } from 'express';

import authRouter from './v1/authRoutes';

const router = Router();

export default (): IRouter => {
  authRouter(router);

  return router;
};
