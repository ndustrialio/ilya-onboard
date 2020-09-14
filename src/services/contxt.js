import ContxtSdk from '@ndustrial/contxt-sdk';
import ravenService from './ravenService';
import FeedsService from './feedsService';

const contxtSdk = new ContxtSdk({
  config: {
    auth: {
      clientId: window.nd.application.clientId,
      customModuleConfigs: {
        contxtAuth: {
          env: 'production'
        }
      },
      env: 'production'
    },
    externalModules: {
      feeds: {
        clientId: window.nd.externalModules.feeds.clientId,
        host: window.nd.externalModules.feeds.host,
        module: FeedsService
      }
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
