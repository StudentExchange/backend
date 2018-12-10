/* tslint:disable */
import './search-menu-v1.css';

import React from 'react';
// import $ from 'jquery';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import qs from 'query-string';

import { getLandType, queryStringMapping, queryString, getPriceByNumber, getAcreageByNumber } from 'app/shared/util/utils';
import { getHouses } from 'app/entities/house/house.reducer';

export interface ISearchPageProp extends StateProps, DispatchProps {
  location: any;
  history: any;
}

export interface ISearchPageState {
  parameters: any;
}

export class SearchPage extends React.Component<ISearchPageProp, ISearchPageState> {
  state: ISearchPageState = {
    parameters: {}
  };

  componentDidMount() {
    /*
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      if (parsed) {
        this.setState({
          parameters: parsed
        });
      }
      // this.props.getSession();
      this.props.getHouses(queryStringMapping(parsed));
    }
    */
    /*
    $('.dropdown-submenu div').on('click', function(e) {
      $(this)
        .next('ul')
        .toggle();
      e.stopPropagation();
      e.preventDefault();
    });

    $('.dropdown-menu.has-sub').on('click', function(event) {
      event.stopPropagation();
    });

    $('.select li').click(function() {
      $(this)
        .siblings()
        .removeClass('active');
      $(this).addClass('active');
    });

    $('.select .js-type li').click(function() {
      $('.select span#type').text($(this).html());
      $('.select input#slType').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-category li').click(function() {
      $('.select span#category').text($(this).html());
      $('.select input#slCategory').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-price li').click(function() {
      $('.select span#price').text($(this).text());
      $('.select input#slPrice').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-square li').click(function() {
      $('.select span#square').text($(this).text());
      $('.select input#slSqrare').attr('value', $(this).attr('data-value'));
    });

    $('.js-bathroom li').click(function() {
      $('.js-bathroom').css('display', 'none');
      $('#bathroom span').text($(this).html());
      $('input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bathroom li').click(function() {
      $('.select span#bathroom').text($(this).text());
      $('.select input#slBathroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-bedroom li').click(function() {
      $('.js-bedroom').css('display', 'none');
      $('#bedroom span').text($(this).html());
      $('input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.select .js-bedroom li').click(function() {
      $('.select span#bedroom').text($(this).text());
      $('.select input#slBedroom').attr('value', $(this).attr('data-value'));
    });

    $('.js-gara li').click(function() {
      $('.js-gara').css('display', 'none');
      $('#gara span').text($(this).html());
      $('input#slGara').attr('value', $(this).attr('data-value'));
    });

    $('.js-direction li').click(function() {
      $('.js-direction').css('display', 'none');
      $('#direction span').text($(this).html());
      $('input#slDirection').attr('value', $(this).attr('data-value'));
    });

    $('.js-postdate li').click(function() {
      $('.js-postdate').css('display', 'none');
      $('#postdate span').text($(this).html());
      $('input#slPostdate').attr('value', $(this).attr('data-value'));
    });

    $('#close-menu').click(function() {
      $('.select.dropdown.mega-dropdown').removeClass('open');
      $('#filter-more').attr('aria-expanded', 'false');
      $('.dropdown-backdrop').remove();
      let filterCount = 0;

      if ($('.dropdown-submenu input#slBathroom').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slBedroom').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slGara').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slDirection').val() !== '') {
        filterCount++;
      }
      if ($('.dropdown-submenu input#slPostdate').val() !== '') {
        filterCount++;
      }
      $('#filter-more').html('Lọc thêm <strong>(' + filterCount + ')</strong>');
    });

    $('#clear-menu').click(function() {
      $('#bathroom span').html('Bất kỳ');
      $('input#slBathroom').attr('value', '');
      $('#bedroom span').html('Bất kỳ');
      $('input#slBedroom').attr('value', '');
      $('#gara span').html('Bất kỳ');
      $('input#slGara').attr('value', '');
      $('#direction span').html('Bất kỳ');
      $('input#slDirection').attr('value', '');
      $('#postdate span').html('Bất kỳ');
      $('input#slPostdate').attr('value', '');
    });

    $('.js-price .advance-options input').change(function() {
      $('#price').html($('.js-price input.min-value').val() + ' - ' + $('.js-price input.max-value').val() + ' tỷ');
    });

    $('.js-square .advance-options input').change(function() {
      $('#square').html($('.js-square input.min-value').val() + ' - ' + $('.js-square input.max-value').val() + ' m2');
    });
    */
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.location !== prevProps.location) {
      const parsed = qs.parse(this.props.location.search);
      if (parsed) {
        this.setState({
          parameters: parsed
        });
      }
      // this.props.getSession();
      this.props.getHouses(queryStringMapping(parsed));
    }
  }

  menuTypeClick = e => {
    const parameters = { actionType: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
    console.log(this.state.parameters);
  };

  menuTypeForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="type" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.state.parameters && this.state.parameters.actionType
              ? this.state.parameters.actionType === 'FOR_SELL'
                ? 'Mua'
                : 'Thuê'
              : 'Hình thức'}
          </span>
          <input type="hidden" id="slType" name="slType" />
          <ul className="dropdown-menu js-type" aria-labelledby="type" onClick={this.menuTypeClick}>
            <li
              className={`options ${this.state.parameters && this.state.parameters.actionType === 'FOR_SELL' ? 'active' : ''}`}
              data-value="FOR_SELL"
            >
              Mua
            </li>
            <li
              className={`options ${this.state.parameters && this.state.parameters.actionType === 'FOR_RENT' ? 'active' : ''}`}
              data-value="FOR_RENT"
            >
              Thuê
            </li>
          </ul>
        </div>
      </div>
    );
  }

  menuLandTypeClick = e => {
    const parameters = { landType: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
    console.log(this.state.parameters);
  };

  menuLandTypeForm() {
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="category" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.state.parameters && this.state.parameters.landType ? getLandType(this.state.parameters.landType) : 'Loại bất động sản'}
          </span>
          <input type="hidden" id="slCategory" name="slCategory" />
          <ul className="dropdown-menu js-category" aria-labelledby="category" onClick={this.menuLandTypeClick}>
            <li className="options" data-value="APARTMENT">
              {getLandType('APARTMENT')}
            </li>
            <li className="options" data-value="PEN_HOUSE">
              {getLandType('PEN_HOUSE')}
            </li>
            <li className="options" data-value="HOME">
              {getLandType('HOME')}
            </li>
            <li className="options" data-value="HOME_VILLA">
              {getLandType('HOME_VILLA')}
            </li>
            <li className="options" data-value="HOME_STREET_SIDE">
              {getLandType('HOME_STREET_SIDE')}
            </li>
            <li className="options" data-value="OFFICE">
              {getLandType('OFFICE')}
            </li>
            <li className="options" data-value="LAND_SCAPE">
              {getLandType('LAND_SCAPE')}
            </li>
            <li className="options" data-value="LAND_OF_PROJECT">
              {getLandType('LAND_OF_PROJECT')}
            </li>
            <li className="options" data-value="LAND_FARM">
              {getLandType('LAND_FARM')}
            </li>
            <li className="options" data-value="LAND_RESORT">
              {getLandType('LAND_RESORT')}
            </li>
            <li className="options" data-value="WAREHOUSES">
              {getLandType('WAREHOUSES')}
            </li>
            <li className="options" data-value="KIOSKS">
              {getLandType('KIOSKS')}
            </li>
            <li className="options" data-value="MOTEL_ROOM">
              {getLandType('MOTEL_ROOM')}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  menuPriceClick = e => {
    const parameters = { money: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
    console.log(this.state.parameters);
  };

  menuPriceForm() {
    const items = [];
    for (let i = 0; i <= 5; i++) {
      items.push(
        <li
          key={`price-${i}`}
          className={`options ${this.state.parameters && parseInt(this.state.parameters.money) === i ? 'active' : ''}`}
          data-value={i}
          dangerouslySetInnerHTML={{ __html: getPriceByNumber(i) }}
        />
      );
    }
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="price" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.state.parameters && this.state.parameters.money ? getPriceByNumber(this.state.parameters.money) : 'Khoảng giá'}
          </span>
          <input type="hidden" id="slPrice" name="slPrice" />
          <ul className="dropdown-menu js-price" aria-labelledby="price" onClick={this.menuPriceClick}>
            {items}
          </ul>
        </div>
      </div>
    );
  }

  menuSpareClick = e => {
    const parameters = { acreage: e.target.dataset.value };
    const nextParameter = { ...this.state.parameters, ...parameters };
    this.setState({
      parameters: nextParameter
    });
    console.log(this.state.parameters);
  };

  menuSpareForm() {
    const items = [];
    for (let i = 0; i <= 5; i++) {
      items.push(
        <li
          key={`spare-${i}`}
          className={`options ${this.state.parameters && parseInt(this.state.parameters.acreage) === i ? 'active' : ''}`}
          data-value={i}
          dangerouslySetInnerHTML={{ __html: getAcreageByNumber(i) }}
        />
      );
    }
    return (
      <div className="select-box">
        <div className="select dropdown">
          <span id="square" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            {this.state.parameters && this.state.parameters.acreage ? getAcreageByNumber(this.state.parameters.acreage) : 'Diện tích'}
          </span>
          <input type="hidden" id="slSqrare" name="slSqrare" />
          <ul className="dropdown-menu js-square" aria-labelledby="square" onClick={this.menuSpareClick}>
            {items}
          </ul>
        </div>
      </div>
    );
  }

  /*
  menuMoreClick() {
  }
  */

  menuMoreForm() {
    return (
      <div className="select-box">
        <div className="select dropdown mega-dropdown">
          <span id="filter-more" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
            Lọc thêm
          </span>
          <ul className="dropdown-menu has-sub" aria-labelledby="filter-more">
            <li className="options dropdown-submenu">
              <input type="hidden" id="slBathroom" name="slBathroom" />
              <div id="bathroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Số phòng tắm
                <span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-bathroom" aria-labelledby="bathroom">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>+1</li>
                <li data-value={2}>+2</li>
                <li data-value={3}>+3</li>
                <li data-value={4}>+4</li>
                <li data-value={5}>+5</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slBedroom" name="slBedroom" />
              <div id="bedroom" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Số phòng ngủ
                <span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-bedroom" aria-labelledby="bedroom">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>+1</li>
                <li data-value={2}>+2</li>
                <li data-value={3}>+3</li>
                <li data-value={4}>+4</li>
                <li data-value={5}>+5</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slGara" name="slGara" />
              <div id="gara" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Chỗ để ô tô
                <span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-gara" aria-labelledby="gara">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Có</li>
                <li data-value={0}>Không</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slDirection" name="slDirection" />
              <div id="direction" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Hướng
                <span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-direction" aria-labelledby="direction">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Đông</li>
                <li data-value={2}>Tây</li>
                <li data-value={3}>Nam</li>
                <li data-value={4}>Bắc</li>
                <li data-value={5}>Đông Bắc</li>
                <li data-value={6}>Đông Nam</li>
                <li data-value={7}>Tây Bắc</li>
                <li data-value={8}>Tây Nam</li>
              </ul>
            </li>
            <li className="options dropdown-submenu">
              <input type="hidden" id="slPostdate" name="slPostdate" />
              <div id="postdate" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Ngày đăng
                <span>Bất kỳ</span>
              </div>
              <ul className="dropdown-menu js-postdate" aria-labelledby="postdate">
                <li data-value>Bất kỳ</li>
                <li data-value={1}>Cách đây 1 ngày</li>
                <li data-value={3}>Cách đây 3 ngày</li>
                <li data-value={7}>Cách đây 7 ngày</li>
                <li data-value={15}>Cách đây 15 ngày</li>
                <li data-value={30}>Cách đây 30 ngày</li>
              </ul>
            </li>
            <li className="dropdown-button">
              <div className="btn-row">
                <div>
                  <button type="button" id="clear-menu" className="btn btn-sub btn-default">
                    Xóa
                  </button>
                </div>
                <div>
                  <button type="button" id="close-menu" className="btn btn-sub btn-primary">
                    Hoàn tất
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  searchClick = () => {
    this.props.history.push(`/tim-kiem?${queryString(this.state.parameters)}`);
  };

  render() {
    const { account } = this.props;
    return (
      <Col md="12">
        <div style={{ marginBottom: 30 }} className="nav-search">
          <div className="container">
            <div className="row">
              {this.menuTypeForm()}
              {this.menuLandTypeForm()}
              <div className="select-box">
                <input type="text" name="txLocation" placeholder="Nhập địa điểm, thành phố hoặc dự án" />
              </div>
              {this.menuPriceForm()}
              {this.menuSpareForm()}
              {this.menuMoreForm()}
              <div className="select-box">
                <button onClick={this.searchClick}>Tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getHouses };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
