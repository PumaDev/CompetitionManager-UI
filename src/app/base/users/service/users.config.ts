import { appConfig } from '../../../app.config';

export const usersConfig = {
  endpoints: {
    getUsersEndpoint: appConfig.host + 'users',
    updateActiveStatusEndpoint: appConfig.host + 'users/{userId}/active-status/{activateStatus}',
    getUserEndpoint: appConfig.host + 'users/{userId}',
    updateUserEndpoint: appConfig.host + 'users/{userId}',
    updateUserPasswordEndpoint: appConfig.host + 'users/{userId}/password'
  }
};
