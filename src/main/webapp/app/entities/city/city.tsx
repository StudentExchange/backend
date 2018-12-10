import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Icon } from 'antd';
import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICityState = IPaginationBaseState;

export class City extends React.Component<ICityProps, ICityState> {
  state: ICityState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cityList, match, totalItems } = this.props;
    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="city" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2 id="city-heading">
            <Translate contentKey="landexpApp.city.home.title">Cities</Translate>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="landexpApp.city.home.createLabel">Create new City</Translate>
            </Link>
          </h2>
          <Row>
            <Card title="Danh sách tỉnh thành">
              <div className="table-responsive">
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="hand" onClick={this.sort('name')}>
                        <Translate contentKey="landexpApp.city.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('index')}>
                        <Translate contentKey="landexpApp.city.index">Index</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('enabled')}>
                        <Translate contentKey="landexpApp.city.enabled">Enabled</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cityList.map((city, i) => (
                      <tr key={`entity-${i}`}>
                        <td>{city.name}</td>
                        <td>{city.index}</td>
                        <td>
                          {city.enabled ? (
                            <Icon type="check-square" style={{ color: 'green' }} />
                          ) : (
                            <Icon type="close-square" style={{ color: 'red' }} />
                          )}
                        </td>
                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
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
              </div>
              <Row className="justify-content-center">
                <JhiPagination
                  items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={3}
                />
              </Row>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities,
  totalItems: city.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
