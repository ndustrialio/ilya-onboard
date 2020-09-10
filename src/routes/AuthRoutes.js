import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Loader } from '@ndustrial/nd-react-common';
import contxtService from '../services/contxt';

export function withAuth(WrappedComponent, history) {
  return class extends React.Component {
    static displayName = `withAuth(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    constructor(props) {
      super();
      this.handleAuthentication = this.handleAuthentication.bind(this);
    }

    handleAuthentication(nextState) {
      if (/access_token|id_token|error/.test(nextState.location.hash)) {
        contxtService.auth.handleAuthentication();
      }
    }

    render() {
      return (
        <Switch>
          <Route
            path="/callback"
            render={(props) => {
              this.handleAuthentication(props);
              return (
                <div className="auth-callback">
                  <Loader label="Signing you in" />
                </div>
              );
            }}
          />
          <Route
            {...this.props}
            render={(props) => {
              if (contxtService.auth.isAuthenticated()) {
                return <WrappedComponent auth={contxtService.auth} />;
              } else {
                // Capture current location so we can return user to correct page after login.
                localStorage.setItem(
                  'redirect_pathname',
                  props.location.pathname
                );
                contxtService.auth.logIn();
                return null;
              }
            }}
          />
        </Switch>
      );
    }
  };
}
