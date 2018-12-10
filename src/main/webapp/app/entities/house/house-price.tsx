import React from 'react';
import { connect } from 'react-redux';
import { Col, Label } from 'reactstrap';
import { Translate } from 'react-jhipster';
import NumberFormat from 'react-number-format';
import { Select, Input } from 'antd';
const Option = Select.Option;

import { getPresent, getSaleType } from 'app/shared/util/utils';

export interface IHousePriceUpdateProps extends StateProps, DispatchProps {
  updateHouse: Function;
  houseEntity: any;
}

export interface IHousePriceUpdateState {
  money: any;
  discount: any;
  saleType: any;
  present: any;
}

export class HousePriceUpdate extends React.Component<IHousePriceUpdateProps, IHousePriceUpdateState> {
  state: IHousePriceUpdateState = {
    money: undefined,
    discount: undefined,
    saleType: undefined,
    present: undefined
  };

  onChangeMoney = values => {
    const { formattedValue, value } = values;
    this.setState({
      money: formattedValue
    });
    this.props.updateHouse({
      money: value
    });
  };

  onChangeDiscount = values => {
    const { formattedValue, value } = values;
    this.setState({
      discount: formattedValue
    });
    this.props.updateHouse({
      discount: value
    });
  };

  onChangePresent = value => {
    this.setState({
      present: value
    });
    this.props.updateHouse({
      present: value
    });
  };

  onChangeSaleType = value => {
    this.setState({
      saleType: value
    });
    this.props.updateHouse({
      saleType: value
    });
  };

  updateMarkerPosition = position => {};

  render() {
    const { houseEntity } = this.props;
    return (
      <>
        <Col md="6" style={{ marginBottom: 20 }}>
          <Label id="moneyLabel" for="money">
            <Translate contentKey="landexpApp.house.money">Money</Translate>
          </Label>
          <NumberFormat
            value={houseEntity.money}
            displayType={'input'}
            customInput={Input}
            thousandSeparator
            onValueChange={this.onChangeMoney}
          />
        </Col>
        <Col md="6" style={{ marginBottom: 20 }}>
          <Label id="discountLabel" for="discount">
            <Translate contentKey="landexpApp.house.discount">Discount</Translate>
          </Label>
          <NumberFormat
            value={houseEntity.discount}
            displayType={'input'}
            customInput={Input}
            thousandSeparator
            onValueChange={this.onChangeDiscount}
          />
        </Col>
        <Col md="6" style={{ marginBottom: 20 }}>
          <Label id="saleTypeLabel">
            <Translate contentKey="landexpApp.house.saleType">Sale Type</Translate>
          </Label>
          <Select style={{ width: '100%' }} defaultValue={houseEntity.saleType} placeholder="Gói đăng tin" onChange={this.onChangeSaleType}>
            <Option value="SALE_BY_MYSELF">{getSaleType('SALE_BY_MYSELF')}</Option>
            <Option value="SALE_BY_MYSELF_VIP">{getSaleType('SALE_BY_MYSELF_VIP')}</Option>
            <Option value="SALE_SUPPORT">{getSaleType('SALE_SUPPORT')}</Option>
            <Option value="SALE_SUPPORT_VIP">{getSaleType('SALE_SUPPORT_VIP')}</Option>
          </Select>
        </Col>
        <Col md="6" style={{ marginBottom: 20 }}>
          <Label id="presentLabel">
            <Translate contentKey="landexpApp.house.present">Present</Translate>
          </Label>
          <Select
            style={{ width: '100%' }}
            defaultValue={houseEntity.present}
            placeholder="Hỗ trợ sau mua bán"
            onChange={this.onChangePresent}
          >
            <Option value="NONE">{getPresent('NONE')}</Option>
            <Option value="BASIC_FURNITURE">{getPresent('BASIC_FURNITURE')}</Option>
            <Option value="FULL_FURNITURE">{getPresent('FULL_FURNITURE')}</Option>
            <Option value="DISCOUNT_PRICE">{getPresent('DISCOUNT_PRICE')}</Option>
            <Option value="SUPPORT_EXHIBIT">{getPresent('SUPPORT_EXHIBIT')}</Option>
            <Option value="SUPPORT_FEE">{getPresent('SUPPORT_FEE')}</Option>
            <Option value="HAVE_PRESENT">{getPresent('HAVE_PRESENT')}</Option>
          </Select>
        </Col>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousePriceUpdate);
