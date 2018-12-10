import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import House from './house';
import HouseUpdate from './house-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HouseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HouseUpdate} />
      <ErrorBoundaryRoute path={match.url} component={House} />
    </Switch>
  </>
);

export default Routes;
