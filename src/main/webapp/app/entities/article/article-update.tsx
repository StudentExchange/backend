import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container, Label } from 'reactstrap';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactQuill from 'react-quill';
import { Select, Input, Card } from 'antd';
const Option = Select.Option;

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';
import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';

import { IRootState } from 'app/shared/reducers';

import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: any }> {}

export interface IArticleUpdateState {
  isNew: boolean;
  categoryId: number;
  createById: number;
  updateById: number;
  title: any;
  summary: any;
  content: any;
  statusType: any;
}

export class ArticleUpdate extends React.Component<IArticleUpdateProps, IArticleUpdateState> {
  /*
   * Quill modules to attach to editor
   * See https://quilljs.com/docs/modules/ for complete options
   */
  modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  };

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      createById: null,
      updateById: null,
      title: null,
      summary: null,
      content: null,
      statusType: 'OPEN',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    this.props.reset();
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategories();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = () => {
    const { articleEntity } = this.props;
    const entity = {
      ...articleEntity,
      summary: this.state.summary || this.props.articleEntity.summary,
      content: this.state.content || this.props.articleEntity.content,
      title: this.state.title || this.props.articleEntity.title,
      statusType: this.state.statusType,
      categoryId: this.state.categoryId || this.props.articleEntity.categoryId
    };
    if (this.state.isNew) {
      this.props.createEntity(entity);
    } else {
      this.props.updateEntity(entity);
    }
    this.handleClose();
  };

  handleClose = () => {
    this.props.history.push('/entity/article');
  };

  onChangeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  onChangeSummary = value => {
    this.setState({
      summary: value
    });
  };

  onChangeContent = value => {
    this.setState({
      content: value
    });
  };

  onChangeStatusType = value => {
    this.setState({
      statusType: value
    });
  };

  onChangeCategory = value => {
    this.setState({
      categoryId: value
    });
  };

  render() {
    const isInvalid = false;
    const { articleEntity, categories, loading, updating } = this.props;
    const { isNew } = this.state;
    const { avatar, avatarContentType } = articleEntity;

    return (
      <div>
        <Sidebar activeMenu="staff-management" activeSubMenu="article" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row className="justify-content-center">
            <Col md="8">
              <h2 id="landexpApp.article.home.createOrEditLabel">
                <Translate contentKey="landexpApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
              </h2>
            </Col>
          </Row>
          <Row>
            <Card title="Nội dung tin tức">
              <Col md="12" style={{ marginBottom: 20 }}>
                <Label id="avatarLabel" for="avatar">
                  <Translate contentKey="landexpApp.article.avatar">Avatar</Translate>
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
                          <FontAwesomeIcon icon="trash" />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <input id="file_avatar" type="file" onChange={this.onBlobChange(true, 'avatar')} accept="image/*" />
              </Col>
              <Col md="12" style={{ marginBottom: 20 }}>
                <Input
                  addonBefore="Tiêu đề bản tin"
                  defaultValue={this.state.title || this.props.articleEntity.title}
                  onChange={this.onChangeTitle}
                />
              </Col>
              <Col md="12" style={{ marginBottom: 20 }}>
                <Label id="statusTypeLabel" for="statusType">
                  <Translate contentKey="landexpApp.article.statusType">StatusType</Translate>
                </Label>
                <Select
                  style={{ width: '100%' }}
                  value={this.state.statusType || 'OPEN'}
                  placeholder="Trạng thái tin"
                  onChange={this.onChangeStatusType}
                >
                  <Option value="OPEN">Chờ xét duyệt</Option>
                  <Option value="PAID">Duyệt luôn</Option>
                </Select>
              </Col>
              <Col md="12" style={{ marginBottom: 20 }}>
                <Label id="categoryLabel" for="category">
                  <Translate contentKey="landexpApp.article.category">Category</Translate>
                </Label>
                <Select
                  style={{ width: '100%' }}
                  defaultValue={this.state.categoryId || this.props.articleEntity.categoryId}
                  placeholder="Danh mục tin tức"
                  onChange={this.onChangeCategory}
                >
                  {categories
                    ? categories.map(otherEntity => (
                        <Option value={otherEntity.id} key={`${otherEntity.id}`}>
                          {otherEntity.name}
                        </Option>
                      ))
                    : null}
                </Select>
              </Col>
              <Col md="12" className="app-editor" style={{ marginBottom: 20 }}>
                <Label id="summaryLabel" for="summary">
                  <Translate contentKey="landexpApp.article.summary">Summary</Translate>
                </Label>
                <ReactQuill
                  bounds={'.app-editor'}
                  defaultValue={this.state.summary || this.props.articleEntity.summary || ''}
                  onChange={this.onChangeSummary}
                  placeholder="Tóm tắt bản tin"
                />
              </Col>
              <Col md="12" className="content-editor" style={{ marginBottom: 20 }}>
                <Label id="contentLabel" for="content">
                  <Translate contentKey="landexpApp.article.content">Content</Translate>
                </Label>
                <ReactQuill
                  defaultValue={this.state.content || this.props.articleEntity.content || ''}
                  theme="snow"
                  bounds={'.content-editor'}
                  modules={this.modules}
                  formats={this.formats}
                  onChange={this.onChangeContent}
                  placeholder="Chi tiết bản tin"
                />
              </Col>
              <Col md="12">
                <Button tag={Link} id="cancel-save" to="/quan-ly/tin-tuc" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>{' '}
                <Button color="primary" id="save-entity" disabled={isInvalid || updating} onClick={this.saveEntity}>
                  <FontAwesomeIcon icon="save" /> <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </Col>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating
});

const mapDispatchToProps = {
  getCategories,
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
