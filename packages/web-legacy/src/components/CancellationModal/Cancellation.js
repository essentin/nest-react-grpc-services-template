import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

// Style
import {
  Modal,
  Form,
  Button
} from 'react-bootstrap';
import { Table, Tr, Td } from 'reactable';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Actions
import { closeCancellationModal } from '../../actions/CancellationModal/modalActions';

// Icons
import DeskIcon from '../../../public/NewIcon/desk.svg';
import LoungeIcon from '../../../public/NewIcon/lounge.svg';
import MeetingIcon from '../../../public/NewIcon/meeting.svg';

// Helper
import submit from './submit';

// Locale
import messages from '../../locale/messages';

class Cancellation extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { cancellationModal, closeCancellationModal } = this.props;
    const { listData, activityType, confirmationCode, checkIn } = this.props;
    const { formatMessage } = this.props.intl;
    const { handleSubmit } = this.props;
    let checkInDate = moment(checkIn).format('YYYY-MM-DD');
    let activityIcon;
    if (activityType) {
      activityIcon = Number(activityType) === 1 ? DeskIcon : Number(activityType) === 2 ? LoungeIcon : MeetingIcon;
    }
    return (
      <div className={s.root}>
        <Modal show={cancellationModal} onHide={closeCancellationModal} animation={false} dialogClassName={cx('signupModal', 'NewSignUpModal', 'cancelBooking', 'cancelBookingModal')} >
          <div>
            <Modal.Header className={s.modalHeading}>
              <Modal.Title><FormattedMessage {...messages.cancelBookingModalTitle} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={cx('table-responsive', 'bookingTable', 'cancelBookingModal')}>
                <div className={s.space2}>
                  <span className={s.subText}><FormattedMessage {...messages.cancellationModalHeading} /></span><span>.</span>
                </div>
                <Form onSubmit={handleSubmit(submit)}>
                  <Table className="table">
                    <Tr>
                      <Td column={formatMessage(messages.where)} data={listData &&
                        listData.title} />
                      <Td column={formatMessage(messages.space)} className={cx(s.textAlignCenter, s.spaceIconWidth)}>
                        <img src={activityIcon} />
                      </Td>
                      <Td column={formatMessage(messages.when)} className={cx(s.textAlignDate)} data={checkInDate && checkInDate} />
                      <Td column={formatMessage(messages.cCode)} data={confirmationCode && confirmationCode} />
                    </Tr>
                  </Table>
                  <div className={s.paddingTop3}>
                    <div className={s.displayInlineBtn}>
                      <Button onClick={closeCancellationModal} className={s.aboutBtn}>
                        <FormattedMessage {...messages.abortCancellation} />
                      </Button>
                    </div>
                    <div className={cx(s.displayInlineBtn, s.textAlignRight)}>
                      <Button type="submit" className={s.calcelBtn}>
                        <FormattedMessage {...messages.cancelBookingModalTitle} />
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    )
  }
}

Cancellation = reduxForm({
  form: 'CancellationForm',
  onSubmit: submit
})(Cancellation);

const selector = formValueSelector('CancellationForm');

const mapState = (state) => ({
  cancellationModal: state.modalStatus.cancellationModal,
  listData: selector(state, 'listData'),
  activityType: selector(state, 'activityType'),
  confirmationCode: selector(state, 'confirmationCode'),
  checkIn: selector(state, 'checkIn')
});

const mapDispatch = {
  closeCancellationModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Cancellation)));