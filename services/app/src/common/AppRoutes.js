import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WeatherComponent from 'common/weather/component';
import NotFound from 'common/notFound/component';

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={WeatherComponent} />
    <Route component={NotFound} />
  </Switch>
);

export default AppRoutes;
