import React from 'react';
import PropTypes from 'prop-types';
import contxtSdk from './services/contxt';

const APIContext = React.createContext({});

export const APIProvider = ({ children }) => (
  <APIContext.Provider value={new API(contxtSdk)}>
    {children}
  </APIContext.Provider>
);

APIProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const withAPI = (Component) => (props) => (
  <APIContext.Consumer>
    {(value) => <Component {...props} api={value} />}
  </APIContext.Consumer>
);

export const useApi = () => React.useContext(APIContext);

export class API {
  constructor(contxtService) {
    this.contxtService = contxtService;
    this.feedsBaseUrl = `${window.nd.externalModules.feeds.host}/v1/`;
  }

  getFeeds() {
    return new Promise((resolve, reject) => {
      this.contxtService.iot.outputs._request
        .get(
          `${this.feedsBaseUrl}/outputs/9906/fields/temp/data?timeStart=1600093756&timeEnd=1600094356&window=0`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export class APIWithDispatch extends API {
  constructor(dispatch, ...rest) {
    super(...rest);
    this.dispatch = dispatch;
  }
}
