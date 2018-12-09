import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserFinancial from './user-financial';
import UserFinancialDetail from './user-financial-detail';
import UserFinancialUpdate from './user-financial-update';
import UserFinancialDeleteDialog from './user-financial-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserFinancialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserFinancialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserFinancialDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserFinancial} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={UserFinancialDeleteDialog} />
  </>
);

export default Routes;
