import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PaymentDetail extends React.Component<IPaymentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { paymentEntity } = this.props;
    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="payment" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2>
            <Translate contentKey="studentexchangeApp.payment.detail.title">Payment</Translate> [<b>{paymentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="studentexchangeApp.payment.code">Code</Translate>
              </span>
            </dt>
            <dd>{paymentEntity.code}</dd>
            <dt>
              <span id="money">
                <Translate contentKey="studentexchangeApp.payment.money">Money</Translate>
              </span>
            </dt>
            <dd>{paymentEntity.money}</dd>
            <dt>
              <span id="paidTime">
                <Translate contentKey="studentexchangeApp.payment.paidTime">Paid Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={paymentEntity.paidTime} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="paymentStatus">
                <Translate contentKey="studentexchangeApp.payment.paymentStatus">Payment Status</Translate>
              </span>
            </dt>
            <dd>{paymentEntity.paymentStatus}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.payment.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={paymentEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="studentexchangeApp.payment.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={paymentEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.payment.house">House</Translate>
            </dt>
            <dd>{paymentEntity.houseId ? paymentEntity.houseId : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.payment.customer">Customer</Translate>
            </dt>
            <dd>{paymentEntity.customerLogin ? paymentEntity.customerLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.payment.createBy">Create By</Translate>
            </dt>
            <dd>{paymentEntity.createByLogin ? paymentEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.payment.updateBy">Update By</Translate>
            </dt>
            <dd>{paymentEntity.updateByLogin ? paymentEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/payment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/payment/${paymentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentEntity: payment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetail);
