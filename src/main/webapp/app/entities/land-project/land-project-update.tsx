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
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './land-project.reducer';
import { ILandProject } from 'app/shared/model/land-project.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILandProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILandProjectUpdateState {
  isNew: boolean;
  cityId: string;
  districtId: string;
  wardId: string;
  createById: string;
  updateById: string;
}

export class LandProjectUpdate extends React.Component<ILandProjectUpdateProps, ILandProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: '0',
      districtId: '0',
      wardId: '0',
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
      const { landProjectEntity } = this.props;
      const entity = {
        ...landProjectEntity,
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
    this.props.history.push('/entity/land-project');
  };

  render() {
    const { landProjectEntity, cities, districts, wards, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = landProjectEntity;

    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="article" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="landexpApp.landProject.home.createOrEditLabel">
                <Translate contentKey="landexpApp.landProject.home.createOrEditLabel">Create or edit a LandProject</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : landProjectEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="land-project-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Label id="nameLabel" for="name">
                      <Translate contentKey="landexpApp.landProject.name">Name</Translate>
                    </Label>
                    <AvField id="land-project-name" type="text" name="name" />
                  </AvGroup>
                  <AvGroup>
                    <AvGroup>
                      <Label id="imageLabel" for="image">
                        <Translate contentKey="landexpApp.landProject.image">Image</Translate>
                      </Label>
                      <br />
                      {image ? (
                        <div>
                          <a onClick={openFile(imageContentType, image)}>
                            <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                          </a>
                          <br />
                          <Row>
                            <Col md="11">
                              <span>
                                {imageContentType}, {byteSize(image)}
                              </span>
                            </Col>
                            <Col md="1">
                              <Button color="danger" onClick={this.clearBlob('image')}>
                                <FontAwesomeIcon icon="times-circle" />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                      <AvInput type="hidden" name="image" value={image} />
                    </AvGroup>
                  </AvGroup>
                  <AvGroup>
                    <Label for="city.name">
                      <Translate contentKey="landexpApp.landProject.city">City</Translate>
                    </Label>
                    <AvInput id="land-project-city" type="select" className="form-control" name="cityId">
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
                      <Translate contentKey="landexpApp.landProject.district">District</Translate>
                    </Label>
                    <AvInput id="land-project-district" type="select" className="form-control" name="districtId">
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
                      <Translate contentKey="landexpApp.landProject.ward">Ward</Translate>
                    </Label>
                    <AvInput id="land-project-ward" type="select" className="form-control" name="wardId">
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
                    <Label for="createBy.login">
                      <Translate contentKey="landexpApp.landProject.createBy">Create By</Translate>
                    </Label>
                    <AvInput id="land-project-createBy" type="select" className="form-control" name="createById">
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
                      <Translate contentKey="landexpApp.landProject.updateBy">Update By</Translate>
                    </Label>
                    <AvInput id="land-project-updateBy" type="select" className="form-control" name="updateById">
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
                  <Button tag={Link} id="cancel-save" to="/entity/land-project" replace color="info">
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
  users: storeState.userManagement.users,
  landProjectEntity: storeState.landProject.entity,
  loading: storeState.landProject.loading,
  updating: storeState.landProject.updating,
  updateSuccess: storeState.landProject.updateSuccess
});

const mapDispatchToProps = {
  getCities,
  getDistricts,
  getWards,
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
)(LandProjectUpdate);
