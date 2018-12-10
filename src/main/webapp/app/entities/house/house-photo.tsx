import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Label } from 'reactstrap';
import { Translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Upload, Modal, Icon } from 'antd';

import { SERVER_API_URL } from 'app/config/constants';
import { setBlob } from './house.reducer';
import { encodeId } from 'app/shared/util/utils';
import { deleteEntity } from 'app/entities/house-photo/house-photo.reducer';

export interface IHousePhotoUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHousePhotoUpdateState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any;
}

export class HousePhotoUpdate extends React.Component<IHousePhotoUpdateProps, IHousePhotoUpdateState> {
  state: IHousePhotoUpdateState = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  componentDidMount() {
    this.mappingPhoto();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.housePhotoList !== prevProps.housePhotoList) {
      this.mappingPhoto();
    }
  }

  mappingPhoto() {
    const fileList = [];
    this.props.housePhotoList.map(photo => {
      const thumbUrl = `${SERVER_API_URL}/api/house-photos/${encodeId(photo.id)}/contents/${this.props.houseEntity.link}-${encodeId(
        photo.id
      )}.jpg`;
      fileList.push({
        uid: photo.id,
        photoId: photo.id,
        thumbUrl
        // thumbUrl: 'data:image/jpeg;base64,' + photo.image,
        // type: photo.imageContentType
      });
    });
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(undefined, undefined, undefined);
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false
    });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleRemove = file => {
    if (file.photoId) {
      this.props.deleteEntity(file.photoId);
    }
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    this.props.updateHouse({ fileList });
  };

  render() {
    const { houseEntity } = this.props;
    const { avatar, avatarContentType } = houseEntity;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Chọn hình ảnh giới thiệu nhà của bạn</div>
      </div>
    );
    return (
      <>
        <Col md="12" style={{ marginBottom: 20 }}>
          <Label id="avatarLabel" for="avatar">
            <Translate contentKey="landexpApp.house.avatar">Avatar</Translate>
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
        <Col md="12">
          <Upload
            listType="picture-card"
            fileList={fileList}
            multiple
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
          >
            {fileList.length >= 6 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  housePhotoList: storeState.housePhoto.entities
});

const mapDispatchToProps = { setBlob, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousePhotoUpdate);
