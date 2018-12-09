import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './land-project.reducer';
import { ILandProject } from 'app/shared/model/land-project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILandProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LandProjectDetail extends React.Component<ILandProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { landProjectEntity } = this.props;
    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="project" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <h2>
            <Translate contentKey="studentexchangeApp.landProject.detail.title">LandProject</Translate> [<b>{landProjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="studentexchangeApp.landProject.name">Name</Translate>
              </span>
            </dt>
            <dd>{landProjectEntity.name}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="studentexchangeApp.landProject.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {landProjectEntity.image ? (
                <div>
                  <a onClick={openFile(landProjectEntity.imageContentType, landProjectEntity.image)}>
                    <img
                      src={`data:${landProjectEntity.imageContentType};base64,${landProjectEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {landProjectEntity.imageContentType}, {byteSize(landProjectEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProject.city">City</Translate>
            </dt>
            <dd>{landProjectEntity.cityName ? landProjectEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProject.district">District</Translate>
            </dt>
            <dd>{landProjectEntity.districtName ? landProjectEntity.districtName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProject.ward">Ward</Translate>
            </dt>
            <dd>{landProjectEntity.wardName ? landProjectEntity.wardName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProject.createBy">Create By</Translate>
            </dt>
            <dd>{landProjectEntity.createByLogin ? landProjectEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.landProject.updateBy">Update By</Translate>
            </dt>
            <dd>{landProjectEntity.updateByLogin ? landProjectEntity.updateByLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/land-project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/land-project/${landProjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ landProject }: IRootState) => ({
  landProjectEntity: landProject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandProjectDetail);
