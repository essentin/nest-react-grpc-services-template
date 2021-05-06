import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForm.css';
import {
  Modal
} from 'react-bootstrap';

import InfoUpdate from './InfoUpdate';

import { closeCancelModal } from '../../../../actions/siteadmin/modalActions';

class ModalForm extends Component {
  static propTypes = {
    closeCancelModal: PropTypes.any.isRequired,
    cancelModal: PropTypes.bool
  };

  static defaultProps = {
    cancelModal: false
  };

  render() {
    const { closeCancelModal, cancelModal, cancellationInfo } = this.props;
    let initialValues = {
      cancellationInfo: cancellationInfo
    }
    return (
      <div>
        <Modal show={cancelModal} onHide={closeCancelModal} dialogClassName={s.logInModalContainer} >
          <Modal.Header closeButton>
            <Modal.Title>Update Information</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                <InfoUpdate initialValues={initialValues} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapState = (state) => ({
  cancelModal: state.adminModalStatus.cancelModal,
  cancellationInfo: state.siteSettings.data.cancellationInfo,
});

const mapDispatch = {
  closeCancelModal,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ModalForm));
