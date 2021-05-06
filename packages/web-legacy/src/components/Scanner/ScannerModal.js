import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import {
  Modal
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ScannerModal.css';

import ScannerResult from './ScannerResult';

import { closeScannerModal } from '../../actions/modalActions';

import messages from '../../locale/messages';

//Images
import ScannerImage from '../../../public/NewIcon/qr-code-scanner.png';

class ScannerModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: null,
      torch: false,
      showTorch: false
    };
    this.handleScan = this.handleScan.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleTorch = this.toggleTorch.bind(this);
    this.clearResult = this.clearResult.bind(this);
    this.QrReader = null;
    this.tracks = null;
  }

  componentDidMount() {
    if (typeof window != 'undefined') {
      this.QrReader = require('react-qr-reader');
      // if (navigator && navigator.mediaDevices) {
      //   let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
      //   console.log(supportedConstraints);
      //   window.alert(supportedConstraints)
      //   if (supportedConstraints && supportedConstraints.length > 0 && supportedConstraints.includes('torch')) {
      //   console.log('having torch');
      //     this.setState({ showTorch: true });
      //   }
      // }
    }
  }

  clearResult() {
    this.setState({ result: null })
  }

  async toggleTorch() {
    const { torch } = this.state;

    const mediaDevices = navigator && navigator.mediaDevices;
    if (mediaDevices && !torch) {
      let devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices && devices.filter((device) => device.kind === 'videoinput');

      if (cameras && cameras.length > 0) {
        const camera = cameras[cameras.length - 1];
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: camera.deviceId,
            facingMode: ['user', 'environment']
          }
        });
        this.tracks = stream.getVideoTracks();
        if (this.tracks && this.tracks[0]) {
          this.tracks[0].applyConstraints({ advanced: [{ torch: true }] });
          this.setState({ torch: true });
        }
      }
    } else if (torch) {
      if (this.tracks && this.tracks[0]) {
        this.tracks[0].applyConstraints({ advanced: [{ torch: false }] });
        this.tracks.forEach((track) => track.stop());
        this.tracks = null;
      }
      this.setState({ torch: false });
    }
  }

  handleScan(result) {
    this.setState({ result })
  }

  handleError(err) {
    console.error(err)
  }

  closeModal() {
    const { closeScannerModal } = this.props;
    this.setState({ result: null });
    closeScannerModal();
  }


  render() {
    const { isOpen } = this.props;
    const { result, showTorch } = this.state;
    const { formatMessage } = this.props.intl;
    const previewStyle = {
      width: '100%',
      height: '100vh',
    }
    const QrReader = this.QrReader

    return (
      <div>
        <Modal
          show={isOpen}
          animation={false}
          onHide={this.closeModal}
          className={'qrModalScanner'}
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body >
            {result && <ScannerResult listId={+result} closeModal={this.closeModal} clearResult={this.clearResult} />}
            {
              !result && this.QrReader && <div className={'qr-image-wrapper'}>
                <QrReader
                  delay={500}
                  style={previewStyle}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  showViewFinder={false}
                />
                <div className={s.qrImageScetion}>
                  <img src={ScannerImage} className={s.qrImage} />
                </div>
                {/* {
                  showTorch && <div onClick={this.toogleTorch} id='torch' >{formatMessage(messages.torch)}</div>
                } */}
                <div onClick={this.closeModal} className={s.qrCloseBtn}>{formatMessage(messages.close)}</div>
              </div>
            }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapState = (state) => ({
  isOpen: state.modalStatus.scannerModal,
});

const mapDispatch = {
  closeScannerModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(ScannerModal);