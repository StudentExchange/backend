import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './house.reducer';
import { IHouse } from 'app/shared/model/house.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHouseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HouseDetail extends React.Component<IHouseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { houseEntity } = this.props;
    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="house" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2>
            <Translate contentKey="studentexchangeApp.house.detail.title">House</Translate> [<b>{houseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="avatar">
                <Translate contentKey="studentexchangeApp.house.avatar">Avatar</Translate>
              </span>
            </dt>
            <dd>
              {houseEntity.avatar ? (
                <div>
                  <a onClick={openFile(houseEntity.avatarContentType, houseEntity.avatar)}>
                    <img src={`data:${houseEntity.avatarContentType};base64,${houseEntity.avatar}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {houseEntity.avatarContentType}, {byteSize(houseEntity.avatar)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="avatarLink">
                <Translate contentKey="studentexchangeApp.house.avatarLink">Avatar Link</Translate>
              </span>
            </dt>
            <dd>{houseEntity.avatarLink}</dd>
            <dt>
              <span id="actionType">
                <Translate contentKey="studentexchangeApp.house.actionType">Action Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.actionType}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="studentexchangeApp.house.address">Address</Translate>
              </span>
            </dt>
            <dd>{houseEntity.address}</dd>
            <dt>
              <span id="money">
                <Translate contentKey="studentexchangeApp.house.money">Money</Translate>
              </span>
            </dt>
            <dd>{houseEntity.money}</dd>
            <dt>
              <span id="acreage">
                <Translate contentKey="studentexchangeApp.house.acreage">Acreage</Translate>
              </span>
            </dt>
            <dd>{houseEntity.acreage}</dd>
            <dt>
              <span id="acreageStreetSide">
                <Translate contentKey="studentexchangeApp.house.acreageStreetSide">Acreage Street Side</Translate>
              </span>
            </dt>
            <dd>{houseEntity.acreageStreetSide}</dd>
            <dt>
              <span id="discount">
                <Translate contentKey="studentexchangeApp.house.discount">Discount</Translate>
              </span>
            </dt>
            <dd>{houseEntity.discount}</dd>
            <dt>
              <span id="direction">
                <Translate contentKey="studentexchangeApp.house.direction">Direction</Translate>
              </span>
            </dt>
            <dd>{houseEntity.direction}</dd>
            <dt>
              <span id="directionBalcony">
                <Translate contentKey="studentexchangeApp.house.directionBalcony">Direction Balcony</Translate>
              </span>
            </dt>
            <dd>{houseEntity.directionBalcony}</dd>
            <dt>
              <span id="floor">
                <Translate contentKey="studentexchangeApp.house.floor">Floor</Translate>
              </span>
            </dt>
            <dd>{houseEntity.floor}</dd>
            <dt>
              <span id="numberOfFloor">
                <Translate contentKey="studentexchangeApp.house.numberOfFloor">Number Of Floor</Translate>
              </span>
            </dt>
            <dd>{houseEntity.numberOfFloor}</dd>
            <dt>
              <span id="bathRoom">
                <Translate contentKey="studentexchangeApp.house.bathRoom">Bath Room</Translate>
              </span>
            </dt>
            <dd>{houseEntity.bathRoom}</dd>
            <dt>
              <span id="bedRoom">
                <Translate contentKey="studentexchangeApp.house.bedRoom">Bed Room</Translate>
              </span>
            </dt>
            <dd>{houseEntity.bedRoom}</dd>
            <dt>
              <span id="parking">
                <Translate contentKey="studentexchangeApp.house.parking">Parking</Translate>
              </span>
            </dt>
            <dd>{houseEntity.parking ? 'true' : 'false'}</dd>
            <dt>
              <span id="summary">
                <Translate contentKey="studentexchangeApp.house.summary">Summary</Translate>
              </span>
            </dt>
            <dd>{houseEntity.summary}</dd>
            <dt>
              <span id="landType">
                <Translate contentKey="studentexchangeApp.house.landType">Land Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.landType}</dd>
            <dt>
              <span id="saleType">
                <Translate contentKey="studentexchangeApp.house.saleType">Sale Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.saleType}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="studentexchangeApp.house.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{houseEntity.fee}</dd>
            <dt>
              <span id="feeMax">
                <Translate contentKey="studentexchangeApp.house.feeMax">Fee Max</Translate>
              </span>
            </dt>
            <dd>{houseEntity.feeMax}</dd>
            <dt>
              <span id="present">
                <Translate contentKey="studentexchangeApp.house.present">Present</Translate>
              </span>
            </dt>
            <dd>{houseEntity.present}</dd>
            <dt>
              <span id="hits">
                <Translate contentKey="studentexchangeApp.house.hits">Hits</Translate>
              </span>
            </dt>
            <dd>{houseEntity.hits}</dd>
            <dt>
              <span id="customer">
                <Translate contentKey="studentexchangeApp.house.customer">Customer</Translate>
              </span>
            </dt>
            <dd>{houseEntity.customer}</dd>
            <dt>
              <span id="mobile">
                <Translate contentKey="studentexchangeApp.house.mobile">Mobile</Translate>
              </span>
            </dt>
            <dd>{houseEntity.mobile}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="studentexchangeApp.house.email">Email</Translate>
              </span>
            </dt>
            <dd>{houseEntity.email}</dd>
            <dt>
              <span id="facebook">
                <Translate contentKey="studentexchangeApp.house.facebook">Facebook</Translate>
              </span>
            </dt>
            <dd>{houseEntity.facebook}</dd>
            <dt>
              <span id="zalo">
                <Translate contentKey="studentexchangeApp.house.zalo">Zalo</Translate>
              </span>
            </dt>
            <dd>{houseEntity.zalo}</dd>
            <dt>
              <span id="statusType">
                <Translate contentKey="studentexchangeApp.house.statusType">Status Type</Translate>
              </span>
            </dt>
            <dd>{houseEntity.statusType}</dd>
            <dt>
              <span id="googleId">
                <Translate contentKey="studentexchangeApp.house.googleId">Google Id</Translate>
              </span>
            </dt>
            <dd>{houseEntity.googleId}</dd>
            <dt>
              <span id="latitude">
                <Translate contentKey="studentexchangeApp.house.latitude">Latitude</Translate>
              </span>
            </dt>
            <dd>{houseEntity.latitude}</dd>
            <dt>
              <span id="longitude">
                <Translate contentKey="studentexchangeApp.house.longitude">Longitude</Translate>
              </span>
            </dt>
            <dd>{houseEntity.longitude}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.house.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={houseEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="studentexchangeApp.house.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={houseEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.city">City</Translate>
            </dt>
            <dd>{houseEntity.cityName ? houseEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.district">District</Translate>
            </dt>
            <dd>{houseEntity.districtName ? houseEntity.districtName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.ward">Ward</Translate>
            </dt>
            <dd>{houseEntity.wardName ? houseEntity.wardName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.project">Project</Translate>
            </dt>
            <dd>{houseEntity.projectName ? houseEntity.projectName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.createBy">Create By</Translate>
            </dt>
            <dd>{houseEntity.createByLogin ? houseEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.house.updateBy">Update By</Translate>
            </dt>
            <dd>{houseEntity.updateByLogin ? houseEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/house" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/house/${houseEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ house }: IRootState) => ({
  houseEntity: house.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseDetail);
