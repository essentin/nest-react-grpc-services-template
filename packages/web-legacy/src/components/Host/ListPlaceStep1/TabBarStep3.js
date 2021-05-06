// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep3.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class TabBarStep3 extends Component {

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
            { [s.active]: pathname === "availability" })}
          title={formatMessage(messages.availability)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("availability")} href="javascript:void(0);">
            <FormattedMessage {...messages.availability} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "calendar" })}
          title={formatMessage(messages.tabCalendar)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("calendar")} href="javascript:void(0);">
            <FormattedMessage {...messages.tabCalendar} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, s.progressStyle,
            { [s.active]: pathname === "activities" })}
          title={formatMessage(messages.activities)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("activities")} href="javascript:void(0);">
            <FormattedMessage {...messages.activities} />
          </a>
        </div>
        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep3));