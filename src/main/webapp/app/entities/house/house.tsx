import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row, Container, Table } from 'reactstrap';
import { getLandType, getSaleType, getStatusType, queryString, queryStringMapping, encodeId } from 'app/shared/util/utils';
import { Translate, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import qs from 'query-string';
import { Select, Input, Button, Modal, Card } from 'antd';
const Option = Select.Option;

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';
import { getHouses, getEntities, getItemEntities, getStaffEntities, deleteEntity } from './house.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHouseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IHouseState extends IPaginationBaseState {
  showDelete: any;
  houseId: any;
  parameters: any;
}

export class House extends React.Component<IHouseProps, IHouseState> {
  state: IHouseState = {
    showDelete: false,
    houseId: undefined,
    parameters: {},
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getItemEntities(queryStringMapping(parsed));
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location !== prevProps.location) {
      const parsed = qs.parse(this.props.location.search);
      this.props.getItemEntities(queryStringMapping(parsed));
    }
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.getEntities());

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

  gotoView = id => {
    this.props.history.push(`/bat-dong-san/${encodeId(id)}/xem-truoc-tin-dang`);
  };

  showDeleteConfirm = houseId => {
    this.setState({
      showDelete: true,
      houseId
    });
  };

  handleDeleteOk = id => {
    this.props.deleteEntity(id);
    this.setState({
      showDelete: false
    });
  };

  handleDeleteCancel = () => {
    this.setState({
      showDelete: false
    });
  };

  menuTypeClick = value => {
    const parameters = { actionType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  actionTypeForm() {
    return (
      <Select
        style={{ width: 140, marginRight: 2 }}
        value={this.state.parameters.actionType}
        placeholder="Hình thức"
        onChange={this.menuTypeClick}
      >
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  menuLandTypeClick = value => {
    const parameters = { landType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  landTypeForm() {
    return (
      <Select
        style={{ width: 180, marginRight: 2 }}
        value={this.state.parameters.landType}
        placeholder="Loại bất động sản"
        onChange={this.menuLandTypeClick}
      >
        <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
        <Option value="HOME">{getLandType('HOME')}</Option>
        <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
        <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
        <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
        <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
        <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
        <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
        <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
        <Option value="OFFICE">{getLandType('OFFICE')}</Option>
        <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
        <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
      </Select>
    );
  }

  menuSaleTypeClick = value => {
    const parameters = { saleType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  saleTypeForm() {
    return (
      <Select
        style={{ width: 180, marginRight: 2 }}
        value={this.state.parameters.saleType}
        placeholder="Loại tin"
        onChange={this.menuSaleTypeClick}
      >
        <Option value="SALE_BY_MYSELF">{getSaleType('SALE_BY_MYSELF')}</Option>
        <Option value="SALE_BY_MYSELF_VIP">{getSaleType('SALE_BY_MYSELF_VIP')}</Option>
        <Option value="SALE_SUPPORT">{getSaleType('SALE_SUPPORT')}</Option>
        <Option value="SALE_SUPPORT_VIP">{getSaleType('SALE_SUPPORT_VIP')}</Option>
      </Select>
    );
  }

  menuStatusClick = value => {
    const parameters = { statusType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  statusForm() {
    return (
      <Select
        style={{ width: 180, marginRight: 2 }}
        value={this.state.parameters.statusType}
        placeholder="Trạng thái"
        onChange={this.menuStatusClick}
      >
        <Option value="PENDING">{getStatusType('PENDING')}</Option>
        <Option value="PAID">{getStatusType('PAID')}</Option>
        <Option value="CANCELED">{getStatusType('CANCELED')}</Option>
      </Select>
    );
  }

  onChangeKeyword = e => {
    const parameters = { mobile: e.target.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  keywordForm() {
    return <Input style={{ width: 280, marginRight: 2 }} placeholder="Số điện thoại" onChange={this.onChangeKeyword} />;
  }

  searchClick = () => {
    this.getEntities();
  };

  clearSearchClick = () => {
    this.setState({
      parameters: {}
    });
    this.getEntities();
  };

  render() {
    const { houseList, match, totalItems } = this.props;
    return (
      <Row>
        <SearchPage location={this.props.location} history={this.props.history} />
        <Container>
          <Row>
            <Col md="12">
              {this.props.loading || this.props.updating ? (
                <Loading />
              ) : (
                <Row>
                  <Card title="Danh sách tin đăng">
                    <Row style={{ marginBottom: 20 }}>
                      <Container>
                        {this.actionTypeForm()}
                        {this.landTypeForm()}
                        {this.saleTypeForm()}
                        {this.statusForm()}
                        {this.keywordForm()}
                        <Button onClick={this.searchClick} style={{ marginRight: 2 }} type="primary">
                          <FontAwesomeIcon icon="search" />
                          Tìm kiếm
                        </Button>
                        <Button onClick={this.clearSearchClick}>
                          <FontAwesomeIcon icon="trash" />
                        </Button>
                      </Container>
                    </Row>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.money">Money</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.city">City</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.district">District</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.statusType">Status Type</Translate>
                          </th>
                          <th>
                            <Translate contentKey="landexpApp.house.mobile">Mobile</Translate>
                          </th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {houseList.map((house, i) => (
                          <tr key={`entity-${i}`}>
                            <td>{house.actionType === 'FOR_SELL' ? 'Bán' : 'Cho thuê'}</td>
                            <td>{getLandType(house.landType)}</td>
                            <td>{new Intl.NumberFormat().format(house.money)} VNĐ</td>
                            <td>{house.cityName}</td>
                            <td>{house.districtName}</td>
                            <td>{getSaleType(house.saleType)}</td>
                            {house.statusType === 'PAID' ? (
                              <td style={{ color: 'green' }}>
                                <strong>{getStatusType(house.statusType)}</strong>
                              </td>
                            ) : (
                              <td style={{ color: 'red' }}>
                                <strong>{getStatusType(house.statusType)}</strong>
                              </td>
                            )}
                            <td>{house.mobile}</td>
                            <td className="text-right">
                              <div className="btn-group flex-btn-group-container">
                                <Button onClick={this.gotoView.bind(this, house.id)}>
                                  <FontAwesomeIcon icon="eye" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.view">View</Translate>
                                  </span>
                                </Button>
                                <Button onClick={this.gotoEdit.bind(this, house.id)} type="primary">
                                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                                  <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.edit">Edit</Translate>
                                  </span>
                                </Button>
                                {this.props.isManager && house.statusType !== 'PAID' ? (
                                  <Button onClick={this.showDeleteConfirm.bind(this, house.id)} type="danger">
                                    <FontAwesomeIcon icon="trash" />{' '}
                                    <span className="d-none d-md-inline">
                                      <Translate contentKey="entity.action.delete">Delete</Translate>
                                    </span>
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {this.state.showDelete ? (
                      <Modal
                        title="Bạn có muốn xoá tin đăng này?"
                        visible={this.state.showDelete}
                        okText="Xóa"
                        okType="danger"
                        cancelText="Hủy"
                        onOk={this.handleDeleteOk.bind(this, this.state.houseId)}
                        onCancel={this.handleDeleteCancel}
                      >
                        <p>Hãy xác nhận lại thông tin trước khi thực hiện hành động xoá</p>
                      </Modal>
                    ) : (
                      ''
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
              )}
            </Col>
          </Row>
        </Container>
      </Row>
    );
  }
}

const mapStateToProps = ({ house, authentication }: IRootState) => ({
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  loading: house.loading,
  updating: house.updating,
  houseList: house.entities,
  totalItems: house.totalItems
});

const mapDispatchToProps = {
  getHouses,
  getEntities,
  getItemEntities,
  getStaffEntities,
  deleteEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(House);
