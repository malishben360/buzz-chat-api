import { type IRouter } from 'express';

import { authorize } from '@src/middlewares';
import { getUsersController } from '@src/controllers';

export default (router: IRouter) => {
  router.get('/users', authorize, getUsersController);
};
