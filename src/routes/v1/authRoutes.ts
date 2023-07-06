import { type IRouter } from 'express';

import { login, logout, register } from '@src/controllers';

export default (router: IRouter) => {
  router.post('/auth/login', login);
  router.post('/auth/register', register);
  router.get('/auth/logout', logout);
};
