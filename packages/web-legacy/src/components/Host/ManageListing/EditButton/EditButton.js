import React, { Component } from 'react';
import PropTypes, { exact } from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditButton.css';
import { Button, Col, Row } from 'react-bootstrap';
import cx from 'classnames';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';
import { ManagePublishStatus } from '../../../../actions/Listing/ManagePublishStatus';

class EditButton extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
  };

  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleChange(action) {
    const {
      listId,
      ManagePublishStatus,
      handleTabToggle,
      isExpand,
    } = this.props;
    ManagePublishStatus(listId, action);
    handleTabToggle('editButton', !isExpand);
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('editButton', !isExpand);
      }
    }
  }

  render() {
    const {
      className,
      handleTabToggle,
      isExpand,
      listId,
      openRemoveList,
      data,
    } = this.props;
    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              s.btn,
              s.btnFontsize,
              s.responsiveFontsize,
              s.buttonDot,
            )}
            onClick={() => handleTabToggle('editButton', !isExpand)}
          >
            <span></span>
            <span></span>
            <span></span>
          </Button>
        </div>
        {isExpand && (
          <div className={cx(s.searchFilterPopover)} ref={this.setWrapperRef}>
            <div className={s.searchFilterPopoverContent}>
              <ul>
                <li>
                  <a href="javascript:void(0)" onClick={() => openRemoveList()}>
                    <FormattedMessage {...messages.delete} />
                  </a>
                </li>
                {data && data.listingSteps && data.isReady && (
                  <li>
                    <a
                      href={'/space/' + listId + '/preview'}
                      className={s.colorChange}
                    >
                      <FormattedMessage {...messages.preview} />
                    </a>
                  </li>
                )}
                {data && data.isReady && data.user.userBanStatus != 1 && (
                  <div>
                    {!data.isPublished && (
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={() => this.handleChange('publish')}
                        >
                          <FormattedMessage {...messages.listed} />
                        </a>
                      </li>
                    )}
                    {data.isPublished && (
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={() => this.handleChange('unPublish')}
                        >
                          <FormattedMessage {...messages.unListed} />
                        </a>
                      </li>
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  ManagePublishStatus,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(EditButton)),
);
