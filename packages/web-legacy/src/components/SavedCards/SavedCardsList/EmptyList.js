import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Panel,
  Button
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EmptyList.css';

// Redirection
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';
import { openCardModal } from '../../../actions/modalActions';
import CardModal from '../CardModal';

class EmptyList extends Component {


  handleClick = () => {
    const { openCardModal } = this.props;
    openCardModal()
  }

  render() {
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <CardModal />
        <Panel className={cx(s.panelHeader)} header={formatMessage(messages.savedCard)} >
          <div className={cx(s.spaceTop3, s.textCenter)}>
            <span className={s.textTitle}><FormattedMessage {...messages.addPaymentDetails} /></span>
          </div>
          <div className={cx(s.spaceTop4, s.space2, s.textCenter)}>
            <Button className={cx(s.button, s.btnlarge, s.btnPrimary)} onClick={this.handleClick}>
              <FormattedMessage {...messages.addCard} />
            </Button>
          </div>
        </Panel>
      </div >
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
});
const mapDispatch = {
  openCardModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EmptyList)));