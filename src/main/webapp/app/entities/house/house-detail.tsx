import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import ReactQuill from 'react-quill';
import { Select, Input, Checkbox } from 'antd';
const Option = Select.Option;

import { getActionType, getLandType, getDirection } from 'app/shared/util/utils';

export interface IHouseDetailUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHouseDetailUpdateState {
  actionType: any;
  landType: any;
  city: any;
  address: any;
  locations: any;
  projectId: number;
  direction: string;
  directionBalcony: string;
  floor: any;
  numberOfFloor: any;
  acreage: any;
  acreageStreetSide: any;
  bedRoom: any;
  bathRoom: any;
  parking: any;
  summary: any;
}

export class HouseDetailUpdate extends React.Component<IHouseDetailUpdateProps, IHouseDetailUpdateState> {
  state: IHouseDetailUpdateState = {
    actionType: undefined,
    landType: undefined,
    city: undefined,
    address: undefined,
    locations: [],
    projectId: undefined,
    direction: undefined,
    directionBalcony: undefined,
    floor: undefined,
    numberOfFloor: undefined,
    acreage: undefined,
    acreageStreetSide: undefined,
    bedRoom: undefined,
    bathRoom: undefined,
    parking: undefined,
    summary: ''
  };

  onChangeCascader = value => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    });
  };

  onChangeAddress = e => {
    this.setState({
      address: e.target.value
    });
    this.props.updateHouse({
      address: e.target.value
    });
  };

  onChangeActionType = value => {
    this.setState({
      actionType: value
    });
    this.props.updateHouse({
      actionType: value
    });
  };

  onChangeLandType = value => {
    this.setState({
      landType: value
    });
    this.props.updateHouse({
      landType: value
    });
  };

  onChangeProject = value => {
    this.setState({
      projectId: value
    });
    this.props.updateHouse({
      projectId: value
    });
  };

  onChangeDirection = value => {
    this.setState({
      direction: value
    });
    this.props.updateHouse({
      direction: value
    });
  };

  onChangeDirectionBalcony = value => {
    this.setState({
      directionBalcony: value
    });
    this.props.updateHouse({
      directionBalcony: value
    });
  };

  onChangeFloor = e => {
    this.setState({
      floor: e.target.value
    });
    this.props.updateHouse({
      floor: e.target.value
    });
  };

  onChangeNumberOfFloor = e => {
    this.setState({
      numberOfFloor: e.target.value
    });
    this.props.updateHouse({
      numberOfFloor: e.target.value
    });
  };

  onChangeAcreage = e => {
    this.setState({
      acreage: e.target.value
    });
    this.props.updateHouse({
      acreage: e.target.value
    });
  };

  onChangeAcreageStreetSide = e => {
    this.setState({
      acreageStreetSide: e.target.value
    });
    this.props.updateHouse({
      acreageStreetSide: e.target.value
    });
  };

  onChangeBedRoom = e => {
    this.setState({
      bedRoom: e.target.value
    });
    this.props.updateHouse({
      bedRoom: e.target.value
    });
  };

  onChangeBathRoom = e => {
    this.setState({
      bathRoom: e.target.value
    });
    this.props.updateHouse({
      bathRoom: e.target.value
    });
  };

  onChangeParking = e => {
    this.setState({
      parking: e.target.checked
    });
    this.props.updateHouse({
      parking: e.target.checked
    });
  };

  onChangeSummary = value => {
    this.setState({
      summary: value
    });
    this.props.updateHouse({
      summary: value
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 20
      }
    };

    const { houseEntity, landProjects } = this.props;

    return (
      <>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="actionTypeLabel">
              <Translate contentKey="landexpApp.house.actionType">Action Type</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              defaultValue={houseEntity.actionType}
              placeholder="Hình thức"
              onChange={this.onChangeActionType}
            >
              <Option value="FOR_SELL">{getActionType('FOR_SELL')}</Option>
              <Option value="FOR_RENT">{getActionType('FOR_RENT')}</Option>
            </Select>
          </Col>
          <Col md="6">
            <Label id="landTypeLabel">
              <Translate contentKey="landexpApp.house.landType">Land Type</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              defaultValue={houseEntity.landType}
              placeholder="Loại hình bất động sản"
              onChange={this.onChangeLandType}
            >
              <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
              <Option value="PEN_HOUSE">{getLandType('PEN_HOUSE')}</Option>
              <Option value="HOME">{getLandType('HOME')}</Option>
              <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
              <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
              <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
              <Option value="OFFICE">{getLandType('OFFICE')}</Option>
              <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
              <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
              <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
              <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
              <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
              <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
              <Option value="OTHER">{getLandType('OTHER')}</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="projectLabel" for="project">
              <Translate contentKey="landexpApp.house.project">Project</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              defaultValue={houseEntity.projectId}
              placeholder="Danh sách dự án"
              onChange={this.onChangeProject}
            >
              {landProjects
                ? landProjects.map(otherEntity => (
                    <Option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.name}
                    </Option>
                  ))
                : null}
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="acreageLabel" for="acreage">
              <Translate contentKey="landexpApp.house.acreage">Acreage</Translate>
            </Label>
            <Input defaultValue={houseEntity.acreage} onChange={this.onChangeAcreage} />
          </Col>
          <Col md="6">
            <Label id="acreageStreetSideLabel" for="acreageStreetSide">
              <Translate contentKey="landexpApp.house.acreageStreetSide">Acreage Street Side</Translate>
            </Label>
            <Input defaultValue={houseEntity.acreageStreetSide} onChange={this.onChangeAcreageStreetSide} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="directionLabel">
              <Translate contentKey="landexpApp.house.direction">Direction</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              defaultValue={houseEntity.direction || 'NORTH'}
              placeholder="Hướng nhà"
              onChange={this.onChangeDirection}
            >
              <Option value="NORTH">{getDirection('NORTH')}</Option>
              <Option value="SOUTH">{getDirection('SOUTH')}</Option>
              <Option value="EAST">{getDirection('EAST')}</Option>
              <Option value="WEST">{getDirection('WEST')}</Option>
              <Option value="EAST_NORTH">{getDirection('EAST_NORTH')}</Option>
              <Option value="WEST_NORTH">{getDirection('WEST_NORTH')}</Option>
              <Option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</Option>
              <Option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</Option>
            </Select>
          </Col>
          <Col md="6">
            <Label id="directionBalconyLabel">
              <Translate contentKey="landexpApp.house.directionBalcony">Direction Balcony</Translate>
            </Label>
            <Select
              style={{ width: '100%' }}
              defaultValue={houseEntity.directionBalcony || 'NORTH'}
              placeholder="Hướng nhà"
              onChange={this.onChangeDirectionBalcony}
            >
              <Option value="NORTH">{getDirection('NORTH')}</Option>
              <Option value="SOUTH">{getDirection('SOUTH')}</Option>
              <Option value="EAST">{getDirection('EAST')}</Option>
              <Option value="WEST">{getDirection('WEST')}</Option>
              <Option value="EAST_NORTH">{getDirection('EAST_NORTH')}</Option>
              <Option value="WEST_NORTH">{getDirection('WEST_NORTH')}</Option>
              <Option value="EAST_SOUTH">{getDirection('EAST_SOUTH')}</Option>
              <Option value="WEST_SOUTH">{getDirection('WEST_SOUTH')}</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="numberOfFloorLabel" for="numberOfFloor">
              <Translate contentKey="landexpApp.house.floor">Floor</Translate>
            </Label>
            <Input defaultValue={houseEntity.floor} onChange={this.onChangeFloor} />
          </Col>
          <Col md="6">
            <Label id="numberOfFloorLabel" for="numberOfFloor">
              <Translate contentKey="landexpApp.house.numberOfFloor">Number Of Floor</Translate>
            </Label>
            <Input defaultValue={houseEntity.numberOfFloor} type="number" onChange={this.onChangeNumberOfFloor} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="6">
            <Label id="bathRoomLabel" for="bathRoom">
              <Translate contentKey="landexpApp.house.bathRoom">Bath Room</Translate>
            </Label>
            <Input defaultValue={houseEntity.bathRoom} type="number" onChange={this.onChangeBedRoom} />
          </Col>
          <Col md="6">
            <Label id="bedRoomLabel" for="bedRoom">
              <Translate contentKey="landexpApp.house.bedRoom">Bed Room</Translate>
            </Label>
            <Input defaultValue={houseEntity.bedRoom} type="number" onChange={this.onChangeBathRoom} />
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="12">
            <Checkbox onChange={this.onChangeParking}>
              <Translate contentKey="landexpApp.house.parking">Parking</Translate>
            </Checkbox>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md="12">
            <Label id="summaryLabel" for="summary">
              <Translate contentKey="landexpApp.house.summary">Summary</Translate>
            </Label>
            <ReactQuill
              bounds={'.app-editor'}
              defaultValue={this.state.summary || houseEntity.summary || ''}
              onChange={this.onChangeSummary}
              placeholder="Tóm tắt bản tin"
            />
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities,
  landProjects: storeState.landProject.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseDetailUpdate);
