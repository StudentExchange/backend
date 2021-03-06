import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './land-project-photo.reducer';
import { ILandProjectPhoto } from 'app/shared/model/land-project-photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILandProjectPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class LandProjectPhoto extends React.Component<ILandProjectPhotoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { landProjectPhotoList, match } = this.props;
    return (
      <div>
        <h2 id="land-project-photo-heading">
          <Translate contentKey="landexpApp.landProjectPhoto.home.title">Land Project Photos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="landexpApp.landProjectPhoto.home.createLabel">Create new Land Project Photo</Translate>
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
                  <Translate contentKey="landexpApp.landProjectPhoto.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.landProjectPhoto.createAt">Create At</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.landProjectPhoto.landProject">Land Project</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.landProjectPhoto.createBy">Create By</Translate>
                </th>
                <th>
                  <Translate contentKey="landexpApp.landProjectPhoto.updateBy">Update By</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {landProjectPhotoList.map((landProjectPhoto, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${landProjectPhoto.id}`} color="link" size="sm">
                      {landProjectPhoto.id}
                    </Button>
                  </td>
                  <td>
                    {landProjectPhoto.image ? (
                      <div>
                        <a onClick={openFile(landProjectPhoto.imageContentType, landProjectPhoto.image)}>
                          <img
                            src={`data:${landProjectPhoto.imageContentType};base64,${landProjectPhoto.image}`}
                            style={{ maxHeight: '30px' }}
                          />
                          &nbsp;
                        </a>
                        <span>
                          {landProjectPhoto.imageContentType}, {byteSize(landProjectPhoto.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <TextFormat type="date" value={landProjectPhoto.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    {landProjectPhoto.landProjectId ? (
                      <Link to={`land-project/${landProjectPhoto.landProjectId}`}>{landProjectPhoto.landProjectId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{landProjectPhoto.createByLogin ? landProjectPhoto.createByLogin : ''}</td>
                  <td>{landProjectPhoto.updateByLogin ? landProjectPhoto.updateByLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${landProjectPhoto.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${landProjectPhoto.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${landProjectPhoto.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ landProjectPhoto }: IRootState) => ({
  landProjectPhotoList: landProjectPhoto.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandProjectPhoto);
