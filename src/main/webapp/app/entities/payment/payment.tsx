import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import qs from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Modal, Card, Icon, Tooltip, Button, Input } from 'antd';
const Option = Select.Option;

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { paymentQueryStringMapping, queryString, getPaymentStatus, encodeId } from 'app/shared/util/utils';
import { getItemPayments, approvePayment } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPaymentState extends IPaginationBaseState {
  showConfirm: any;
  paymentInfo: any;
  parameters: any;
}

export class Payment extends React.Component<IPaymentProps, IPaymentState> {
  state: IPaymentState = {
    showConfirm: false,
    paymentInfo: undefined,
    parameters: {},
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getItemPayments(paymentQueryStringMapping(parsed));
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location !== prevProps.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getItemPayments(paymentQueryStringMapping(parsed));
    }
  }

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort } = this.state;
    const nextParameter = {
      ...this.state.parameters,
      page: activePage - 1,
      size: itemsPerPage,
      sort: 'createAt,desc'
    };
    this.props.history.push(`${this.props.match.url}?${queryString(nextParameter)}`);
  };

  gotoEdit = id => {
    this.props.history.push(`${this.props.match.url}/${id}/edit`);
  };

  showHouseInfo = payment => {
    this.props.history.push(`/bat-dong-san/${encodeId(payment.houseId)}/xem-truoc-tin-dang`);
  };

  showPaymentConfirm = paymentInfo => {
    this.setState({
      showConfirm: true,
      paymentInfo
    });
  };

  handlePaymentOk = id => {
    this.props.approvePayment(id);
    this.setState({
      showConfirm: false
    });
  };

  handlePaymentCancel = () => {
    this.setState({
      showConfirm: false
    });
  };

  menuStatusClick = value => {
    const parameters = { paymentStatus: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  statusForm() {
    return (
      <Select
        style={{ width: 180, marginRight: 2 }}
        value={this.state.parameters.paymentStatus}
        placeholder="Trạng thái giao dịch"
        onChange={this.menuStatusClick}
      >
        <Option value="PENDING">{getPaymentStatus('PENDING')}</Option>
        <Option value="PAID">{getPaymentStatus('PAID')}</Option>
        <Option value="CANCELED">{getPaymentStatus('CANCELED')}</Option>
      </Select>
    );
  }

  onChangeKeyword = e => {
    const parameters = { code: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  keywordForm() {
    return (
      <Input
        style={{ width: 280, marginRight: 2 }}
        placeholder="Mã chuyển tiền"
        value={this.state.parameters.code}
        onChange={this.onChangeKeyword}
      />
    );
  }

  searchClick = () => {
    this.getEntities();
  };

  clearSearchClick = () => {
    this.setState({
      parameters: {}
    });
    // this.getEntities();
  };

  render() {
    const { paymentList, match, totalItems } = this.props;
    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="article" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2 id="payment-heading">
            <Translate contentKey="landexpApp.payment.home.title">Payments</Translate>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="landexpApp.payment.home.createLabel">Create new Payment</Translate>
            </Link>
          </h2>
          <Row style={{ marginBottom: 20 }}>
            {this.statusForm()}
            {this.keywordForm()}
            <Button onClick={this.searchClick} style={{ marginRight: 2 }} type="primary">
              <FontAwesomeIcon icon="search" />
              Tìm kiếm
            </Button>
            <Button onClick={this.clearSearchClick}>
              <FontAwesomeIcon icon="trash" />
            </Button>
          </Row>
          <Row>
            <Card title="Danh sách chờ thanh toán">
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="landexpApp.payment.code">Code</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.payment.money">Money</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.payment.paidTime">Paid Time</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.payment.paymentStatus">Payment Status</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.payment.createAt">Create At</Translate>
                    </th>
                    <th>
                      <Translate contentKey="landexpApp.payment.customer">Customer</Translate>
                    </th>
                    <th className="hand">Nhân viên</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {paymentList.map((payment, i) => (
                    <tr key={`entity-${i}`}>
                      <td>{payment.code}</td>
                      <td>{new Intl.NumberFormat().format(payment.money)} VNĐ</td>
                      <td>{!payment.paidTime ? '' : <TextFormat type="date" value={payment.paidTime} format={APP_LOCAL_DATE_FORMAT} />}</td>
                      {payment.paymentStatus === 'PAID' ? (
                        <td style={{ color: 'green' }}>
                          <strong>{getPaymentStatus(payment.paymentStatus)}</strong>
                        </td>
                      ) : (
                        <td style={{ color: 'red' }}>
                          <strong>{getPaymentStatus(payment.paymentStatus)}</strong>
                        </td>
                      )}
                      <td>{payment.createAt ? payment.createAt : ''}</td>
                      <td>{payment.customerLogin ? payment.customerLogin : ''}</td>
                      <td>{payment.updateByLogin ? payment.updateByLogin : ''}</td>
                      <td>
                        <div style={{ float: 'left' }} onClick={this.showHouseInfo.bind(this, payment)}>
                          <Tooltip placement="top" title={'Xem tin đăng'}>
                            <Icon type="info-circle" />
                          </Tooltip>
                        </div>
                        {payment.paymentStatus !== 'PAID' ? (
                          <div style={{ float: 'left', marginLeft: 5 }} onClick={this.showPaymentConfirm.bind(this, payment)}>
                            <Tooltip placement="top" title={'Xác nhận thanh toán'}>
                              <Icon type="pay-circle" />
                            </Tooltip>
                          </div>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {!this.state.showConfirm ? (
                ''
              ) : (
                <Modal
                  title={`Xác nhận thanh toán cho tin đăng mã ${this.state.paymentInfo.code}`}
                  visible={this.state.showConfirm}
                  okText="Xác nhận"
                  okType="danger"
                  cancelText="Hủy"
                  onOk={this.handlePaymentOk.bind(this, this.state.paymentInfo.id)}
                  onCancel={this.handlePaymentCancel}
                >
                  <p>Hãy xác nhận lại thông tin thanh toán</p>
                  <p>Mã thanh toán: {this.state.paymentInfo.code}</p>
                  <p>Số tiền: {new Intl.NumberFormat().format(this.state.paymentInfo.money)} VNĐ</p>
                  <p>Khách hàng: {this.state.paymentInfo.customerLogin}</p>
                </Modal>
              )}
              <Row className="justify-content-center">
                <JhiPagination
                  items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                />
              </Row>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentList: payment.entities,
  totalItems: payment.totalItems,
  loading: payment.loading,
  updating: payment.updating
});

const mapDispatchToProps = {
  getItemPayments,
  approvePayment
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
