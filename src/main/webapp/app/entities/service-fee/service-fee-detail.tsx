import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './service-fee.reducer';
import { IServiceFee } from 'app/shared/model/service-fee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceFeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ServiceFeeDetail extends React.Component<IServiceFeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { serviceFeeEntity } = this.props;
    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="service-fee" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2>
            <Translate contentKey="studentexchangeApp.serviceFee.detail.title">ServiceFee</Translate> [<b>{serviceFeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="saleType">
                <Translate contentKey="studentexchangeApp.serviceFee.saleType">Sale Type</Translate>
              </span>
            </dt>
            <dd>{serviceFeeEntity.saleType}</dd>
            <dt>
              <span id="fee">
                <Translate contentKey="studentexchangeApp.serviceFee.fee">Fee</Translate>
              </span>
            </dt>
            <dd>{serviceFeeEntity.fee}</dd>
          </dl>
          <Button tag={Link} to="/entity/service-fee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/service-fee/${serviceFeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ serviceFee }: IRootState) => ({
  serviceFeeEntity: serviceFee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceFeeDetail);
