import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './house-photo.reducer';
import { IHousePhoto } from 'app/shared/model/house-photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHousePhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HousePhotoDetail extends React.Component<IHousePhotoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { housePhotoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="studentexchangeApp.housePhoto.detail.title">HousePhoto</Translate> [<b>{housePhotoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="image">
                <Translate contentKey="studentexchangeApp.housePhoto.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {housePhotoEntity.image ? (
                <div>
                  <a onClick={openFile(housePhotoEntity.imageContentType, housePhotoEntity.image)}>
                    <img src={`data:${housePhotoEntity.imageContentType};base64,${housePhotoEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {housePhotoEntity.imageContentType}, {byteSize(housePhotoEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="mobileLink">
                <Translate contentKey="studentexchangeApp.housePhoto.mobileLink">Mobile Link</Translate>
              </span>
            </dt>
            <dd>{housePhotoEntity.mobileLink}</dd>
            <dt>
              <span id="webLink">
                <Translate contentKey="studentexchangeApp.housePhoto.webLink">Web Link</Translate>
              </span>
            </dt>
            <dd>{housePhotoEntity.webLink}</dd>
            <dt>
              <span id="enabled">
                <Translate contentKey="studentexchangeApp.housePhoto.enabled">Enabled</Translate>
              </span>
            </dt>
            <dd>{housePhotoEntity.enabled ? 'true' : 'false'}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.housePhoto.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={housePhotoEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.housePhoto.house">House</Translate>
            </dt>
            <dd>{housePhotoEntity.houseId ? housePhotoEntity.houseId : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.housePhoto.createBy">Create By</Translate>
            </dt>
            <dd>{housePhotoEntity.createByLogin ? housePhotoEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.housePhoto.updateBy">Update By</Translate>
            </dt>
            <dd>{housePhotoEntity.updateByLogin ? housePhotoEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/house-photo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/house-photo/${housePhotoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ housePhoto }: IRootState) => ({
  housePhotoEntity: housePhoto.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousePhotoDetail);
