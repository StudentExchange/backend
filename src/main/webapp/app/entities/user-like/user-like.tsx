import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './user-like.reducer';
import { IUserLike } from 'app/shared/model/user-like.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserLikeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class UserLike extends React.Component<IUserLikeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { userLikeList, match } = this.props;
    return (
      <div>
        <h2 id="user-like-heading">
          <Translate contentKey="studentexchangeApp.userLike.home.title">User Likes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="studentexchangeApp.userLike.home.createLabel">Create new User Like</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.userLike.createAt">Create At</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.userLike.house">House</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.userLike.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userLikeList.map((userLike, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${userLike.id}`} color="link" size="sm">
                      {userLike.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={userLike.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{userLike.houseId ? <Link to={`house/${userLike.houseId}`}>{userLike.houseId}</Link> : ''}</td>
                  <td>{userLike.userLogin ? userLike.userLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userLike.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userLike.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userLike.id}/delete`} color="danger" size="sm">
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
      </div>
    );
  }
}

const mapStateToProps = ({ userLike }: IRootState) => ({
  userLikeList: userLike.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLike);