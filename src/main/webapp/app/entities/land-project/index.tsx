import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LandProject from './land-project';
import LandProjectDetail from './land-project-detail';
import LandProjectUpdate from './land-project-update';
import LandProjectDeleteDialog from './land-project-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LandProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LandProjectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LandProjectDetail} />
      <ErrorBoundaryRoute path={match.url} component={LandProject} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LandProjectDeleteDialog} />
  </>
);

export default Routes;
