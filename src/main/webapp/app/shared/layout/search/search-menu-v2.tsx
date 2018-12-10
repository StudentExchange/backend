import './search-menu-v2.css';

import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Col, Select, Button, Cascader } from 'antd';
const Option = Select.Option;

import { getAllEntities as getCities } from 'app/entities/city/city.reducer';
import { getLandType, queryString } from 'app/shared/util/utils';

export interface ISearchPageProp extends StateProps, DispatchProps {
  location: any;
  history: any;
}

export interface ISearchPageState {
  city: any;
  parameters: any;
  locations: any;
}

export class SearchPage extends React.Component<ISearchPageProp> {
  state: ISearchPageState = {
    city: null,
    parameters: {},
    locations: []
  };

  componentDidMount() {
    if (this.props.cities.length === 0) {
      this.props.getCities();
    } else {
      this.mappingCity();
    }
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      if (parsed) {
        /* tslint:disable-next-line */
        const city = parsed.cityId ? [parseInt(parsed.cityId), parseInt(parsed.districtId), parseInt(parsed.wardId)] : null;
        this.setState({
          parameters: parsed,
          city
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.cities !== prevProps.cities) {
      this.mappingCity();
    }
  }

  mappingCity() {
    const locations = []; // this.state.locations;
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
            label: ward.type + ' ' + ward.name
          };
          districtData.children.push(wardData);
        });
        cityData.children.push(districtData);
      });
      locations.push(cityData);
    });
    this.setState({
      locations
    });
  }

  handleChangeActionType = () => {};

  menuTypeClick = value => {
    const parameters = { actionType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  actionTypeForm() {
    return (
      <Select style={{ width: 110 }} value={this.state.parameters.actionType} placeholder="Hình thức" onChange={this.menuTypeClick}>
        <Option value="FOR_SELL">Bán</Option>
        <Option value="FOR_RENT">Cho thuê</Option>
      </Select>
    );
  }

  menuLandTypeClick = value => {
    const parameters = { landType: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  landTypeForm() {
    return (
      <Select
        style={{ width: 180 }}
        value={this.state.parameters.landType}
        placeholder="Loại bất động sản"
        onChange={this.menuLandTypeClick}
      >
        <Option value="APARTMENT">{getLandType('APARTMENT')}</Option>
        <Option value="HOME">{getLandType('HOME')}</Option>
        <Option value="HOME_VILLA">{getLandType('HOME_VILLA')}</Option>
        <Option value="HOME_STREET_SIDE">{getLandType('HOME_STREET_SIDE')}</Option>
        <Option value="LAND_SCAPE">{getLandType('LAND_SCAPE')}</Option>
        <Option value="LAND_OF_PROJECT">{getLandType('LAND_OF_PROJECT')}</Option>
        <Option value="LAND_FARM">{getLandType('LAND_FARM')}</Option>
        <Option value="LAND_RESORT">{getLandType('LAND_RESORT')}</Option>
        <Option value="MOTEL_ROOM">{getLandType('MOTEL_ROOM')}</Option>
        <Option value="OFFICE">{getLandType('OFFICE')}</Option>
        <Option value="WAREHOUSES">{getLandType('WAREHOUSES')}</Option>
        <Option value="KIOSKS">{getLandType('KIOSKS')}</Option>
      </Select>
    );
  }

  onChangeCascader = value => {
    const parameters = {
      cityId: value[0],
      districtId: value[1],
      wardId: value[2]
    };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter,
      city: value
    });
  };

  keywordForm() {
    return (
      <Cascader value={this.state.city} options={this.state.locations} onChange={this.onChangeCascader} placeholder="Chọn thành phố" />
    );
  }

  menuPriceClick = value => {
    const parameters = { money: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  priceForm() {
    return (
      <Select value={this.state.parameters.money} placeholder="Khoảng giá" onChange={this.menuPriceClick}>
        <Option value="0">Bất kỳ</Option>
        <Option value="1">&lt; 500 triệu</Option>
        <Option value="2">500 triệu - 1 tỷ</Option>
        <Option value="3">1 - 1.5 tỷ</Option>
        <Option value="4">1.5 - 2 tỷ</Option>
        <Option value="5">&gt; 2 tỷ</Option>
      </Select>
    );
  }

  menuAcreageClick = value => {
    const parameters = { acreage: value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
  };

  acreageForm() {
    return (
      <Select value={this.state.parameters.acreage} placeholder="Diện tích" onChange={this.menuAcreageClick}>
        <Option value="0">Bất kỳ</Option>
        <Option value="1">&lt; 50 m2</Option>
        <Option value="2">50 - 80 m2</Option>
        <Option value="3">80 - 100 m2</Option>
        <Option value="4">100 - 200 m2</Option>
        <Option value="5">&gt; 200 m2</Option>
      </Select>
    );
  }

  searchClick = () => {
    this.props.history.push(`/tim-kiem?${queryString(this.state.parameters)}`);
  };

  render() {
    return (
      <div className="nav-search">
        <div className="container">
          {this.actionTypeForm()}
          {this.landTypeForm()}
          {this.keywordForm()}
          {this.priceForm()}
          {this.acreageForm()}
          <Button onClick={this.searchClick}>Tìm kiếm</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  cities: storeState.city.entities
});

const mapDispatchToProps = { getCities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
