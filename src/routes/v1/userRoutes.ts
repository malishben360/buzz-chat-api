import { type IRouter } from 'express';

import { authorize } from '@src/middlewares';
import { getUserProfileController, getUsersController } from '@src/controllers';

export default (router: IRouter) => {
  router.get('/users', authorize, getUsersController);
  router.get('/profile', authorize, getUserProfileController);
};
