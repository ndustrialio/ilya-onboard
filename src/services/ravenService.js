import Raven from 'raven-js';
import contxtSdk from '../services/contxt';

Raven.config(window.nd.sentry.dataSourceName, {
  debug: window.nd.sentry.debug
}).install();

const ravenService = {
  ...Raven,

  exceptionCaptureInterceptor(err) {
    return contxtSdk.auth
      .getProfile()
      .then((profile) => {
        ravenService.reportException(err, profile);
        return Promise.reject(err);
      })
      .catch(() => {
        ravenService.reportException(err);
        return Promise.reject(err);
      });
  },

  reportException(err, profile) {
    const options = { extra: {} };

    if (profile) {
      Raven.setUserContext({ id: profile.sub });
      Raven.setExtraContext({ name: profile.name, nickname: profile.nickname });
    }

    if (err.fromSdk) {
      options.extra = {
        ...options.extra,
        originalError: err.originalError,
        fromSdk: err.fromSdk
      };
    }

    if (err.response) {
      const { data, config, statusText } = err.response;
      const { params, url } = config;
      options.extra = {
        ...options.extra,
        data,
        params,
        statusText,
        url
      };
    }

    if (err.request) {
      Raven.captureException(err.request, options);
    } else if (err.message) {
      Raven.captureException(err.message, options);
    } else {
      Raven.captureException(err, options);
    }
  }
};

export default ravenService;
