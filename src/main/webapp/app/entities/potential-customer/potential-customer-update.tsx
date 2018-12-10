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
import { getEntity, updateEntity, createEntity, reset } from './potential-customer.reducer';
import { IPotentialCustomer } from 'app/shared/model/potential-customer.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPotentialCustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPotentialCustomerUpdateState {
  isNew: boolean;
  customerId: string;
  createById: string;
  updateById: string;
}

export class PotentialCustomerUpdate extends React.Component<IPotentialCustomerUpdateProps, IPotentialCustomerUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: '0',
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

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { potentialCustomerEntity } = this.props;
      const entity = {
        ...potentialCustomerEntity,
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
    this.props.history.push('/entity/potential-customer');
  };

  render() {
    const { potentialCustomerEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="landexpApp.potentialCustomer.home.createOrEditLabel">
              <Translate contentKey="landexpApp.potentialCustomer.home.createOrEditLabel">Create or edit a PotentialCustomer</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : potentialCustomerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="potential-customer-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="levelLabel">
                    <Translate contentKey="landexpApp.potentialCustomer.level">Level</Translate>
                  </Label>
                  <AvInput
                    id="potential-customer-level"
                    type="select"
                    className="form-control"
                    name="level"
                    value={(!isNew && potentialCustomerEntity.level) || 'NORMAL'}
                  >
                    <option value="NORMAL">
                      <Translate contentKey="landexpApp.CustomerLevel.NORMAL" />
                    </option>
                    <option value="SILVER">
                      <Translate contentKey="landexpApp.CustomerLevel.SILVER" />
                    </option>
                    <option value="GOLD">
                      <Translate contentKey="landexpApp.CustomerLevel.GOLD" />
                    </option>
                    <option value="PLATINUM">
                      <Translate contentKey="landexpApp.CustomerLevel.PLATINUM" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="landexpApp.potentialCustomer.description">Description</Translate>
                  </Label>
                  <AvField id="potential-customer-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="createAtLabel" for="createAt">
                    <Translate contentKey="landexpApp.potentialCustomer.createAt">Create At</Translate>
                  </Label>
                  <AvField id="potential-customer-createAt" type="date" className="form-control" name="createAt" />
                </AvGroup>
                <AvGroup>
                  <Label id="updateAtLabel" for="updateAt">
                    <Translate contentKey="landexpApp.potentialCustomer.updateAt">Update At</Translate>
                  </Label>
                  <AvField id="potential-customer-updateAt" type="date" className="form-control" name="updateAt" />
                </AvGroup>
                <AvGroup>
                  <Label for="customer.login">
                    <Translate contentKey="landexpApp.potentialCustomer.customer">Customer</Translate>
                  </Label>
                  <AvInput id="potential-customer-customer" type="select" className="form-control" name="customerId">
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
                  <Label for="createBy.login">
                    <Translate contentKey="landexpApp.potentialCustomer.createBy">Create By</Translate>
                  </Label>
                  <AvInput id="potential-customer-createBy" type="select" className="form-control" name="createById">
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
                    <Translate contentKey="landexpApp.potentialCustomer.updateBy">Update By</Translate>
                  </Label>
                  <AvInput id="potential-customer-updateBy" type="select" className="form-control" name="updateById">
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
                <Button tag={Link} id="cancel-save" to="/entity/potential-customer" replace color="info">
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
  potentialCustomerEntity: storeState.potentialCustomer.entity,
  loading: storeState.potentialCustomer.loading,
  updating: storeState.potentialCustomer.updating,
  updateSuccess: storeState.potentialCustomer.updateSuccess
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
)(PotentialCustomerUpdate);
