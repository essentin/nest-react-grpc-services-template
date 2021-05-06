import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, formValueSelector, } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookButton.css';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import messages from '../../../locale/messages';
import { openHomeBookingModal, openLoginModal, openHomeAddCardModal } from '../../../actions/modalActions'

class BookButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { openHomeBookingModal, listId, account, openLoginModal, openHomeAddCardModal } = this.props;

    if (account && account.userId) {
      openHomeBookingModal(listId)
    } 
    // else if (account && account.userId) {
    //   openHomeAddCardModal()
    //   openHomeBookingModal(listId)
    // } 
    else {
      openLoginModal()
    }
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Button onClick={() => this.handleClick()} className={cx(s.btnPosition, s.btnPrimary)}>{formatMessage(messages.book)}</Button>
      </div>
    );
  }
}
const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  account: state.account && state.account.data
});

const mapDispatch = {
  change,
  openHomeBookingModal,
  openHomeAddCardModal,
  openLoginModal
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(BookButton)),
);
