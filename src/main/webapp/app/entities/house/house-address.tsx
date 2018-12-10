import React from 'react';
import { connect } from 'react-redux';
import { Col, Label } from 'reactstrap';
import { Input, Cascader } from 'antd';

import { getEntity as getWard } from 'app/entities/ward/ward.reducer';

import GoogleMaps from 'app/shared/util/google-maps';

export interface IHouseAddressUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHouseAddressUpdateState {
  city: any;
  address: any;
  locations: any;
  wardEntity: any;
  currentPosition: any;
  wards: any;
}

export class HouseAddressUpdate extends React.Component<IHouseAddressUpdateProps, IHouseAddressUpdateState> {
  state: IHouseAddressUpdateState = {
    city: undefined,
    address: undefined,
    locations: [],
    wardEntity: undefined,
    currentPosition: undefined,
    wards: []
  };

  componentDidMount() {
    this.mappingCity();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.wardEntity !== prevProps.wardEntity) {
      const { latitude, longitude } = this.props.wardEntity;
      const currentPosition = {
        latitude,
        longitude
      };
      this.setState({
        currentPosition
      });
    }
  }

  mappingCity() {
    const locations = [];
    this.props.cities.map(city => {
      const cityData = {
        value: city.id,
        label: city.name,
        children: []
      };
      city.districts.map(district => {
        const districtData = {
          value: district.id,
          label: district.type + ' ' + district.name,
          children: []
        };
        district.wards.map(ward => {
          const wardData = {
            value: ward.id,
            label: ward.type + ' ' + ward.name,
            latitude: ward.latitude,
            longitude: ward.longitude
          };
          if (this.props.houseEntity.wardId === ward.id) {
            const { latitude, longitude } = this.props.houseEntity;
            const currentPosition = {
              latitude: latitude ? latitude : ward.latitude,
              longitude: longitude ? longitude : ward.longitude
            };
            this.setState({
              currentPosition
            });
          }
          districtData.children.push(wardData);
        });
        this.setState({
          wards: district.wards
        });
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations
    });
  }

  onChangeCascader = value => {
    this.setState({
      city: value
    });
    this.props.updateHouse({
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    });
    this.props.getWard(value[2]);
  };

  onChangeAddress = e => {
    this.setState({
      address: e.target.value
    });
    this.props.updateHouse({
      address: e.target.value
    });
  };

  updateMarkerPosition = position => {
    this.props.updateHouse(position);
  };

  render() {
    const defaultValue = [this.props.houseEntity.cityId, this.props.houseEntity.districtId, this.props.houseEntity.wardId];
    return (
      <>
        <h3 className="text-center">Vị trí bất động sản của bạn?</h3>
        <Col md="12" style={{ marginBottom: 20 }}>
          <Label>Thành phố</Label>
          <Cascader
            style={{ width: '100%' }}
            defaultValue={this.state.city || defaultValue}
            options={this.state.locations}
            onChange={this.onChangeCascader}
            placeholder="Chọn thành phố"
          />
        </Col>
        <Col md="12" style={{ marginBottom: 20 }}>
          <Label>Địa chỉ</Label>
          <Input
            placeholder="Số nhà, ngõ, ngách, phố"
            value={this.state.address || this.props.houseEntity.address}
            onChange={this.onChangeAddress}
          />
        </Col>
        <Col md="12" style={{ marginBottom: 20 }}>
          <GoogleMaps isMarkerDraggable updateMarkerPosition={this.updateMarkerPosition} currentPosition={this.state.currentPosition} />
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities,
  wardEntity: storeState.ward.entity
});

const mapDispatchToProps = { getWard };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseAddressUpdate);
