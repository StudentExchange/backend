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
import { getEntity, updateEntity, createEntity, reset } from './user-financial.reducer';
import { IUserFinancial } from 'app/shared/model/user-financial.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserFinancialUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserFinancialUpdateState {
  isNew: boolean;
  userId: string;
}

export class UserFinancialUpdate extends React.Component<IUserFinancialUpdateProps, IUserFinancialUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
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
      const { userFinancialEntity } = this.props;
      const entity = {
        ...userFinancialEntity,
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
    this.props.history.push('/entity/user-financial');
  };

  render() {
    const { userFinancialEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="studentexchangeApp.userFinancial.home.createOrEditLabel">
              <Translate contentKey="studentexchangeApp.userFinancial.home.createOrEditLabel">Create or edit a UserFinancial</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userFinancialEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="user-financial-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="housePriceLabel" for="housePrice">
                    <Translate contentKey="studentexchangeApp.userFinancial.housePrice">House Price</Translate>
                  </Label>
                  <AvField id="user-financial-housePrice" type="string" className="form-control" name="housePrice" />
                </AvGroup>
                <AvGroup>
                  <Label id="savingMoneyLabel" for="savingMoney">
                    <Translate contentKey="studentexchangeApp.userFinancial.savingMoney">Saving Money</Translate>
                  </Label>
                  <AvField id="user-financial-savingMoney" type="string" className="form-control" name="savingMoney" />
                </AvGroup>
                <AvGroup>
                  <Label id="loanRateLabel" for="loanRate">
                    <Translate contentKey="studentexchangeApp.userFinancial.loanRate">Loan Rate</Translate>
                  </Label>
                  <AvField id="user-financial-loanRate" type="string" className="form-control" name="loanRate" />
                </AvGroup>
                <AvGroup>
                  <Label id="loanFromPeopleLabel" for="loanFromPeople">
                    <Translate contentKey="studentexchangeApp.userFinancial.loanFromPeople">Loan From People</Translate>
                  </Label>
                  <AvField id="user-financial-loanFromPeople" type="string" className="form-control" name="loanFromPeople" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerMoneyHaveLabel" for="customerMoneyHave">
                    <Translate contentKey="studentexchangeApp.userFinancial.customerMoneyHave">Customer Money Have</Translate>
                  </Label>
                  <AvField id="user-financial-customerMoneyHave" type="string" className="form-control" name="customerMoneyHave" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerMobileLabel" for="customerMobile">
                    <Translate contentKey="studentexchangeApp.userFinancial.customerMobile">Customer Mobile</Translate>
                  </Label>
                  <AvField id="user-financial-customerMobile" type="text" name="customerMobile" />
                </AvGroup>
                <AvGroup>
                  <Label id="customerEmailLabel" for="customerEmail">
                    <Translate contentKey="studentexchangeApp.userFinancial.customerEmail">Customer Email</Translate>
                  </Label>
                  <AvField id="user-financial-customerEmail" type="text" name="customerEmail" />
                </AvGroup>
                <AvGroup>
                  <Label for="user.login">
                    <Translate contentKey="studentexchangeApp.userFinancial.user">User</Translate>
                  </Label>
                  <AvInput id="user-financial-user" type="select" className="form-control" name="userId">
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
                <Button tag={Link} id="cancel-save" to="/entity/user-financial" replace color="info">
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
  userFinancialEntity: storeState.userFinancial.entity,
  loading: storeState.userFinancial.loading,
  updating: storeState.userFinancial.updating,
  updateSuccess: storeState.userFinancial.updateSuccess
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
)(UserFinancialUpdate);
