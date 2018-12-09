import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './land-project-photo.reducer';
import { ILandProjectPhoto } from 'app/shared/model/land-project-photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILandProjectPhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LandProjectPhotoDetail extends React.Component<ILandProjectPhotoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { landProjectPhotoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="studentexchangeApp.landProjectPhoto.detail.title">LandProjectPhoto</Translate> [
            <b>{landProjectPhotoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="image">
                <Translate contentKey="studentexchangeApp.landProjectPhoto.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {landProjectPhotoEntity.image ? (
                <div>
                  <a onClick={openFile(landProjectPhotoEntity.imageContentType, landProjectPhotoEntity.image)}>
                    <img
                      src={`data:${landProjectPhotoEntity.imageContentType};base64,${landProjectPhotoEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {landProjectPhotoEntity.imageContentType}, {byteSize(landProjectPhotoEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.landProjectPhoto.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={landProjectPhotoEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProjectPhoto.landProject">Land Project</Translate>
            </dt>
            <dd>{landProjectPhotoEntity.landProjectId ? landProjectPhotoEntity.landProjectId : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProjectPhoto.createBy">Create By</Translate>
            </dt>
            <dd>{landProjectPhotoEntity.createByLogin ? landProjectPhotoEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProjectPhoto.updateBy">Update By</Translate>
            </dt>
            <dd>{landProjectPhotoEntity.updateByLogin ? landProjectPhotoEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/land-project-photo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/land-project-photo/${landProjectPhotoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ landProjectPhoto }: IRootState) => ({
  landProjectPhotoEntity: landProjectPhoto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandProjectPhotoDetail);
