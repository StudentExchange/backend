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

import { getEntity, updateEntity, createEntity, reset } from './service-fee.reducer';
import { IServiceFee } from 'app/shared/model/service-fee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IServiceFeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IServiceFeeUpdateState {
  isNew: boolean;
}

export class ServiceFeeUpdate extends React.Component<IServiceFeeUpdateProps, IServiceFeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { serviceFeeEntity } = this.props;
      const entity = {
        ...serviceFeeEntity,
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
    this.props.history.push('/entity/service-fee');
  };

  render() {
    const { serviceFeeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="service-fee" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="studentexchangeApp.serviceFee.home.createOrEditLabel">
                <Translate contentKey="studentexchangeApp.serviceFee.home.createOrEditLabel">Create or edit a ServiceFee</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : serviceFeeEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="service-fee-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Label id="saleTypeLabel">
                      <Translate contentKey="studentexchangeApp.serviceFee.saleType">Sale Type</Translate>
                    </Label>
                    <AvInput
                      id="service-fee-saleType"
                      type="select"
                      className="form-control"
                      name="saleType"
                      value={(!isNew && serviceFeeEntity.saleType) || 'SALE_BY_MYSELF'}
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
                      <Translate contentKey="studentexchangeApp.serviceFee.fee">Fee</Translate>
                    </Label>
                    <AvField id="service-fee-fee" type="string" className="form-control" name="fee" />
                  </AvGroup>
                  <Button tag={Link} id="cancel-save" to="/entity/service-fee" replace color="info">
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
  serviceFeeEntity: storeState.serviceFee.entity,
  loading: storeState.serviceFee.loading,
  updating: storeState.serviceFee.updating,
  updateSuccess: storeState.serviceFee.updateSuccess
});

const mapDispatchToProps = {
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
)(ServiceFeeUpdate);
