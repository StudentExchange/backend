import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LandProjectPhoto from './land-project-photo';
import LandProjectPhotoDetail from './land-project-photo-detail';
import LandProjectPhotoUpdate from './land-project-photo-update';
import LandProjectPhotoDeleteDialog from './land-project-photo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LandProjectPhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LandProjectPhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LandProjectPhotoDetail} />
      <ErrorBoundaryRoute path={match.url} component={LandProjectPhoto} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={LandProjectPhotoDeleteDialog} />
  </>
);

export default Routes;
