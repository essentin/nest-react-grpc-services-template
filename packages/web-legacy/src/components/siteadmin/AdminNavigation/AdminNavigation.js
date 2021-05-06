import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdminNavigation.css';
import {
  Nav
} from 'react-bootstrap';

import NavLink from '../../NavLink';
import Logout from '../../Logout';

class AdminNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <Nav pullRight>
        <NavLink to="/siteadmin/login" >
          Home
        </NavLink>
        <Logout />
      </Nav>
    );
  }
}

export default withStyles(s)(AdminNavigation);