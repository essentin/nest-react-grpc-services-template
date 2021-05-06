
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoResults.css';

import { connect } from 'react-redux';

import WorkplaceSuggestModal from '../WorkplaceSuggestModal/WorkplaceSuggestModal';

import { openWorkplaceSuggestModal } from '../../../actions/modalActions';
import messages from '../../../locale/messages';

class NoResults extends React.Component {

  render() {
    const { suggestWorkplaceFeature, openWorkplaceSuggestModal } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          {suggestWorkplaceFeature && <WorkplaceSuggestModal />}
          <section>
            <h1 className={s.headingText}><span><FormattedMessage {...messages.noResultsTitle} /></span></h1>
            <div className={s.subHeading}>
              <p><FormattedMessage {...messages.noResultsSubTitle} /></p>
              <ul>
                <li>
                  <span><FormattedMessage {...messages.noResultsTerms1} /></span>
                </li>
                <li>
                  <span><FormattedMessage {...messages.noResultsTerms2} /></span>
                </li>
                <li>
                  <span><FormattedMessage {...messages.noResultsTerms3} /></span>
                </li>
              </ul>
            </div>
          </section>
          {suggestWorkplaceFeature && <div onClick={openWorkplaceSuggestModal} className={s.missingBtn}>
            <FormattedMessage {...messages.missingAPlace} />
          </div>}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  suggestWorkplaceFeature: state.featureFlag.suggestWorkspace
});

const mapDispatch = {
  openWorkplaceSuggestModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(NoResults));