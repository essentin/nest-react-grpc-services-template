import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ProfilePicture.css';

class ProfilePicture extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  render() {
    const { picture } = this.props;
    const imgSource = picture ? '/images/avatar/' + 'small' + '_' + picture : null 
    return (
      <div>
      {
       imgSource ? <img
          src={imgSource}
          className={cx(s.imgBackground)}
          alt={'Profile picture'}
        /> : <div></div>
      }
      </div>
    )
  }
}

const mapState = (state) => ({
    picture: state.account.data.picture
});

const mapDispatch = {
}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ProfilePicture)));