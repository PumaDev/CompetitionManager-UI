import { appConfig } from '../../app.config';

export const authConfig = {
  loginEndpoint: appConfig.host + 'login',
  createUserEndpoint: appConfig.host + 'register'
};
