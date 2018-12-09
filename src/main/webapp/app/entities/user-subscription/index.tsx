import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserSubscription from './user-subscription';
import UserSubscriptionDetail from './user-subscription-detail';
import UserSubscriptionUpdate from './user-subscription-update';
import UserSubscriptionDeleteDialog from './user-subscription-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserSubscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserSubscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserSubscriptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserSubscription} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserSubscriptionDeleteDialog} />
  </>
);

export default Routes;
