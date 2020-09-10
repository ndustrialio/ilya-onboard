import { Header } from '@ndustrial/nd-react-common';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import FacilitiesList from '../containers/FacilitiesList';

export default class Layout extends React.Component {
  static propTypes = {
    auth: PropTypes.shape({
      getProfile: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.func.isRequired,
      logOut: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.auth = {
      // Header & UserDropdown in @ndustrial/nd-react-common require a bound version
      // of logOut aliased under the old name to sign out of the application.
      logout: this.logOut.bind(this)
    };

    this.state = { profile: {} };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      return this.props.auth.getProfile().then((profile) => {
        this.setState({
          profile: {
            profileImage: profile.picture,
            userName: profile.nickname
          }
        });
      });
    }
  }

  logOut() {
    this.props.auth.logOut();
  }

  render() {
    return (
      <div className="app-container">
        <Header
          profile={this.state.profile}
          {...this.props}
          auth={this.auth}
          logoURL={require('../images/contxt_logo.svg')}
        />
        <Switch>
          <Route path="/" exact={true} component={FacilitiesList} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
