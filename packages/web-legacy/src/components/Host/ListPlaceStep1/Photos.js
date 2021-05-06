// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Row,
  FormGroup,
  Col
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Internal Component
import PhotosUpload from '../../PhotosUpload/PhotosUpload';

// Validate
import updateStep2 from './updateStep2';

// Helpers
import validateStep2 from './validateStep2';

class Photos extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    photosCount: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisable: true
    };
  }

  componentWillMount() {
    const { photosCount } = this.props;

    if (photosCount > 0) {
      this.setState({ isDisable: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { photosCount } = nextProps;

    if (photosCount > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { nextPage, previousPage, listId } = this.props;
    const { isDisable } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={10} lg={10} className={s.landingContent}>
            <div>
              <h3 className={s.landingContentTitle}><FormattedMessage {...messages.photoLabel} /></h3>
              <div>
                <p className={s.subContent}>
                <FormattedMessage {...messages.photoLabelDesc} />
                </p>
              </div>
              <form>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                    <PhotosUpload listId={listId} placeholder={formatMessage(messages.photosPlaceholder)} />
                  </FormGroup>
                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButtonMap}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("instructions")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} disabled={isDisable} onClick={() => nextPage("cover-photo")}>
                          <FormattedMessage {...messages.next} />
                        </Button>
                      </Col>
                    </FormGroup>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Photos = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2,
  validate: validateStep2,
})(Photos);

const mapState = (state) => ({
  photosCount: state.location.photosCount
});
const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Photos)));







