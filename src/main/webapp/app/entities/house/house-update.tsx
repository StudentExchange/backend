import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Container } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Card } from 'antd';
const TabPane = Tabs.TabPane;

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getEntities as getLandProjects } from 'app/entities/land-project/land-project.reducer';
import { getEntity, updateEntity } from './house.reducer';
import { getImageOfHouse, createEntity as createPhoto } from 'app/entities/house-photo/house-photo.reducer';
import { getAllEntities as getCities } from 'app/entities/city/city.reducer';

import Loading from 'app/shared/layout/loading/loading';
import SearchPage from 'app/shared/layout/search/search-menu';
import HouseDetail from './house-detail';
import HouseAddress from './house-address';
import HousePrice from './house-price';
import HouseInfoUpdate from './house-info';
import HousePhotoUpdate from './house-photo';

export interface IHouseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IHouseUpdateState {
  house: any;
}

export class HouseUpdate extends React.Component<IHouseUpdateProps, IHouseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      house: {}
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getImageOfHouse(this.props.match.params.id);
    this.props.getLandProjects();
    this.props.getCities();
  }

  updateHouse = house => {
    const nextHouse = { ...this.state.house, ...house };
    this.setState({
      house: nextHouse
    });
  };

  saveEntity = () => {
    const { houseEntity } = this.props;
    const entity = {
      ...houseEntity,
      ...this.state.house
    };
    this.props.updateEntity(entity);
    if (entity.fileList) {
      entity.fileList.map(file => {
        if (file.photoId) {
          // this.props.updatePhoto({ id: file.photoId, image: realData, imageContentType: file.type, houseId: this.props.house.id });
        } else {
          const imageURL = file.thumbUrl;
          const block = imageURL.split(';');
          const realData = block[1].split(',')[1];
          this.props.createPhoto({ image: realData, imageContentType: file.type, houseId: houseEntity.id });
        }
      });
    }
    this.handleClose();
  };

  handleClose = () => {
    this.props.history.push('/quan-ly/tin-dang');
  };

  render() {
    const isInvalid = false;
    const { houseEntity, loading, updating } = this.props;

    const entity = {
      ...houseEntity,
      ...this.state.house
    };

    return (
      <div>
        <Sidebar activeMenu="manager-management" activeSubMenu="district" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <Row>
            <Card title="Thông tin chi tiết về ngôi nhà">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Đặc điểm" key="1">
                  <HouseDetail updateHouse={this.updateHouse} houseEntity={entity} />
                </TabPane>
                <TabPane tab="Giá" key="2">
                  <HousePrice updateHouse={this.updateHouse} houseEntity={entity} />
                </TabPane>
                <TabPane tab="Địa chỉ" key="3">
                  <HouseAddress updateHouse={this.updateHouse} houseEntity={entity} />
                </TabPane>
                <TabPane tab="Hình ảnh" key="4">
                  <HousePhotoUpdate updateHouse={this.updateHouse} houseEntity={entity} />
                </TabPane>
                <TabPane tab="Liên hệ" key="5">
                  <HouseInfoUpdate updateHouse={this.updateHouse} houseEntity={entity} />
                </TabPane>
              </Tabs>
              <Row className="justify-content-center">
                <Col md="12">
                  <Col md="12">
                    <Button tag={Link} id="cancel-save" to="/quan-ly/tin-dang" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.back">Back</Translate>
                      </span>
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" onClick={this.saveEntity} disabled={isInvalid || updating}>
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </Col>
                </Col>
              </Row>
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  houseEntity: storeState.house.entity,
  loading: storeState.house.loadingDetail,
  updating: storeState.house.updating
});

const mapDispatchToProps = {
  getImageOfHouse,
  getLandProjects,
  getEntity,
  updateEntity,
  createPhoto,
  getCities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseUpdate);
