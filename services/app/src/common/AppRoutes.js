import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

const WeatherLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "weather" */'./weather/component'),
  loading() {
    return <div>Loading...</div>
  }
});

const NotFoundLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "not-found" */'./notFound/component'),
  loading() {
    return <div>Loading...</div>
  }
});

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={WeatherLoadable} />
    <Route component={NotFoundLoadable} />
  </Switch>
);

export default AppRoutes;
