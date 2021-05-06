import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from '../Link';
import s from './Logo.css';

class Logo extends Component {
  static propTypes = {
    link: PropTypes.string,
    className: PropTypes.string,
    showMenu: PropTypes.bool,
  };

  static defaultProps = {
    link: '/',
    showMenu: false,
  };

  render() {
    const { link, showMenu, className } = this.props;

    return (
      <Link to={link} className={className}>
        <img
          src={'/images/logo/flowpass.svg'}
          alt="logo2"
        />

        {false && <span className={s.logoColor}>Flowpass</span>}
      </Link>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(Logo));
