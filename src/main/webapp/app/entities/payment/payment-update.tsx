import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IHouse } from 'app/shared/model/house.model';
import { getEntities as getHouses } from 'app/entities/house/house.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPaymentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPaymentUpdateState {
  isNew: boolean;
  houseId: string;
  customerId: string;
  createById: string;
  updateById: string;
}

export class PaymentUpdate extends React.Component<IPaymentUpdateProps, IPaymentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      houseId: '0',
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

    this.props.getHouses();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { paymentEntity } = this.props;
      const entity = {
        ...paymentEntity,
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
    this.props.history.push('/entity/payment');
  };

  render() {
    const { paymentEntity, houses, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="project" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="studentexchangeApp.payment.home.createOrEditLabel">
                <Translate contentKey="studentexchangeApp.payment.home.createOrEditLabel">Create or edit a Payment</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : paymentEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="payment-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Label id="codeLabel" for="code">
                      <Translate contentKey="studentexchangeApp.payment.code">Code</Translate>
                    </Label>
                    <AvField id="payment-code" type="text" name="code" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="moneyLabel" for="money">
                      <Translate contentKey="studentexchangeApp.payment.money">Money</Translate>
                    </Label>
                    <AvField id="payment-money" type="string" className="form-control" name="money" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="paidTimeLabel" for="paidTime">
                      <Translate contentKey="studentexchangeApp.payment.paidTime">Paid Time</Translate>
                    </Label>
                    <AvField id="payment-paidTime" type="date" className="form-control" name="paidTime" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="paymentStatusLabel">
                      <Translate contentKey="studentexchangeApp.payment.paymentStatus">Payment Status</Translate>
                    </Label>
                    <AvInput
                      id="payment-paymentStatus"
                      type="select"
                      className="form-control"
                      name="paymentStatus"
                      value={(!isNew && paymentEntity.paymentStatus) || 'PENDING'}
                    >
                      <option value="PENDING">
                        <Translate contentKey="studentexchangeApp.PaymentStatusType.PENDING" />
                      </option>
                      <option value="PAID">
                        <Translate contentKey="studentexchangeApp.PaymentStatusType.PAID" />
                      </option>
                      <option value="CANCELED">
                        <Translate contentKey="studentexchangeApp.PaymentStatusType.CANCELED" />
                      </option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label id="createAtLabel" for="createAt">
                      <Translate contentKey="studentexchangeApp.payment.createAt">Create At</Translate>
                    </Label>
                    <AvField id="payment-createAt" type="date" className="form-control" name="createAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="updateAtLabel" for="updateAt">
                      <Translate contentKey="studentexchangeApp.payment.updateAt">Update At</Translate>
                    </Label>
                    <AvField id="payment-updateAt" type="date" className="form-control" name="updateAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label for="house.id">
                      <Translate contentKey="studentexchangeApp.payment.house">House</Translate>
                    </Label>
                    <AvInput id="payment-house" type="select" className="form-control" name="houseId">
                      <option value="" key="0" />
                      {houses
                        ? houses.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.id}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="customer.login">
                      <Translate contentKey="studentexchangeApp.payment.customer">Customer</Translate>
                    </Label>
                    <AvInput id="payment-customer" type="select" className="form-control" name="customerId">
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
                      <Translate contentKey="studentexchangeApp.payment.createBy">Create By</Translate>
                    </Label>
                    <AvInput id="payment-createBy" type="select" className="form-control" name="createById">
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
                      <Translate contentKey="studentexchangeApp.payment.updateBy">Update By</Translate>
                    </Label>
                    <AvInput id="payment-updateBy" type="select" className="form-control" name="updateById">
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
                  <Button tag={Link} id="cancel-save" to="/entity/payment" replace color="info">
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
  houses: storeState.house.entities,
  users: storeState.userManagement.users,
  paymentEntity: storeState.payment.entity,
  loading: storeState.payment.loading,
  updating: storeState.payment.updating,
  updateSuccess: storeState.payment.updateSuccess
});

const mapDispatchToProps = {
  getHouses,
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
)(PaymentUpdate);
