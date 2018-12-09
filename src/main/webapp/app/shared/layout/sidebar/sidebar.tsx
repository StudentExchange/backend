import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';

export interface ISidebarProps {
  isAuthenticated: boolean;
  activeMenu: string;
  activeSubMenu: string;
}

export default class Sidebar extends React.Component<ISidebarProps> {
  userMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'user-management' ? 'active' : ''}`}>
        <Link to={'/account/settings'}>
          <i className="fa fa-user" /> <span className="nav-label">User management</span> <span className="fa arrow" />
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

  adminMenu() {
    const { activeMenu, activeSubMenu } = this.props;

    return (
      <li className={`${activeMenu === 'administration' ? 'active' : ''}`}>
        <Link to={'/admin/user-management'}>
          <i className="fa fa-cog" /> <span className="nav-label">Administration</span> <span className="fa arrow" />
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
    const { isAuthenticated, activeMenu, activeSubMenu } = this.props;
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
            {this.adminMenu()}
          </ul>
        </div>
      </nav>
    );
  }
}
