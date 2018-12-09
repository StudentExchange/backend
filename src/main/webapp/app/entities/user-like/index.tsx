import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserLike from './user-like';
import UserLikeDetail from './user-like-detail';
import UserLikeUpdate from './user-like-update';
import UserLikeDeleteDialog from './user-like-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserLikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserLikeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserLikeDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserLike} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserLikeDeleteDialog} />
  </>
);

export default Routes;
