import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-subscription.reducer';
import { IUserSubscription } from 'app/shared/model/user-subscription.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserSubscriptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserSubscriptionDetail extends React.Component<IUserSubscriptionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userSubscriptionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="studentexchangeApp.userSubscription.detail.title">UserSubscription</Translate> [
            <b>{userSubscriptionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="actionType">
                <Translate contentKey="studentexchangeApp.userSubscription.actionType">Action Type</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.actionType}</dd>
            <dt>
              <span id="keyword">
                <Translate contentKey="studentexchangeApp.userSubscription.keyword">Keyword</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.keyword}</dd>
            <dt>
              <span id="costFrom">
                <Translate contentKey="studentexchangeApp.userSubscription.costFrom">Cost From</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.costFrom}</dd>
            <dt>
              <span id="costTo">
                <Translate contentKey="studentexchangeApp.userSubscription.costTo">Cost To</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.costTo}</dd>
            <dt>
              <span id="acreageFrom">
                <Translate contentKey="studentexchangeApp.userSubscription.acreageFrom">Acreage From</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.acreageFrom}</dd>
            <dt>
              <span id="acreageTo">
                <Translate contentKey="studentexchangeApp.userSubscription.acreageTo">Acreage To</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.acreageTo}</dd>
            <dt>
              <span id="direction">
                <Translate contentKey="studentexchangeApp.userSubscription.direction">Direction</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.direction}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="studentexchangeApp.userSubscription.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.floor}</dd>
            <dt>
              <span id="bathRoom">
                <Translate contentKey="studentexchangeApp.userSubscription.bathRoom">Bath Room</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.bathRoom}</dd>
            <dt>
              <span id="bedRoom">
                <Translate contentKey="studentexchangeApp.userSubscription.bedRoom">Bed Room</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.bedRoom}</dd>
            <dt>
              <span id="parking">
                <Translate contentKey="studentexchangeApp.userSubscription.parking">Parking</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.parking ? 'true' : 'false'}</dd>
            <dt>
              <span id="landType">
                <Translate contentKey="studentexchangeApp.userSubscription.landType">Land Type</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.landType}</dd>
            <dt>
              <span id="enabled">
                <Translate contentKey="studentexchangeApp.userSubscription.enabled">Enabled</Translate>
              </span>
            </dt>
            <dd>{userSubscriptionEntity.enabled ? 'true' : 'false'}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.userSubscription.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userSubscriptionEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="studentexchangeApp.userSubscription.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userSubscriptionEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userSubscription.user">User</Translate>
            </dt>
            <dd>{userSubscriptionEntity.userLogin ? userSubscriptionEntity.userLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userSubscription.city">City</Translate>
            </dt>
            <dd>{userSubscriptionEntity.cityName ? userSubscriptionEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userSubscription.district">District</Translate>
            </dt>
            <dd>{userSubscriptionEntity.districtName ? userSubscriptionEntity.districtName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-subscription" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-subscription/${userSubscriptionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userSubscription }: IRootState) => ({
  userSubscriptionEntity: userSubscription.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSubscriptionDetail);
