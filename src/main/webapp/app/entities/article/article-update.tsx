import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IArticleUpdateState {
  isNew: boolean;
  categoryId: string;
  createById: string;
  updateById: string;
}

export class ArticleUpdate extends React.Component<IArticleUpdateProps, IArticleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '0',
      createById: '0',
      updateById: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategories();
    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { articleEntity } = this.props;
      const entity = {
        ...articleEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/article');
  };

  render() {
    const { articleEntity, categories, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avatar, avatarContentType } = articleEntity;

    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="project" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="studentexchangeApp.article.home.createOrEditLabel">
                <Translate contentKey="studentexchangeApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <AvForm model={isNew ? {} : articleEntity} onSubmit={this.saveEntity}>
                  {!isNew ? (
                    <AvGroup>
                      <Label for="id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <AvGroup>
                      <Label id="avatarLabel" for="avatar">
                        <Translate contentKey="studentexchangeApp.article.avatar">Avatar</Translate>
                      </Label>
                      <br />
                      {avatar ? (
                        <div>
                          <a onClick={openFile(avatarContentType, avatar)}>
                            <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
                          </a>
                          <br />
                          <Row>
                            <Col md="11">
                              <span>
                                {avatarContentType}, {byteSize(avatar)}
                              </span>
                            </Col>
                            <Col md="1">
                              <Button color="danger" onClick={this.clearBlob('avatar')}>
                                <FontAwesomeIcon icon="times-circle" />
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      ) : null}
                      <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
                      <AvInput type="hidden" name="avatar" value={avatar} />
                    </AvGroup>
                  </AvGroup>
                  <AvGroup>
                    <Label id="titleLabel" for="title">
                      <Translate contentKey="studentexchangeApp.article.title">Title</Translate>
                    </Label>
                    <AvField id="article-title" type="text" name="title" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="summaryLabel" for="summary">
                      <Translate contentKey="studentexchangeApp.article.summary">Summary</Translate>
                    </Label>
                    <AvField id="article-summary" type="text" name="summary" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="contentLabel" for="content">
                      <Translate contentKey="studentexchangeApp.article.content">Content</Translate>
                    </Label>
                    <AvField id="article-content" type="text" name="content" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="statusTypeLabel">
                      <Translate contentKey="studentexchangeApp.article.statusType">Status Type</Translate>
                    </Label>
                    <AvInput
                      id="article-statusType"
                      type="select"
                      className="form-control"
                      name="statusType"
                      value={(!isNew && articleEntity.statusType) || 'OPEN'}
                    >
                      <option value="OPEN">
                        <Translate contentKey="studentexchangeApp.StatusType.OPEN" />
                      </option>
                      <option value="PENDING">
                        <Translate contentKey="studentexchangeApp.StatusType.PENDING" />
                      </option>
                      <option value="PAID">
                        <Translate contentKey="studentexchangeApp.StatusType.PAID" />
                      </option>
                      <option value="CANCELED">
                        <Translate contentKey="studentexchangeApp.StatusType.CANCELED" />
                      </option>
                      <option value="EXPIRED">
                        <Translate contentKey="studentexchangeApp.StatusType.EXPIRED" />
                      </option>
                      <option value="SOLD">
                        <Translate contentKey="studentexchangeApp.StatusType.SOLD" />
                      </option>
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label id="hitsLabel" for="hits">
                      <Translate contentKey="studentexchangeApp.article.hits">Hits</Translate>
                    </Label>
                    <AvField id="article-hits" type="string" className="form-control" name="hits" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="createAtLabel" for="createAt">
                      <Translate contentKey="studentexchangeApp.article.createAt">Create At</Translate>
                    </Label>
                    <AvField id="article-createAt" type="date" className="form-control" name="createAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label id="updateAtLabel" for="updateAt">
                      <Translate contentKey="studentexchangeApp.article.updateAt">Update At</Translate>
                    </Label>
                    <AvField id="article-updateAt" type="date" className="form-control" name="updateAt" />
                  </AvGroup>
                  <AvGroup>
                    <Label for="category.name">
                      <Translate contentKey="studentexchangeApp.article.category">Category</Translate>
                    </Label>
                    <AvInput id="article-category" type="select" className="form-control" name="categoryId">
                      <option value="" key="0" />
                      {categories
                        ? categories.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="createBy.login">
                      <Translate contentKey="studentexchangeApp.article.createBy">Create By</Translate>
                    </Label>
                    <AvInput id="article-createBy" type="select" className="form-control" name="createById">
                      <option value="" key="0" />
                      {users
                        ? users.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.login}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <AvGroup>
                    <Label for="updateBy.login">
                      <Translate contentKey="studentexchangeApp.article.updateBy">Update By</Translate>
                    </Label>
                    <AvInput id="article-updateBy" type="select" className="form-control" name="updateById">
                      <option value="" key="0" />
                      {users
                        ? users.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.login}
                            </option>
                          ))
                        : null}
                    </AvInput>
                  </AvGroup>
                  <Button tag={Link} id="cancel-save" to="/entity/article" replace color="info">
                    <FontAwesomeIcon icon="arrow-left" />
                    &nbsp;
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.back">Back</Translate>
                    </span>
                  </Button>
                  &nbsp;
                  <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                </AvForm>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  users: storeState.userManagement.users,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess
});

const mapDispatchToProps = {
  getCategories,
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleUpdate);
