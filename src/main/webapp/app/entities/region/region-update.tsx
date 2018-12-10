import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Icon } from 'antd';
import { IRootState } from 'app/shared/reducers';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './region.reducer';
import { IRegion } from 'app/shared/model/region.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRegionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRegionUpdateState {
  isNew: boolean;
  idsuser: any[];
}

export class RegionUpdate extends React.Component<IRegionUpdateProps, IRegionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsuser: [],
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { regionEntity } = this.props;
      const entity = {
        ...regionEntity,
        ...values,
        users: mapIdList(values.users)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/region');
  };

  userUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idsuser: keysToValues(selected, this.props.users, 'login')
    });
  };

  displayuser(value: any) {
    if (this.state.idsuser && this.state.idsuser.length !== 0) {
      const list = [];
      for (const i in this.state.idsuser) {
        if (this.state.idsuser[i]) {
          list.push(this.state.idsuser[i].login);
        }
      }
      return list;
    }
    if (value.users && value.users.length !== 0) {
      const list = [];
      for (const i in value.users) {
        if (value.users[i]) {
          list.push(value.users[i].login);
        }
      }
      this.setState({
        idsuser: keysToValues(list, this.props.users, 'login')
      });
      return list;
    }
    return null;
  }

  render() {
    const { regionEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="region" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="landexpApp.region.home.createOrEditLabel">
                <Translate contentKey="landexpApp.region.home.createOrEditLabel">Create or edit a Region</Translate>
              </h2>
            </Col>
          </Row>
          <Row>
            <Card title="Thông tin khu vực">
              <AvForm model={isNew ? {} : regionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <AvInput id="region-id" type="hidden" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="landexpApp.region.name">Name</Translate>
                  </Label>
                  <AvField id="region-name" type="text" name="name" />
                </AvGroup>
                <AvGroup>
                  <Label id="enabledLabel" check>
                    <AvInput id="region-enabled" type="checkbox" className="form-control" name="enabled" />
                    <Translate contentKey="landexpApp.region.enabled">Enabled</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="users">
                    <Translate contentKey="landexpApp.region.user">User</Translate>
                  </Label>
                  <AvInput
                    id="region-user"
                    type="select"
                    multiple
                    className="form-control"
                    name="fakeusers"
                    value={this.displayuser(regionEntity)}
                    onChange={this.userUpdate}
                  >
                    <option value="" key="0" />
                    {users
                      ? users.map(
                          otherEntity =>
                            otherEntity.authorities.includes('ROLE_STAFF') ? (
                              <option value={otherEntity.login} key={otherEntity.id}>
                                {otherEntity.login}
                              </option>
                            ) : (
                              ''
                            )
                        )
                      : null}
                  </AvInput>
                  <AvInput id="region-user" type="hidden" name="users" value={this.state.idsuser} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/quan-ly/khu-vuc" replace color="info">
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
  users: storeState.userManagement.users,
  regionEntity: storeState.region.entity,
  loading: storeState.region.loading,
  updating: storeState.region.updating,
  updateSuccess: storeState.region.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
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
)(RegionUpdate);
