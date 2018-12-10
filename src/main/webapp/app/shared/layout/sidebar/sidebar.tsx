import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';

export interface ISidebarProps extends StateProps, DispatchProps {
  activeMenu?: string;
  activeSubMenu?: string;
  location?: any;
}

export class Sidebar extends React.Component<ISidebarProps> {
  userMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'user-management' ? 'active' : ''}`}>
        <Link to={'/account/settings'}>
          <i className="fa fa-info" /> <span className="nav-label">User Center</span> <span className="fa arrow" />
        </Link>
        <ul className={`${activeMenu === 'user-management' ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'}`}>
          <li className={`${activeSubMenu === 'setting' ? 'active' : ''}`}>
            <Link to={'/account/settings'}>
              <FontAwesomeIcon icon="wrench" fixedWidth /> Profile
            </Link>
          </li>
          <li className={`${activeSubMenu === 'change-password' ? 'active' : ''}`}>
            <Link to={'/account/password'}>
              <FontAwesomeIcon icon="clock" fixedWidth /> Password
            </Link>
          </li>
        </ul>
      </li>
    );
  }

  staffMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'staff-management' ? 'active' : ''}`}>
        <Link to={'/entity/article'}>
          <i className="fa fa-user" /> <span className="nav-label">Staff Center</span> <span className="fa arrow" />
        </Link>
        <ul className={`${activeMenu === 'staff-management' ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'}`}>
          <li className={`${activeSubMenu === 'article' ? 'active' : ''}`}>
            <Link to={'/entity/article'}>
              <i className="fa fa-bars" /> Articles
            </Link>
          </li>
          <li className={`${activeSubMenu === 'project' ? 'active' : ''}`}>
            <Link to={'/entity/land-project'}>
              <i className="fa fa-bars" /> Land projects
            </Link>
          </li>
          <li className={`${activeSubMenu === 'payment' ? 'active' : ''}`}>
            <Link to={'/entity/payment'}>
              <i className="fa fa-bars" /> Payment
            </Link>
          </li>
          <li className={`${activeSubMenu === 'house' ? 'active' : ''}`}>
            <Link to={'/entity/house'}>
              <i className="fa fa-bars" /> Houses
            </Link>
          </li>
        </ul>
      </li>
    );
  }

  managerMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'manager-management' ? 'active' : ''}`}>
        <Link to={'/entity/city'}>
          <i className="fa fa-shield" /> <span className="nav-label">Manager Center</span> <span className="fa arrow" />
        </Link>
        <ul className={`${activeMenu === 'manager-management' ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'}`}>
          <li className={`${activeSubMenu === 'city' ? 'active' : ''}`}>
            <Link to={'/entity/city'}>
              <i className="fa fa-bars" /> Cities
            </Link>
          </li>
          <li className={`${activeSubMenu === 'district' ? 'active' : ''}`}>
            <Link to={'/entity/district'}>
              <i className="fa fa-bars" /> Districts
            </Link>
          </li>
          <li className={`${activeSubMenu === 'ward' ? 'active' : ''}`}>
            <Link to={'/entity/ward'}>
              <i className="fa fa-bars" /> Wards
            </Link>
          </li>
          <li className={`${activeSubMenu === 'region' ? 'active' : ''}`}>
            <Link to={'/entity/region'}>
              <i className="fa fa-bars" /> Regions
            </Link>
          </li>
          <li className={`${activeSubMenu === 'service-fee' ? 'active' : ''}`}>
            <Link to={'/entity/service-fee'}>
              <i className="fa fa-bars" /> Service Fee
            </Link>
          </li>
          <li className={`${activeSubMenu === 'category' ? 'active' : ''}`}>
            <Link to={'/entity/category'}>
              <i className="fa fa-bars" /> Categories
            </Link>
          </li>
        </ul>
      </li>
    );
  }

  adminMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'administration' ? 'active' : ''}`}>
        <Link to={'/admin/user-management'}>
          <i className="fa fa-user-secret" /> <span className="nav-label">Admin Center</span> <span className="fa arrow" />
        </Link>
        <ul className={`${activeMenu === 'administration' ? 'nav nav-second-level collapse in' : 'nav nav-second-level collapse'}`}>
          <li className={`${activeSubMenu === 'user-management' ? 'active' : ''}`}>
            <Link to={'/admin/user-management'}>
              <FontAwesomeIcon icon="user" fixedWidth />
              Users
            </Link>
          </li>
          <li className={`${activeSubMenu === 'metrics' ? 'active' : ''}`}>
            <Link to={'/admin/metrics'}>
              <FontAwesomeIcon icon="tachometer-alt" fixedWidth /> Metrics
            </Link>
          </li>
          <li className={`${activeSubMenu === 'health' ? 'active' : ''}`}>
            <Link to={'/admin/health'}>
              <FontAwesomeIcon icon="heart" fixedWidth /> Health
            </Link>
          </li>
          <li className={`${activeSubMenu === 'configuration' ? 'active' : ''}`}>
            <Link to={'/admin/configuration'}>
              <FontAwesomeIcon icon="list" fixedWidth /> Configuration
            </Link>
          </li>
          <li className={`${activeSubMenu === 'audits' ? 'active' : ''}`}>
            <Link to={'/admin/audits'}>
              <FontAwesomeIcon icon="bell" fixedWidth /> Audits
            </Link>
          </li>
          <li className={`${activeSubMenu === 'logs' ? 'active' : ''}`}>
            <Link to={'/admin/logs'}>
              <FontAwesomeIcon icon="tasks" fixedWidth /> Logs
            </Link>
          </li>
        </ul>
      </li>
    );
  }

  render() {
    const { activeMenu, activeSubMenu } = this.props;
    const { isAuthenticated, isAdmin, isStaff, isManager } = this.props;
    console.log('this.props.location', this.props.location);
    // if (isAuthenticated !== true) return (<div />);
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                {' '}
                <span>
                  <img alt="image" className="img-circle" src="content/img/profile_small.jpg" />
                </span>
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                  <span className="clear">
                    {' '}
                    <span className="block m-t-xs">
                      {' '}
                      <strong className="font-bold">David Williams</strong>
                    </span>{' '}
                    <span className="text-muted text-xs block">
                      Manager <b className="caret" />
                    </span>{' '}
                  </span>{' '}
                </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                  <li>
                    <a href="profile.html">Profile</a>
                  </li>
                  <li>
                    <a href="contacts.html">Contacts</a>
                  </li>
                  <li>
                    <a href="mailbox.html">Mailbox</a>
                  </li>
                  <li className="divider" />
                  <li>
                    <Link to={'/logout'}>Logout</Link>
                  </li>
                </ul>
              </div>
              <div className="logo-element">IN+</div>
            </li>
            <li className={`${activeMenu === 'dashboard' ? 'active' : ''}`}>
              <Link to={'/'}>
                <i className="fa fa-th-large" /> <span className="nav-label">Dashboard</span>
              </Link>
            </li>
            {this.userMenu()}
            {isStaff || isManager || isAdmin ? this.staffMenu() : ''}
            {isManager || isAdmin ? this.managerMenu() : ''}
            {isAdmin ? this.adminMenu() : ''}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isManager: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.MANAGER]),
  isStaff: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.STAFF])
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
