import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './UserManageModal.css';
import {
  Modal
} from 'react-bootstrap';

import UserManageForm from './UserManageForm';

import { closeManageUserModal } from '../../../../actions/siteadmin/modalActions';

import messages from '../../../../locale/messages';

class ListSettingsModal extends Component {
  static propTypes = {
    closeManageUserModal: PropTypes.any,
    isShow: PropTypes.bool,
  };


  render() {
    const { closeManageUserModal, isShow } = this.props;

    return (
      <div>
        <Modal show={isShow} onHide={closeManageUserModal} dialogClassName={s.logInModalContainer} >
          <Modal.Header closeButton>
            <Modal.Title>{<FormattedMessage {...messages.manageUser} />}</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <UserManageForm />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapState = (state) => ({
  isShow: state.adminModalStatus.manageUserModal
});

const mapDispatch = {
  closeManageUserModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListSettingsModal));