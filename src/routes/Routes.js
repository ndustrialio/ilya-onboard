import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import TemperatureFeed from '../containers/TemperatureFeed';
import FacilitiesList from '../containers/FacilitiesList';

export const Routes = () => {
  return (
    <Switch className={'test'}>
      <Route path="/" exact={true} component={TemperatureFeed} />
      <Route path="/facilities" exact={true} component={FacilitiesList} />
      <Route component={NotFound} />
    </Switch>
  );
};
