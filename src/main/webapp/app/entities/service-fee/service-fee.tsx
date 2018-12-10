import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './service-fee.reducer';
import { IServiceFee } from 'app/shared/model/service-fee.model';
// tslint:disable-next-line:no-unused-variable
import { getSaleType } from 'app/shared/util/utils';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IServiceFeeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ServiceFee extends React.Component<IServiceFeeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { serviceFeeList, match } = this.props;
    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="service-fee" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row>
            <h2 id="service-fee-heading">
              <Translate contentKey="landexpApp.serviceFee.home.title">Service Fees</Translate>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="landexpApp.serviceFee.home.createLabel">Create new Service Fee</Translate>
              </Link>
            </h2>
          </Row>
          <Row>
            <Card title="Bảng phí dịch vụ">
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="landexpApp.serviceFee.saleType">Sale Type</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.serviceFee.fee">Fee</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {serviceFeeList.map((serviceFee, i) => (
                    <tr key={`entity-${i}`}>
                      <td>{getSaleType(serviceFee.saleType)}</td>
                      <td>{new Intl.NumberFormat().format(serviceFee.fee)} VNĐ</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${serviceFee.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ serviceFee }: IRootState) => ({
  serviceFeeList: serviceFee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceFee);
