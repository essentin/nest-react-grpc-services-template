import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Uploader.css';
import * as FontAwesome from 'react-icons/lib/fa';

// Redux
import { connect } from 'react-redux';


// Component
import DropZone from './DropZone';
import Loader from '../../../Loader';
// Asset
import defaultPic from './no-image-available.png';
import { doRemoveCancellation } from '../../../../actions/siteadmin/manageCancellation';

class Uploader extends React.Component {

  static propTypes = {
    values: PropTypes.any,
    cancellationLoading: PropTypes.bool,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    cancellationLoading: false,
  };

  render() {
    const { cancellationLoading, values, doRemoveCancellation } = this.props;
    let loading = true;
    if (values) {
      loading = false;
    }
    return (
      <Row className={'adminUploader'}>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <Loader
            show={cancellationLoading}
            type={"page"}
          >
            <div className={s.picContainer}>

              <div className={s.profilePic}>
                {
                  loading && <div>Loading...</div>
                }
                {
                  !loading && values.image != null && <img
                    src={'/images/cancellation/medium_' + values.image}
                    style={{width: '100%', maxHeight: '100%'}}
                    alt="cancellation"
                  />
                }
                {
                  !loading && values.image === null && <img
                    src={defaultPic}
                    height={200}
                    width={200}
                    alt="defaultPicture"
                  />
                }
              </div>
              {
                  !loading && values.image != null && <a href="javascript:void(0);" onClick={() => doRemoveCancellation(values.image, values.id)}>
                    <FontAwesome.FaTrash className={s.trashIcon} />
                  </a>
                }
            </div>
          </Loader>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <Col xs={12} sm={12} md={12} lg={12} className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.noPadding)}>
            <DropZone data={values} />
          </Col>
        </Col>
      </Row>
    );
  }
}

const mapState = (state) => ({
  cancellationLoading: state.popularLocation.cancellationLoading,
});

const mapDispatch = {
  doRemoveCancellation
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
)(Uploader);
