import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { Card, Icon } from 'antd';
import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRegion } from 'app/shared/model/region.model';
import { getEntities as getRegions } from 'app/entities/region/region.reducer';
import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { getEntity, updateEntity, createEntity, reset } from './district.reducer';
import { IDistrict } from 'app/shared/model/district.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDistrictUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDistrictUpdateState {
  isNew: boolean;
  regionId: string;
  cityId: string;
}

export class DistrictUpdate extends React.Component<IDistrictUpdateProps, IDistrictUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      regionId: '0',
      cityId: '0',
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

    this.props.getRegions();
    this.props.getCities();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { districtEntity } = this.props;
      const entity = {
        ...districtEntity,
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
    this.props.history.push('/entity/district');
  };

  regionUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        regionId: '-1'
      });
    } else {
      for (const i in this.props.regions) {
        if (id === this.props.regions[i].id.toString()) {
          this.setState({
            regionId: this.props.regions[i].id
          });
        }
      }
    }
  };

  cityUpdate = element => {
    const id = element.target.value.toString();
    if (id === '') {
      this.setState({
        cityId: '-1'
      });
    } else {
      for (const i in this.props.cities) {
        if (id === this.props.cities[i].id.toString()) {
          this.setState({
            cityId: this.props.cities[i].id
          });
        }
      }
    }
  };

  render() {
    const { districtEntity, regions, cities, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="district" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="landexpApp.district.home.createOrEditLabel">
                <Translate contentKey="landexpApp.district.home.createOrEditLabel">Create or edit a District</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Card title="Thông tin quận huyện">
              <AvForm model={isNew ? {} : districtEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="district-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="landexpApp.district.name">Name</Translate>
                  </Label>
                  <AvField id="district-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="enabledLabel" check>
                    <AvInput id="district-enabled" type="checkbox" className="form-control" name="enabled" />
                    <Translate contentKey="landexpApp.district.enabled">Enabled</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="region.id">
                    <Translate contentKey="landexpApp.district.region">Region</Translate>
                  </Label>
                  <AvInput id="district-region" type="select" className="form-control" name="regionId" onChange={this.regionUpdate}>
                    <option value="" key="0" />
                    {regions
                      ? regions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="city.id">
                    <Translate contentKey="landexpApp.district.city">City</Translate>
                  </Label>
                  <AvInput id="district-city" type="select" className="form-control" name="cityId" onChange={this.cityUpdate}>
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
                <Button tag={Link} id="cancel-save" to="/quan-ly/quan-huyen" replace color="info">
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
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  regions: storeState.region.entities,
  cities: storeState.city.entities,
  districtEntity: storeState.district.entity,
  loading: storeState.district.loading,
  updating: storeState.district.updating,
  updateSuccess: storeState.district.updateSuccess
});

const mapDispatchToProps = {
  getRegions,
  getCities,
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
)(DistrictUpdate);
