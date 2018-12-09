import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import HousePhoto from './house-photo';
import HousePhotoDetail from './house-photo-detail';
import HousePhotoUpdate from './house-photo-update';
import HousePhotoDeleteDialog from './house-photo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HousePhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HousePhotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HousePhotoDetail} />
      <ErrorBoundaryRoute path={match.url} component={HousePhoto} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HousePhotoDeleteDialog} />
  </>
);

export default Routes;
