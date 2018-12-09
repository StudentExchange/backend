import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IDistrict } from 'app/shared/model/district.model';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-subscription.reducer';
import { IUserSubscription } from 'app/shared/model/user-subscription.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserSubscriptionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserSubscriptionUpdateState {
  isNew: boolean;
  userId: string;
  cityId: string;
  districtId: string;
}

export class UserSubscriptionUpdate extends React.Component<IUserSubscriptionUpdateProps, IUserSubscriptionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      cityId: '0',
      districtId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getCities();
    this.props.getDistricts();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userSubscriptionEntity } = this.props;
      const entity = {
        ...userSubscriptionEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/user-subscription');
  };

  render() {
    const { userSubscriptionEntity, users, cities, districts, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="studentexchangeApp.userSubscription.home.createOrEditLabel">
              <Translate contentKey="studentexchangeApp.userSubscription.home.createOrEditLabel">
                Create or edit a UserSubscription
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userSubscriptionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-subscription-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="actionTypeLabel">
                    <Translate contentKey="studentexchangeApp.userSubscription.actionType">Action Type</Translate>
                  </Label>
                  <AvInput
                    id="user-subscription-actionType"
                    type="select"
                    className="form-control"
                    name="actionType"
                    value={(!isNew && userSubscriptionEntity.actionType) || 'FOR_BUY'}
                  >
                    <option value="FOR_BUY">
                      <Translate contentKey="studentexchangeApp.UserActionType.FOR_BUY" />
                    </option>
                    <option value="FOR_SELL">
                      <Translate contentKey="studentexchangeApp.UserActionType.FOR_SELL" />
                    </option>
                    <option value="FOR_RENT">
                      <Translate contentKey="studentexchangeApp.UserActionType.FOR_RENT" />
                    </option>
                    <option value="FOR_HIRE">
                      <Translate contentKey="studentexchangeApp.UserActionType.FOR_HIRE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="keywordLabel" for="keyword">
                    <Translate contentKey="studentexchangeApp.userSubscription.keyword">Keyword</Translate>
                  </Label>
                  <AvField id="user-subscription-keyword" type="text" name="keyword" />
                </AvGroup>
                <AvGroup>
                  <Label id="costFromLabel" for="costFrom">
                    <Translate contentKey="studentexchangeApp.userSubscription.costFrom">Cost From</Translate>
                  </Label>
                  <AvField id="user-subscription-costFrom" type="string" className="form-control" name="costFrom" />
                </AvGroup>
                <AvGroup>
                  <Label id="costToLabel" for="costTo">
                    <Translate contentKey="studentexchangeApp.userSubscription.costTo">Cost To</Translate>
                  </Label>
                  <AvField id="user-subscription-costTo" type="string" className="form-control" name="costTo" />
                </AvGroup>
                <AvGroup>
                  <Label id="acreageFromLabel" for="acreageFrom">
                    <Translate contentKey="studentexchangeApp.userSubscription.acreageFrom">Acreage From</Translate>
                  </Label>
                  <AvField id="user-subscription-acreageFrom" type="string" className="form-control" name="acreageFrom" />
                </AvGroup>
                <AvGroup>
                  <Label id="acreageToLabel" for="acreageTo">
                    <Translate contentKey="studentexchangeApp.userSubscription.acreageTo">Acreage To</Translate>
                  </Label>
                  <AvField id="user-subscription-acreageTo" type="string" className="form-control" name="acreageTo" />
                </AvGroup>
                <AvGroup>
                  <Label id="directionLabel">
                    <Translate contentKey="studentexchangeApp.userSubscription.direction">Direction</Translate>
                  </Label>
                  <AvInput
                    id="user-subscription-direction"
                    type="select"
                    className="form-control"
                    name="direction"
                    value={(!isNew && userSubscriptionEntity.direction) || 'NORTH'}
                  >
                    <option value="NORTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.NORTH" />
                    </option>
                    <option value="SOUTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.SOUTH" />
                    </option>
                    <option value="EAST">
                      <Translate contentKey="studentexchangeApp.DirectionType.EAST" />
                    </option>
                    <option value="WEST">
                      <Translate contentKey="studentexchangeApp.DirectionType.WEST" />
                    </option>
                    <option value="EAST_NORTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.EAST_NORTH" />
                    </option>
                    <option value="WEST_NORTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.WEST_NORTH" />
                    </option>
                    <option value="EAST_SOUTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.EAST_SOUTH" />
                    </option>
                    <option value="WEST_SOUTH">
                      <Translate contentKey="studentexchangeApp.DirectionType.WEST_SOUTH" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="floorLabel" for="floor">
                    <Translate contentKey="studentexchangeApp.userSubscription.floor">Floor</Translate>
                  </Label>
                  <AvField id="user-subscription-floor" type="text" name="floor" />
                </AvGroup>
                <AvGroup>
                  <Label id="bathRoomLabel" for="bathRoom">
                    <Translate contentKey="studentexchangeApp.userSubscription.bathRoom">Bath Room</Translate>
                  </Label>
                  <AvField id="user-subscription-bathRoom" type="string" className="form-control" name="bathRoom" />
                </AvGroup>
                <AvGroup>
                  <Label id="bedRoomLabel" for="bedRoom">
                    <Translate contentKey="studentexchangeApp.userSubscription.bedRoom">Bed Room</Translate>
                  </Label>
                  <AvField id="user-subscription-bedRoom" type="string" className="form-control" name="bedRoom" />
                </AvGroup>
                <AvGroup>
                  <Label id="parkingLabel" check>
                    <AvInput id="user-subscription-parking" type="checkbox" className="form-control" name="parking" />
                    <Translate contentKey="studentexchangeApp.userSubscription.parking">Parking</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="landTypeLabel">
                    <Translate contentKey="studentexchangeApp.userSubscription.landType">Land Type</Translate>
                  </Label>
                  <AvInput
                    id="user-subscription-landType"
                    type="select"
                    className="form-control"
                    name="landType"
                    value={(!isNew && userSubscriptionEntity.landType) || 'APARTMENT'}
                  >
                    <option value="APARTMENT">
                      <Translate contentKey="studentexchangeApp.LandType.APARTMENT" />
                    </option>
                    <option value="PEN_HOUSE">
                      <Translate contentKey="studentexchangeApp.LandType.PEN_HOUSE" />
                    </option>
                    <option value="HOME">
                      <Translate contentKey="studentexchangeApp.LandType.HOME" />
                    </option>
                    <option value="HOME_VILLA">
                      <Translate contentKey="studentexchangeApp.LandType.HOME_VILLA" />
                    </option>
                    <option value="HOME_STREET_SIDE">
                      <Translate contentKey="studentexchangeApp.LandType.HOME_STREET_SIDE" />
                    </option>
                    <option value="MOTEL_ROOM">
                      <Translate contentKey="studentexchangeApp.LandType.MOTEL_ROOM" />
                    </option>
                    <option value="OFFICE">
                      <Translate contentKey="studentexchangeApp.LandType.OFFICE" />
                    </option>
                    <option value="LAND_SCAPE">
                      <Translate contentKey="studentexchangeApp.LandType.LAND_SCAPE" />
                    </option>
                    <option value="LAND_OF_PROJECT">
                      <Translate contentKey="studentexchangeApp.LandType.LAND_OF_PROJECT" />
                    </option>
                    <option value="LAND_FARM">
                      <Translate contentKey="studentexchangeApp.LandType.LAND_FARM" />
                    </option>
                    <option value="LAND_RESORT">
                      <Translate contentKey="studentexchangeApp.LandType.LAND_RESORT" />
                    </option>
                    <option value="WAREHOUSES">
                      <Translate contentKey="studentexchangeApp.LandType.WAREHOUSES" />
                    </option>
                    <option value="KIOSKS">
                      <Translate contentKey="studentexchangeApp.LandType.KIOSKS" />
                    </option>
                    <option value="OTHER">
                      <Translate contentKey="studentexchangeApp.LandType.OTHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="enabledLabel" check>
                    <AvInput id="user-subscription-enabled" type="checkbox" className="form-control" name="enabled" />
                    <Translate contentKey="studentexchangeApp.userSubscription.enabled">Enabled</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="createAtLabel" for="createAt">
                    <Translate contentKey="studentexchangeApp.userSubscription.createAt">Create At</Translate>
                  </Label>
                  <AvField id="user-subscription-createAt" type="date" className="form-control" name="createAt" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateAtLabel" for="updateAt">
                    <Translate contentKey="studentexchangeApp.userSubscription.updateAt">Update At</Translate>
                  </Label>
                  <AvField id="user-subscription-updateAt" type="date" className="form-control" name="updateAt" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="studentexchangeApp.userSubscription.user">User</Translate>
                  </Label>
                  <AvInput id="user-subscription-user" type="select" className="form-control" name="userId">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="city.name">
                    <Translate contentKey="studentexchangeApp.userSubscription.city">City</Translate>
                  </Label>
                  <AvInput id="user-subscription-city" type="select" className="form-control" name="cityId">
                    <option value="" key="0" />
                    {cities
                      ? cities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="district.name">
                    <Translate contentKey="studentexchangeApp.userSubscription.district">District</Translate>
                  </Label>
                  <AvInput id="user-subscription-district" type="select" className="form-control" name="districtId">
                    <option value="" key="0" />
                    {districts
                      ? districts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-subscription" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  cities: storeState.city.entities,
  districts: storeState.district.entities,
  userSubscriptionEntity: storeState.userSubscription.entity,
  loading: storeState.userSubscription.loading,
  updating: storeState.userSubscription.updating,
  updateSuccess: storeState.userSubscription.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getCities,
  getDistricts,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSubscriptionUpdate);
