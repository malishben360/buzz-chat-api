import { type IRouter } from 'express';

import { authorize } from '@src/middlewares';
import {
  createMessageController,
  getMessagesController,
} from '@src/controllers';

export default (router: IRouter) => {
  router.post('/messages', authorize, createMessageController);
  router.get('/messages/:userId', authorize, getMessagesController);
};
