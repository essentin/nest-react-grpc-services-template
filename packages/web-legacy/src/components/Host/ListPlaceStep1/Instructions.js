// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Helpers
import validateStep2 from './validateStep2';

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
  Col,
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';


import updateStep2 from './updateStep2';

class Instructions extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };


  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
        />
      </div>
    )
  }


  render() {
    const { handleSubmit, nextPage, previousPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <h3 className={cx(s.landingContentTitle)}>
                    <FormattedMessage {...messages.whatWifiPassword} />
                  </h3>
                  <div>
                    <p className={s.subContent}>
                      <FormattedMessage {...messages.whatWifiPasswordDesc} />
                    </p>
                  </div>
                  <FormGroup className={s.formGroup}>
                    <Field name="wifiName"
                      component={this.renderFormControlTextArea}
                      className={s.textareaInput}
                      label={formatMessage(messages.descriptionLabelWifi)}
                    />
                  </FormGroup>
                  <p className={cx(s.subContent, s.spaceTop2)}>
                    <FormattedMessage {...messages.whatWifiPasswordDesc1} />
                  </p>

                  <hr className={s.horizantalMargin} />

                  <h3 className={cx(s.landingContentTitle)}>
                    <FormattedMessage {...messages.provideArrival} />
                  </h3>
                  <div>
                    <p className={s.subContent}>
                      <FormattedMessage {...messages.provideArrivalDesc} />
                    </p>
                  </div>
                  <FormGroup className={cx(s.formGroup, s.space4)}>
                    <Field name="arrivalInstruction"
                      component={this.renderFormControlTextArea}
                      className={s.textareaInput}
                      label={formatMessage(messages.descriptionLabel)}
                    />
                  </FormGroup>
                </div>

                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("house-rules")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("photos")}>
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

Instructions = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(Instructions);

const selector = formValueSelector('ListPlaceStep2');


const mapState = (state) => ({
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Instructions)));
