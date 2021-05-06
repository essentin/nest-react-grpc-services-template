import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HostNavigation.css';
import {
  Nav
} from 'react-bootstrap';

import Logout from '../../Logout';

class HostNavigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <Nav pullRight>
        <Logout />
      </Nav>
    );
  }
}

export default withStyles(s)(HostNavigation);