import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PotentialCustomer from './potential-customer';
import PotentialCustomerDetail from './potential-customer-detail';
import PotentialCustomerUpdate from './potential-customer-update';
import PotentialCustomerDeleteDialog from './potential-customer-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PotentialCustomerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PotentialCustomerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PotentialCustomerDetail} />
      <ErrorBoundaryRoute path={match.url} component={PotentialCustomer} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PotentialCustomerDeleteDialog} />
  </>
);

export default Routes;
