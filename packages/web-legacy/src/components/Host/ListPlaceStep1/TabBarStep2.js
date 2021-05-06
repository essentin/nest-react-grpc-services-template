// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Style
import { ProgressBar } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TabBarStep2.css';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

class TabBarStep2 extends Component {

  static propTypes = {
    nextPage: PropTypes.any,
    formatMessage: PropTypes.any,
  };

  render() {
    const { nextPage, photosCount, formPage } = this.props;
    const { formatMessage } = this.props.intl;
    let partionClass = s.EditprogressStyle;
    let pathname = formPage;
    if (photosCount && photosCount > 0) {
      partionClass = s.progressStyle;
    }

    return (
      <div className={cx(s.progressContainer, 'hidden-xs')}>
        <div
          className={cx(s.textTrunck, s.progressSection, partionClass,
            { [s.active]: pathname === "about-your-space" })}
          title={formatMessage(messages.aboutYourSpace)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("about-your-space")} href="javascript:void(0);">
            <FormattedMessage {...messages.aboutYourSpace} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, partionClass,
            { [s.active]: pathname === "house-rules" })}
          title={formatMessage(messages.houseRules)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("house-rules")} href="javascript:void(0);">
            <FormattedMessage {...messages.houseRules} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, partionClass,
            { [s.active]: pathname === "instructions" })}
          title={formatMessage(messages.instructions)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("instructions")} href="javascript:void(0);">
            <FormattedMessage {...messages.instructions} />
          </a>
        </div>

        <div
          className={cx(s.textTrunck, s.progressSection, partionClass,
            { [s.active]: pathname === "photos" })}
          title={formatMessage(messages.photos)}
        >
          <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("photos")} href="javascript:void(0);">
            <FormattedMessage {...messages.photos} />
          </a>
        </div>

        {
          photosCount != undefined && photosCount > 0 &&
          <div
            className={cx(s.textTrunck, s.progressSection, partionClass,
              { [s.active]: pathname === "cover-photo" })}
            title={formatMessage(messages.setCover)}
          >
            <a className={cx(s.linkReset, s.progressStep)} onClick={() => nextPage("cover-photo")} href="javascript:void(0);">
              <FormattedMessage {...messages.setCover} />
            </a>
          </div>
        }

        <div>
          <ProgressBar className={s.leanProgress} />
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(TabBarStep2));

