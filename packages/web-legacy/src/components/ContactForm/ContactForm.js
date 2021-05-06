// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux Form
import { Field, reduxForm, reset } from 'redux-form';

import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

import { sendEmail } from '../../core/email/sendEmail';

import { toastr } from 'react-redux-toastr';

import { googleCaptcha, adminEmail } from '../../config';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ContactForm.css';
import {
    Grid,
    Row,
    Col,
    FormControl,
} from 'react-bootstrap';


// Internal Components
import Loader from '../Loader';

//Images
import FlowPassLogo from '../../../public/NewIcon/group.svg';

class ContactForm extends Component {
    static propTypes = {
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            contactLoading: false,
            show: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(values, dispatch) {
        let content = {
            phoneNumber: values.phoneNumber,
            name: values.name,
            email: values.email,
            ContactMessage: values.ContactMessage
        };
        this.setState({
            contactLoading: true
        })
        const { status } = await sendEmail(adminEmail, 'contact', content);
        this.setState({
            contactLoading: false
        })
        if (status === 200) {
            toastr.success("Success!", "Your email has been sent.");
            dispatch(reset('ContactForm'));
            this.setState({
                show: true
            })
        } else {
            toastr.error("Error!", "Sorry, something went wrong. Please try again!");
        }
        // grecaptcha.reset();
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl {...input} type={type} className={className} disabled={isDisabled} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl
                    {...input}
                    className={className}
                    componentClass="textarea"
                    // rows='5'
                >
                    {children}
                </FormControl>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    render() {
        const { error, handleSubmit, submitting, dispatch, pristine } = this.props;
        const { formatMessage } = this.props.intl;
        const { contactLoading, show } = this.state;
        // const title = <h3>{formatMessage(messages.Required)}</h3>;
        // const { email, phoneNumber, address } = this.props;

        return (
            <Grid fluid>
                {show ? <Row>
                    <div className={s.thankYouPage}>
                        <div><img src={FlowPassLogo} className={s.siteLogo} /></div>
                        <h1 className={cx(s.contactTitle, s.titleLineHeight)}><FormattedMessage {...messages.thankYouTitle} /></h1>
                        <p className={cx(s.thankYouSubTitle, s.space1)}><FormattedMessage {...messages.thankYouTitleDesc1} /></p>
                        <p className={s.thankYouSubTitle}><FormattedMessage {...messages.thankYouTitleDesc2} /></p>
                    </div>
                </Row> : <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className={cx(s.marginTop, s.space2)}>
                            <div>
                                <div>
                                    <h1 className={s.contactTitle}>
                                        <FormattedMessage {...messages.contactForm} />
                                    </h1>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className={cx(s.formBackground, 'inputFocusColor')}>
                                <div className={s.formContainerHeader}>
                                    <h2 className={s.captionText}>
                                        <FormattedMessage {...messages.contactFormInformation} />
                                    </h2>
                                </div>
                                <div className={s.formContainer}>
                                    {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                                    <form onSubmit={handleSubmit(this.handleClick)} >
                                        <Row className={cx(s.formGroup, s.borderSection)}>
                                            <Col xs={12} sm={6} md={6} lg={6} className={cx(s.noPadding, s.nameBorder)}>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <label className={s.labelText} >{formatMessage(messages.Nameincontact)}</label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Field name="name"
                                                        type="text"
                                                        component={this.renderFormControl}
                                                        className={cx(s.formControlInput, s.backgroundTwo, 'inputCsv', 'CardFormInput')}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} sm={6} md={6} lg={6} className={cx(s.noPadding, s.phoneNumberBorder)}>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <label className={s.labelText} >{formatMessage(messages.phoneNumber)}</label>
                                                </Col>
                                                <Col xs={12} sm={12} md={12} lg={12}>
                                                    <Field name="phoneNumber"
                                                        type="text"
                                                        component={this.renderFormControl}
                                                        className={cx(s.formControlInput, s.backgroundThree, 'inputCsv', 'CardFormInput')}
                                                    />
                                                </Col>
                                            </Col>
                                        </Row>
                                        <Row className={cx(s.formGroup, s.borderSection)}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelText} >{formatMessage(messages.email)}</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field name="email"
                                                    type="text"
                                                    component={this.renderFormControl}
                                                    className={cx(s.formControlInput, s.backgroundOne, 'inputCsv', 'CardFormInput')}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className={cx(s.formGroup, s.borderSection)}>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <label className={s.labelText} >{formatMessage(messages.ContactMessage)}</label>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <Field name="ContactMessage"
                                                    type="text"
                                                    component={this.renderFormControlTextArea}
                                                    className={cx(s.formControlInput, s.backgroundFour, 'inputCsv', 'CardFormInput', s.textAreaSection)}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className={cx(s.formGroup, s.btnPadding)}>
                                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop4, s.space4)}>
                                                <Loader
                                                    type={"button"}
                                                    buttonType={"submit"}
                                                    className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                                    disabled={submitting}
                                                    show={contactLoading}
                                                    label={formatMessage(messages.sendmail)}
                                                />
                                            </Col>
                                        </Row>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>}
            </Grid>
        )
    }

}

ContactForm = reduxForm({
    form: 'ContactForm', // a unique name for this form
    validate
})(ContactForm);


const mapState = (state) => ({
    email: state.siteSettings.data.email,
    phoneNumber: state.siteSettings.data.phoneNumber,
    address: state.siteSettings.data.address
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ContactForm)));