import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ServiceFee from './service-fee';
import ServiceFeeDetail from './service-fee-detail';
import ServiceFeeUpdate from './service-fee-update';
import ServiceFeeDeleteDialog from './service-fee-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ServiceFeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ServiceFeeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ServiceFeeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ServiceFee} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ServiceFeeDeleteDialog} />
  </>
);

export default Routes;
