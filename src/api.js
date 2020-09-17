import React from 'react';
import PropTypes from 'prop-types';
import contxtSdk from './services/contxt';

const APIContext = React.createContext({});

export const APIProvider = ({ children }) => (
  <APIContext.Provider value={new API()}>{children}</APIContext.Provider>
);

APIProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export const withAPI = (ComponentWithApi) => {
  return class WithAPI extends React.Component {
    static displayName = `withAPI(${ComponentWithApi.displayName ||
      ComponentWithApi.name})`;

    render() {
      return (
        <APIContext.Consumer>
          {(value) => <ComponentWithApi {...this.props} api={value} />}
        </APIContext.Consumer>
      );
    }
  };
};

export const useApi = () => React.useContext(APIContext);

export class API {
  getOutputs({ timeStart, timeEnd, window = 3600 }) {
    return contxtSdk.iot.outputs.getFieldData(9906, 'temp', {
      timeStart,
      timeEnd,
      window
    });
  }
}
