import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Region from './region';
import City from './city';
import District from './district';
import Ward from './ward';
import House from './house';
import ServiceFee from './service-fee';
import HousePhoto from './house-photo';
import LandProject from './land-project';
import LandProjectPhoto from './land-project-photo';
import Article from './article';
import Category from './category';
import UserSubscription from './user-subscription';
import UserLike from './user-like';
import UserFinancial from './user-financial';
import PotentialCustomer from './potential-customer';
import Payment from './payment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/region`} component={Region} />
      <ErrorBoundaryRoute path={`${match.url}/city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}/district`} component={District} />
      <ErrorBoundaryRoute path={`${match.url}/ward`} component={Ward} />
      <ErrorBoundaryRoute path={`${match.url}/house`} component={House} />
      <ErrorBoundaryRoute path={`${match.url}/service-fee`} component={ServiceFee} />
      <ErrorBoundaryRoute path={`${match.url}/house-photo`} component={HousePhoto} />
      <ErrorBoundaryRoute path={`${match.url}/land-project`} component={LandProject} />
      <ErrorBoundaryRoute path={`${match.url}/land-project-photo`} component={LandProjectPhoto} />
      <ErrorBoundaryRoute path={`${match.url}/article`} component={Article} />
      <ErrorBoundaryRoute path={`${match.url}/category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}/user-subscription`} component={UserSubscription} />
      <ErrorBoundaryRoute path={`${match.url}/user-like`} component={UserLike} />
      <ErrorBoundaryRoute path={`${match.url}/user-financial`} component={UserFinancial} />
      <ErrorBoundaryRoute path={`${match.url}/potential-customer`} component={PotentialCustomer} />
      <ErrorBoundaryRoute path={`${match.url}/payment`} component={Payment} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
