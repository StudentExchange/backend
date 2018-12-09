import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IDistrict } from 'app/shared/model/district.model';
import { getEntities as getDistricts } from 'app/entities/district/district.reducer';
import { IWard } from 'app/shared/model/ward.model';
import { getEntities as getWards } from 'app/entities/ward/ward.reducer';
import { ILandProject } from 'app/shared/model/land-project.model';
import { getEntities as getLandProjects } from 'app/entities/land-project/land-project.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHouseUpdateState {
  isNew: boolean;
  cityId: string;
  districtId: string;
  wardId: string;
  projectId: string;
  createById: string;
  updateById: string;
}

export class HouseUpdate extends React.Component<IHouseUpdateProps, IHouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: '0',
      districtId: '0',
      wardId: '0',
      projectId: '0',
      createById: '0',
      updateById: '0',
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

    this.props.getCities();
    this.props.getDistricts();
    this.props.getWards();
    this.props.getLandProjects();
    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { houseEntity } = this.props;
      const entity = {
        ...houseEntity,
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
    this.props.history.push('/entity/house');
  };

  render() {
    const { houseEntity, cities, districts, wards, landProjects, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avatar, avatarContentType } = houseEntity;

    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="project" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="studentexchangeApp.house.home.createOrEditLabel">
                <Translate contentKey="studentexchangeApp.house.home.createOrEditLabel">Create or edit a House</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : houseEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="house-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <AvGroup>
                      <Label id="avatarLabel" for="avatar">
                        <Translate contentKey="studentexchangeApp.house.avatar">Avatar</Translate>
                      </Label>
                      <br />
                      {avatar ? (
                        <div>
                          <a onClick={openFile(avatarContentType, avatar)}>
                            <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
                          </a>
                          <br />
                          <Row>
                            <Col md="11">
                              <span>
                                {avatarContentType}, {byteSize(avatar)}
                              </span>
                            </Col>
                            <Col md="1">
                              <Button color="danger" onClick={this.clearBlob('avatar')}>
                                <FontAwesomeIcon icon="times-circle" />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
                      <AvInput type="hidden" name="avatar" value={avatar} />
                    </AvGroup>
                  </AvGroup>
                  <AvGroup>
                    <Label id="avatarLinkLabel" for="avatarLink">
                      <Translate contentKey="studentexchangeApp.house.avatarLink">Avatar Link</Translate>
                    </Label>
                    <AvField id="house-avatarLink" type="text" name="avatarLink" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="actionTypeLabel">
                      <Translate contentKey="studentexchangeApp.house.actionType">Action Type</Translate>
                    </Label>
                    <AvInput
                      id="house-actionType"
                      type="select"
                      className="form-control"
                      name="actionType"
                      value={(!isNew && houseEntity.actionType) || 'FOR_BUY'}
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
                    <Label id="addressLabel" for="address">
                      <Translate contentKey="studentexchangeApp.house.address">Address</Translate>
                    </Label>
                    <AvField id="house-address" type="text" name="address" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="moneyLabel" for="money">
                      <Translate contentKey="studentexchangeApp.house.money">Money</Translate>
                    </Label>
                    <AvField id="house-money" type="string" className="form-control" name="money" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="acreageLabel" for="acreage">
                      <Translate contentKey="studentexchangeApp.house.acreage">Acreage</Translate>
                    </Label>
                    <AvField id="house-acreage" type="string" className="form-control" name="acreage" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="acreageStreetSideLabel" for="acreageStreetSide">
                      <Translate contentKey="studentexchangeApp.house.acreageStreetSide">Acreage Street Side</Translate>
                    </Label>
                    <AvField id="house-acreageStreetSide" type="string" className="form-control" name="acreageStreetSide" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="discountLabel" for="discount">
                      <Translate contentKey="studentexchangeApp.house.discount">Discount</Translate>
                    </Label>
                    <AvField id="house-discount" type="string" className="form-control" name="discount" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="directionLabel">
                      <Translate contentKey="studentexchangeApp.house.direction">Direction</Translate>
                    </Label>
                    <AvInput
                      id="house-direction"
                      type="select"
                      className="form-control"
                      name="direction"
                      value={(!isNew && houseEntity.direction) || 'NORTH'}
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
                    <Label id="directionBalconyLabel">
                      <Translate contentKey="studentexchangeApp.house.directionBalcony">Direction Balcony</Translate>
                    </Label>
                    <AvInput
                      id="house-directionBalcony"
                      type="select"
                      className="form-control"
                      name="directionBalcony"
                      value={(!isNew && houseEntity.directionBalcony) || 'NORTH'}
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
                      <Translate contentKey="studentexchangeApp.house.floor">Floor</Translate>
                    </Label>
                    <AvField id="house-floor" type="text" name="floor" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="numberOfFloorLabel" for="numberOfFloor">
                      <Translate contentKey="studentexchangeApp.house.numberOfFloor">Number Of Floor</Translate>
                    </Label>
                    <AvField id="house-numberOfFloor" type="string" className="form-control" name="numberOfFloor" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="bathRoomLabel" for="bathRoom">
                      <Translate contentKey="studentexchangeApp.house.bathRoom">Bath Room</Translate>
                    </Label>
                    <AvField id="house-bathRoom" type="string" className="form-control" name="bathRoom" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="bedRoomLabel" for="bedRoom">
                      <Translate contentKey="studentexchangeApp.house.bedRoom">Bed Room</Translate>
                    </Label>
                    <AvField id="house-bedRoom" type="string" className="form-control" name="bedRoom" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="parkingLabel" check>
                      <AvInput id="house-parking" type="checkbox" className="form-control" name="parking" />
                      <Translate contentKey="studentexchangeApp.house.parking">Parking</Translate>
                    </Label>
                  </AvGroup>
                  <AvGroup>
                    <Label id="summaryLabel" for="summary">
                      <Translate contentKey="studentexchangeApp.house.summary">Summary</Translate>
                    </Label>
                    <AvField id="house-summary" type="text" name="summary" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="landTypeLabel">
                      <Translate contentKey="studentexchangeApp.house.landType">Land Type</Translate>
                    </Label>
                    <AvInput
                      id="house-landType"
                      type="select"
                      className="form-control"
                      name="landType"
                      value={(!isNew && houseEntity.landType) || 'APARTMENT'}
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
                    <Label id="saleTypeLabel">
                      <Translate contentKey="studentexchangeApp.house.saleType">Sale Type</Translate>
                    </Label>
                    <AvInput
                      id="house-saleType"
                      type="select"
                      className="form-control"
                      name="saleType"
                      value={(!isNew && houseEntity.saleType) || 'SALE_BY_MYSELF'}
                    >
                      <option value="SALE_BY_MYSELF">
                        <Translate contentKey="studentexchangeApp.SaleType.SALE_BY_MYSELF" />
                      </option>
                      <option value="SALE_BY_MYSELF_VIP">
                        <Translate contentKey="studentexchangeApp.SaleType.SALE_BY_MYSELF_VIP" />
                      </option>
                      <option value="SALE_SUPPORT">
                        <Translate contentKey="studentexchangeApp.SaleType.SALE_SUPPORT" />
                      </option>
                      <option value="SALE_SUPPORT_VIP">
                        <Translate contentKey="studentexchangeApp.SaleType.SALE_SUPPORT_VIP" />
                      </option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label id="feeLabel" for="fee">
                      <Translate contentKey="studentexchangeApp.house.fee">Fee</Translate>
                    </Label>
                    <AvField id="house-fee" type="string" className="form-control" name="fee" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="feeMaxLabel" for="feeMax">
                      <Translate contentKey="studentexchangeApp.house.feeMax">Fee Max</Translate>
                    </Label>
                    <AvField id="house-feeMax" type="string" className="form-control" name="feeMax" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="presentLabel">
                      <Translate contentKey="studentexchangeApp.house.present">Present</Translate>
                    </Label>
                    <AvInput
                      id="house-present"
                      type="select"
                      className="form-control"
                      name="present"
                      value={(!isNew && houseEntity.present) || 'NONE'}
                    >
                      <option value="NONE">
                        <Translate contentKey="studentexchangeApp.PresentType.NONE" />
                      </option>
                      <option value="BASIC_FURNITURE">
                        <Translate contentKey="studentexchangeApp.PresentType.BASIC_FURNITURE" />
                      </option>
                      <option value="FULL_FURNITURE">
                        <Translate contentKey="studentexchangeApp.PresentType.FULL_FURNITURE" />
                      </option>
                      <option value="DISCOUNT_PRICE">
                        <Translate contentKey="studentexchangeApp.PresentType.DISCOUNT_PRICE" />
                      </option>
                      <option value="SUPPORT_EXHIBIT">
                        <Translate contentKey="studentexchangeApp.PresentType.SUPPORT_EXHIBIT" />
                      </option>
                      <option value="SUPPORT_FEE">
                        <Translate contentKey="studentexchangeApp.PresentType.SUPPORT_FEE" />
                      </option>
                      <option value="HAVE_PRESENT">
                        <Translate contentKey="studentexchangeApp.PresentType.HAVE_PRESENT" />
                      </option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label id="hitsLabel" for="hits">
                      <Translate contentKey="studentexchangeApp.house.hits">Hits</Translate>
                    </Label>
                    <AvField id="house-hits" type="string" className="form-control" name="hits" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="customerLabel" for="customer">
                      <Translate contentKey="studentexchangeApp.house.customer">Customer</Translate>
                    </Label>
                    <AvField id="house-customer" type="text" name="customer" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="mobileLabel" for="mobile">
                      <Translate contentKey="studentexchangeApp.house.mobile">Mobile</Translate>
                    </Label>
                    <AvField id="house-mobile" type="text" name="mobile" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="emailLabel" for="email">
                      <Translate contentKey="studentexchangeApp.house.email">Email</Translate>
                    </Label>
                    <AvField id="house-email" type="text" name="email" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="facebookLabel" for="facebook">
                      <Translate contentKey="studentexchangeApp.house.facebook">Facebook</Translate>
                    </Label>
                    <AvField id="house-facebook" type="text" name="facebook" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="zaloLabel" for="zalo">
                      <Translate contentKey="studentexchangeApp.house.zalo">Zalo</Translate>
                    </Label>
                    <AvField id="house-zalo" type="text" name="zalo" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="statusTypeLabel">
                      <Translate contentKey="studentexchangeApp.house.statusType">Status Type</Translate>
                    </Label>
                    <AvInput
                      id="house-statusType"
                      type="select"
                      className="form-control"
                      name="statusType"
                      value={(!isNew && houseEntity.statusType) || 'OPEN'}
                    >
                      <option value="OPEN">
                        <Translate contentKey="studentexchangeApp.StatusType.OPEN" />
                      </option>
                      <option value="PENDING">
                        <Translate contentKey="studentexchangeApp.StatusType.PENDING" />
                      </option>
                      <option value="PAID">
                        <Translate contentKey="studentexchangeApp.StatusType.PAID" />
                      </option>
                      <option value="CANCELED">
                        <Translate contentKey="studentexchangeApp.StatusType.CANCELED" />
                      </option>
                      <option value="EXPIRED">
                        <Translate contentKey="studentexchangeApp.StatusType.EXPIRED" />
                      </option>
                      <option value="SOLD">
                        <Translate contentKey="studentexchangeApp.StatusType.SOLD" />
                      </option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label id="googleIdLabel" for="googleId">
                      <Translate contentKey="studentexchangeApp.house.googleId">Google Id</Translate>
                    </Label>
                    <AvField id="house-googleId" type="text" name="googleId" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="latitudeLabel" for="latitude">
                      <Translate contentKey="studentexchangeApp.house.latitude">Latitude</Translate>
                    </Label>
                    <AvField id="house-latitude" type="string" className="form-control" name="latitude" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="longitudeLabel" for="longitude">
                      <Translate contentKey="studentexchangeApp.house.longitude">Longitude</Translate>
                    </Label>
                    <AvField id="house-longitude" type="string" className="form-control" name="longitude" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="createAtLabel" for="createAt">
                      <Translate contentKey="studentexchangeApp.house.createAt">Create At</Translate>
                    </Label>
                    <AvField id="house-createAt" type="date" className="form-control" name="createAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="updateAtLabel" for="updateAt">
                      <Translate contentKey="studentexchangeApp.house.updateAt">Update At</Translate>
                    </Label>
                    <AvField id="house-updateAt" type="date" className="form-control" name="updateAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label for="city.name">
                      <Translate contentKey="studentexchangeApp.house.city">City</Translate>
                    </Label>
                    <AvInput id="house-city" type="select" className="form-control" name="cityId">
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
                      <Translate contentKey="studentexchangeApp.house.district">District</Translate>
                    </Label>
                    <AvInput id="house-district" type="select" className="form-control" name="districtId">
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
                  <AvGroup>
                    <Label for="ward.name">
                      <Translate contentKey="studentexchangeApp.house.ward">Ward</Translate>
                    </Label>
                    <AvInput id="house-ward" type="select" className="form-control" name="wardId">
                      <option value="" key="0" />
                      {wards
                        ? wards.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="project.name">
                      <Translate contentKey="studentexchangeApp.house.project">Project</Translate>
                    </Label>
                    <AvInput id="house-project" type="select" className="form-control" name="projectId">
                      <option value="" key="0" />
                      {landProjects
                        ? landProjects.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="createBy.login">
                      <Translate contentKey="studentexchangeApp.house.createBy">Create By</Translate>
                    </Label>
                    <AvInput id="house-createBy" type="select" className="form-control" name="createById">
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
                    <Label for="updateBy.login">
                      <Translate contentKey="studentexchangeApp.house.updateBy">Update By</Translate>
                    </Label>
                    <AvInput id="house-updateBy" type="select" className="form-control" name="updateById">
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
                  <Button tag={Link} id="cancel-save" to="/entity/house" replace color="info">
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
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  cities: storeState.city.entities,
  districts: storeState.district.entities,
  wards: storeState.ward.entities,
  landProjects: storeState.landProject.entities,
  users: storeState.userManagement.users,
  houseEntity: storeState.house.entity,
  loading: storeState.house.loading,
  updating: storeState.house.updating,
  updateSuccess: storeState.house.updateSuccess
});

const mapDispatchToProps = {
  getCities,
  getDistricts,
  getWards,
  getLandProjects,
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseUpdate);
