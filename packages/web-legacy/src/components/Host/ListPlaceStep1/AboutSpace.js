// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

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
  Col,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';


// Helpers
import validateStep2 from './validateStep2';

import updateStep2 from './updateStep2';

class AboutSpace extends Component {

  static propTypes = {
    previousPage: PropTypes.any,
    nextPage: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    };
  }

  componentWillMount() {
    const { valid } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { valid } = nextProps;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
          minLength={50}
        />
        {touched && error && <span className={cx(s.errorMessage, s.textAreaContent)}>{formatMessage(error)}</span>}
        {(!touched || !error) && <span className={cx(s.description, s.textAreaContent)}>{formatMessage(messages.descriptionMinLen)}</span>}
      </div>
    )
  }

  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <FormControl {...input} placeholder={label} type={type} className={className} maxLength={50} />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  renderFormControlAddOn = ({ input, label, type, meta: { touched, error }, className, suffix }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.inputAddon, 'BecomeHostAddon')}>
        <InputGroup>
          <FormControl {...input} type={type} className={className} maxLength={10} />
          <InputGroup.Addon className={s.addonStyle}>
            {suffix}
          </InputGroup.Addon>
        </InputGroup>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    )
  }

  render() {
    const { handleSubmit, nextPage, previousPage } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled } = this.state;
    const withDotParser = (number) => number ? number.replace(/[^\d\.]/g, '') : '';

    return (
      <Grid fluid>
        <Row className={s.landingContainer}>
          <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
            <div>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <h3 className={s.landingContentTitle}>
                    <FormattedMessage {...messages.aboutSpaceTitle} />
                  </h3>
                  <div className={s.spaceTop4}>
                    <p className={cx(s.fontSize2, s.textPrimaryColor, s.space1, s.lineHeight1, s.subContent)}>
                      <FormattedMessage {...messages.aboutSpaceTitledesc1} />
                    </p>
                    <p className={cx(s.fontSize2, s.textPrimaryColor, s.space3, s.lineHeight1, s.subContent, s.spaceTop1)}>
                      <FormattedMessage {...messages.aboutSpaceTitledesc2} />
                    </p>
                  </div>
                  <Row>
                    <Col lg={10} md={10} sm={10} xs={12}>
                      <FormGroup className={cx(s.formGroup, s.marginTopForm)}>
                        <Field name="title"
                          type="text"
                          component={this.renderFormControl}
                          label={formatMessage(messages.titleLabel)}
                          className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr className={s.horizantalMargin} />

                  <h3 className={s.landingContentTitle}>
                    <FormattedMessage {...messages.aboutSpaceTitle1} />
                  </h3>
                  <div>
                    <p className={s.subContent}>
                      <FormattedMessage {...messages.aboutSpaceSubTitle1} />
                    </p>
                  </div>
                  <div>
                    <label className={cx(s.landingSaftyTitle, s.fontWeight)}>
                      <FormattedMessage {...messages.aboutSpaceSubTitle2} />
                    </label>
                    <div className={s.space5}>
                      <p className={s.listContect}>
                        <span className={s.fontWeight}><FormattedMessage {...messages.ContactInformation} /></span>{' '}
                        <span><FormattedMessage {...messages.ContactInformationDesc1} /></span>
                      </p>
                    </div>
                  </div>
                  <FormGroup className={s.formGroup}>
                    <Field name="description"
                      component={this.renderFormControlTextArea}
                      className={s.textareaInput}
                      label={formatMessage(messages.descriptionLabel)}
                    />
                    {/* <div className={s.textAreaContent}><FormattedMessage {...messages.descriptionMinLen} /></div> */}
                  </FormGroup>

                </div>
                <div className={s.nextPosition}>
                  <div className={s.nextBackButton}>
                    <hr className={s.horizontalLineThrough} />
                    <FormGroup className={s.formGroup}>
                      <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                        <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("home")}>
                          <FormattedMessage {...messages.back} />
                        </Button>
                        <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={() => nextPage("house-rules")} disabled={isDisabled} >
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

AboutSpace = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validateStep2,
  onSubmit: updateStep2
})(AboutSpace);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AboutSpace)));
