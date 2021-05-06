// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep1.css';

// Locale
import messages from '../../../locale/messages';

class TabBarStep1 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, formPage } = this.props;
    const { formatMessage } = this.props.intl;
    let pathname = formPage;

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "location" })}
          title={formatMessage(messages.location)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("location")} href="javascript:void(0);">
            <FormattedMessage {...messages.location} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "spaces-parking" })}
          title={formatMessage(messages.sharedSpaces)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("spaces-parking")} href="javascript:void(0);">
            <FormattedMessage {...messages.sharedSpaces} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "amenities" })}
          title={formatMessage(messages.aminities)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("amenities")} href="javascript:void(0);">
            <FormattedMessage {...messages.aminities} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "moods" })}
          title={formatMessage(messages.mood)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("moods")} href="javascript:void(0);">
            <FormattedMessage {...messages.mood} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "contact" })}
          title={formatMessage(messages.contact)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("contact")} href="javascript:void(0);">
            <FormattedMessage {...messages.contact} />
          </a>
        </div>

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>

      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep1));

