import React from 'react';

import { connect } from 'react-redux';

import { Modal } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './BookingModal.css';

import CalendarContainer from '../CalendarContainer';

import { closeHomeBookingModal } from '../../../actions/modalActions'

class BookingModal extends React.Component {

  render() {
    const { closeHomeBookingModal, homeBookingModalStatus, listId } = this.props;
    const { homeCardModalStatus } = this.props;

    return (
      <div>
        <Modal show={homeBookingModalStatus} animation={false} className={'commonBookingModal'}>
            <div>
              <CalendarContainer listId={listId} modalOpen={homeCardModalStatus} />
            </div>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  homeBookingModalStatus: state.modalStatus.homeBookingModalStatus,
  homeCardModalStatus: state.modalStatus.homeCardModalStatus,
  listId: state.modalStatus.homepageListId,
});

const mapDispatch = {
  closeHomeBookingModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(BookingModal));