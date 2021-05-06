import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Loader from 'react-loader-advanced';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Loader.css';

import MDSpinner from 'react-md-spinner';

class FullPageLoader extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    show: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    show: false,
  };

  spinner() {
    return <MDSpinner singleColor={'#f56e9f'} size={48} />;
  }

  render() {
    const { children, show } = this.props;
    return (
      <Loader
        show={show}
        message={this.spinner()}
        foregroundStyle={{ color: 'white' }}
        backgroundStyle={{ backgroundColor: 'rgba(249, 249, 249, 0.74)' }}
      >
        <div>{children}</div>
      </Loader>
    );
  }
}

export default withStyles(s)(FullPageLoader);