import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage } from 'react-intl';
import s from './CreateHostModal.css';
import {
  Modal
} from 'react-bootstrap';

import CreateHostForm from './CreateHostForm';

import { closeCreateHostModal } from '../../../../actions/siteadmin/modalActions';

import messages from '../messages';

class CreateHostModal extends Component {
  static propTypes = {
    closeCreateHostModal: PropTypes.any,
    isShow: PropTypes.bool,
  };


  render() {
    const { closeCreateHostModal, isShow } = this.props;

    return (
      <div>
        <Modal show={isShow} onHide={closeCreateHostModal} dialogClassName={s.logInModalContainer} >
          <Modal.Header closeButton>
            <Modal.Title>{<FormattedMessage {...messages.createHost} />}</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <CreateHostForm />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapState = (state) => ({
  isShow: state.adminModalStatus.createHostModal
});

const mapDispatch = {
  closeCreateHostModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(CreateHostModal));