/* tslint:disable */
import { Storage } from 'react-jhipster';
const Hashids = require('hashids').default;
const hashids = new Hashids('id.landexp.com.vn');
const hashpayments = new Hashids('payment.landexp.com.vn');
const uniqid = require('uniqid');

export const getActionType = type => {
  if (type === 'FOR_SELL') {
    return 'Bán bất động sản';
  } else {
    return 'Cho thuê bất động sản';
  }
};

export const getLandType = type => {
  switch (type) {
    case 'APARTMENT':
      return 'Căn hộ chung cư';
    case 'PEN_HOUSE':
      return 'Penhouse';
    case 'HOME':
      return 'Nhà riêng';
    case 'HOME_VILLA':
      return 'Biệt thự';
    case 'HOME_STREET_SIDE':
      return 'Nhà mặt phố';
    case 'MOTEL_ROOM':
      return 'Phòng trọ';
    case 'OFFICE':
      return 'Văn phòng';
    case 'LAND_SCAPE':
      return 'Đất thổ cử';
    case 'LAND_OF_PROJECT':
      return 'Đất dự án';
    case 'LAND_FARM':
      return 'Đất nông nghiệp';
    case 'LAND_RESORT':
      return 'Resort';
    case 'WAREHOUSES':
      return 'Kho, nhà xưởng';
    case 'KIOSKS':
      return 'Cửa hàng, Ki ốt';
    default:
      return 'Loại bất động sản khác';
  }
};

export const getCityType = value => {
  let address = '';
  if (value.cities) {
    value.cities.map(city => {
      if (city.id === value.cityId) {
        city.districts.map(district => {
          if (district.id === value.districtId) {
            district.wards.map(ward => {
              if (ward.id === value.wardId) {
                address += ward.name + ' - ';
              }
            });
            address += district.name + ' - ';
          }
        });
        address += city.name;
      }
    });
  }
  return address;
};

export const getDirection = type => {
  switch (type) {
    case 'NORTH':
      return 'Bắc';
    case 'SOUTH':
      return 'Nam';
    case 'EAST':
      return 'Đông';
    case 'WEST':
      return 'Tây';
    case 'EAST_NORTH':
      return 'Đông Bắc';
    case 'WEST_NORTH':
      return 'Tây Bắc';
    case 'EAST_SOUTH':
      return 'Đông Nam';
    // case 'WEST_SOUTH':
    default:
      return 'Tây Nam';
  }
};

export const getPresent = type => {
  switch (type) {
    case 'NONE':
      return 'Không hỗ trợ';
    case 'BASIC_FURNITURE':
      return 'Hỗ trợ nội thất cơ bản';
    case 'FULL_FURNITURE':
      return 'Hỗ trợ nội thất đầy đủ';
    case 'DISCOUNT_PRICE':
      return 'Hỗ trợ chiết khấu giảm giá';
    case 'SUPPORT_EXHIBIT':
      return 'Hỗ trợ thủ tục giấy tờ';
    case 'SUPPORT_FEE':
      return 'Hỗ trợ phí giao dịch';
    // case 'HAVE_PRESENT':
    default:
      return 'Không hỗ trợ';
  }
};

export const getSaleType = type => {
  switch (type) {
    case 'SALE_BY_MYSELF_VIP':
      return 'Tin VIP';
    case 'SALE_SUPPORT':
      return 'Ký gửi thường';
    case 'SALE_SUPPORT_VIP':
      return 'Ký gửi VIP';
    default:
      return 'Tin thường';
  }
};

export const getPaymentStatus = type => {
  switch (type) {
    case 'CANCELED':
      return 'Thanh toán thất bại';
    case 'PAID':
      return 'Đã thanh toán';
    default:
      return 'Chờ thanh toán';
  }
};

export const getStatusType = type => {
  switch (type) {
    case 'FAILED':
      return 'Thanh toán thất bại';
    case 'APPROVED':
      return 'Đã thanh toán';
    case 'CANCELED':
      return 'Đã huỷ';
    case 'EXPIRED':
      return 'Đã hết hạn';
    case 'PAID':
      return 'Đã thanh toán';
    case 'SOLD':
      return 'Đã bán';
    default:
      return 'Chờ thanh toán';
  }
};

export const getMoney = (money, actionType) => {
  let moneyFormat = '<span>';
  if (money >= 1000000000) {
    moneyFormat += humanize(money / 1000000000);
    moneyFormat += '</span>';
    moneyFormat += ' tỷ';
  } else if (1000000 <= money && money < 1000000000) {
    moneyFormat += humanize(money / 1000000);
    moneyFormat += '</span>';
    moneyFormat += ' triệu';
  } else if (1000 <= money && money < 1000000) {
    moneyFormat += humanize(money / 1000);
    moneyFormat += '</span>';
    moneyFormat += ' ngàn';
  } else {
    moneyFormat += humanize(money);
    moneyFormat += '</span>';
    moneyFormat += ' ngàn';
  }
  if (actionType === 'FOR_RENT') {
    moneyFormat += '/tháng';
  }
  return moneyFormat;
};

export const formatMoney = money => {
  let moneyFormat = '';
  if (money >= 1000000000) {
    moneyFormat += humanize(money / 1000000000);
    moneyFormat += ' tỷ';
  } else if (1000000 <= money && money < 1000000000) {
    moneyFormat += humanize(money / 1000000);
    moneyFormat += ' triệu';
  } else if (1000 <= money && money < 1000000) {
    moneyFormat += humanize(money / 1000);
    moneyFormat += ' ngàn';
  } else {
    moneyFormat += humanize(money);
    moneyFormat += ' ngàn';
  }
  return moneyFormat;
};

export const humanize = x => {
  return x ? x.toFixed(2).replace(/\.?0*$/, '') : x;
};

export const encodeId = id => hashids.encode(id, 20190101);

export const decodeId = id => hashids.decode(id)[0];

export const encodePayment = id => hashpayments.encode(id, 20190101);

export const decodePayment = id => hashpayments.decode(id)[0];

export const formatDate = date => date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

export const queryStringMapping = parameters => {
  let queryString = '';
  queryString += parameters.actionType ? 'actionType.equals=' + parameters.actionType + '&' : '';
  queryString += parameters.landType ? 'landType.equals=' + parameters.landType + '&' : '';
  queryString += parameters.cityId ? 'cityId.equals=' + parameters.cityId + '&' : '';
  queryString += parameters.districtId ? 'districtId.equals=' + parameters.districtId + '&' : '';
  queryString += parameters.wardId ? 'wardId.equals=' + parameters.wardId + '&' : '';
  queryString += parameters.statusType ? 'statusType.equals=' + parameters.statusType + '&' : '';
  queryString += parameters.saleType ? 'saleType.equals=' + parameters.saleType + '&' : '';
  queryString += parameters.mobile ? 'mobile.contains=' + parameters.mobile + '&' : '';
  switch (parseInt(parameters.money)) {
    case 1:
      queryString += 'money.lessThan=500000001&';
      break;
    case 2:
      queryString += 'money.greaterThan=500000000&money.lessThan=1000000001&';
      break;
    case 3:
      queryString += 'money.greaterThan=1000000000&money.lessThan=1500000001&';
      break;
    case 4:
      queryString += 'money.greaterThan=1500000000&money.lessThan=2000000001&';
      break;
    case 5:
      queryString += 'money.greaterThan=2000000000&';
      break;
    default:
      break;
  }
  switch (parseInt(parameters.acreage)) {
    case 1:
      queryString += 'acreage.lessThan=50&';
      break;
    case 2:
      queryString += 'acreage.greaterThan=50&acreage.lessThan=81&';
      break;
    case 3:
      queryString += 'acreage.greaterThan=80&acreage.lessThan=101&';
      break;
    case 4:
      queryString += 'acreage.greaterThan=100&acreage.lessThan=201&';
      break;
    case 5:
      queryString += 'acreage.greaterThan=200&';
      break;
    default:
      break;
  }
  return queryString.slice(0, -1);
};

export const paymentQueryStringMapping = parameters => {
  let queryString = '';
  queryString += parameters.paymentStatus ? 'paymentStatus.equals=' + parameters.paymentStatus + '&' : '';
  queryString += parameters.code ? 'code.contains=' + parameters.code + '&' : '';
  return queryString.slice(0, -1);
};

export const queryString = parameters => {
  let queryString = '';
  for (const key in parameters) {
    if (parameters[key]) {
      queryString += key + '=' + parameters[key] + '&';
    }
  }
  return queryString.slice(0, -1);
};

export const getPriceByNumber = price => {
  switch (parseInt(price)) {
    case 1:
      return '&lt; 500 triệu';
    case 2:
      return '500 triệu - 1 tỷ';
    case 3:
      return '1 - 1.5 tỷ';
    case 4:
      return '1.5 - 2 tỷ';
    case 5:
      return '&gt; 2 tỷ';
    default:
      return 'Bất kỳ';
  }
};

export const getAcreageByNumber = acreage => {
  switch (parseInt(acreage)) {
    case 1:
      return '&lt; 50 m2';
    case 2:
      return '50 - 80 m2';
    case 3:
      return '80 - 100 m2';
    case 4:
      return '100 - 200 m2';
    case 5:
      return '&gt; 200 m2';
    default:
      return 'Bất kỳ';
  }
};

export const showAcreageStreetSide = landType => {
  if (
    landType === 'HOME' ||
    landType === 'HOME_STREET_SIDE' ||
    landType === 'LAND_SCAPE' ||
    landType === 'LAND_OF_PROJECT' ||
    landType === 'KIOSKS'
  ) {
    return true;
  }
  return false;
};

export const showNumberOfFloor = landType => {
  if (landType === 'HOME' || landType === 'HOME_STREET_SIDE' || landType === 'HOME_VILLA') {
    return true;
  }
  return false;
};

export const showBedRoom = landType => {
  if (landType === 'HOME' || landType === 'HOME_STREET_SIDE' || landType === 'HOME_VILLA' || landType === 'APARTMENT') {
    return true;
  }
  return false;
};

export const uid = () => uniqid.time();

export const getUid = () => {
  let _uid = Storage.local.get('uid');
  if (_uid) {
    return _uid;
  } else {
    return undefined;
  }
};
