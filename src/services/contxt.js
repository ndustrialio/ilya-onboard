import ContxtSdk from '@ndustrial/contxt-sdk';
import ravenService from './ravenService';

const contxtSdk = new ContxtSdk({
  config: {
    auth: {
      clientId: window.nd.application.clientId,
      customModuleConfigs: {
        contxtAuth: {
          env: 'production'
        }
      },
      env: 'staging'
    },
    interceptors: {
      response: [
        {
          rejected: ravenService.exceptionCaptureInterceptor
        }
      ]
    }
  },
  sessionType: 'auth0WebAuth'
});

export default contxtSdk;
