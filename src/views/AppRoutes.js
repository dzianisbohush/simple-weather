import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './Home/containers/Home';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Redirect to="/" />
  </Switch>
);

export default AppRoutes;