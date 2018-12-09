import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  getPaginationItemsNumber,
  JhiPagination
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './land-project.reducer';
import { ILandProject } from 'app/shared/model/land-project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILandProjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ILandProjectState = IPaginationBaseState;

export class LandProject extends React.Component<ILandProjectProps, ILandProjectState> {
  state: ILandProjectState = {
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
    const { landProjectList, match, totalItems } = this.props;
    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="project" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2 id="land-project-heading">
            <Translate contentKey="studentexchangeApp.landProject.home.title">Land Projects</Translate>
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="studentexchangeApp.landProject.home.createLabel">Create new Land Project</Translate>
            </Link>
          </h2>
          <div className="table-responsive">
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('name')}>
                    <Translate contentKey="studentexchangeApp.landProject.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('image')}>
                    <Translate contentKey="studentexchangeApp.landProject.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="studentexchangeApp.landProject.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="studentexchangeApp.landProject.district">District</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="studentexchangeApp.landProject.ward">Ward</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="studentexchangeApp.landProject.createBy">Create By</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="studentexchangeApp.landProject.updateBy">Update By</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {landProjectList.map((landProject, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${landProject.id}`} color="link" size="sm">
                        {landProject.id}
                      </Button>
                    </td>
                    <td>{landProject.name}</td>
                    <td>
                      {landProject.image ? (
                        <div>
                          <a onClick={openFile(landProject.imageContentType, landProject.image)}>
                            <img src={`data:${landProject.imageContentType};base64,${landProject.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {landProject.imageContentType}, {byteSize(landProject.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{landProject.cityName ? <Link to={`city/${landProject.cityId}`}>{landProject.cityName}</Link> : ''}</td>
                    <td>
                      {landProject.districtName ? <Link to={`district/${landProject.districtId}`}>{landProject.districtName}</Link> : ''}
                    </td>
                    <td>{landProject.wardName ? <Link to={`ward/${landProject.wardId}`}>{landProject.wardName}</Link> : ''}</td>
                    <td>{landProject.createByLogin ? landProject.createByLogin : ''}</td>
                    <td>{landProject.updateByLogin ? landProject.updateByLogin : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${landProject.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${landProject.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${landProject.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
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
              maxButtons={5}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ landProject }: IRootState) => ({
  landProjectList: landProject.entities,
  totalItems: landProject.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandProject);
