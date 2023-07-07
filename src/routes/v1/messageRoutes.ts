import { type IRouter } from 'express';

import { authorize } from '@src/middlewares';
import { createMessageController } from '@src/controllers';

export default (router: IRouter) => {
  router.post('/messages', authorize, createMessageController);
};
