import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Field, reduxForm, getFormSyncErrors, submit, change, formValueSelector } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { toastr } from 'react-redux-toastr';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
    Grid,
    Button,
    Row,
    FormGroup,
    Col,
    ControlLabel,
    FormControl,
    InputGroup
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';

import CountryList from '../../CountryList/CountryList';

import update from './update';
import validate from './validate';
import { isEmpty } from '../../../helpers/mergeObjects';


import messages from '../../../locale/messages';

class ContactHost extends Component {

    static propTypes = {
        previousPage: PropTypes.any,
        nextPage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            isDisabled: false,
            countryCode: 'SE',
            country: '+46',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl {...input} placeholder={label} type={type} className={className} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    componentDidMount() {
        const { countryCode, contactDialCode: country } = this.props;
        countryCode && country && this.setState({
            country,
            countryCode
        });
    }

    componentWillReceiveProps(nextProps) {
        const { step1Errors, countryCode, contactDialCode: country } = nextProps;
        this.setState({
            isDisabled: isEmpty(step1Errors) ? false : true
        })
        countryCode && country && this.setState({
            country,
            countryCode
        });
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <FormControl componentClass="select" {...input} className={className} >
                    {children}
                </FormControl>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }
    renderFormControlCurrency = ({ input, label, type, meta: { touched, error }, className, country }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.margintop15}>
                <InputGroup>
                    <InputGroup.Addon className={s.addonStyle}>
                        {country}
                    </InputGroup.Addon>
                    <FormControl {...input} placeholder={label} type={type} className={className} />
                </InputGroup>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }
    async handleSubmit() {
        const { submit } = this.props;
        const { step1Errors } = this.props;
        if (isEmpty(step1Errors)) {
            await submit('ListPlaceStep1');
        } else {
            toastr.error('Error!', 'It seems you have missed required fields. Please fill them.')
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleCountryChange(e, selectedData) {
        const { change } = this.props;
        change('countryCode', selectedData.countryCode);
        change('contactDialCode', selectedData.dialCode);
        this.setState({
            country: selectedData.dialCode,
            countryCode: selectedData.countryCode
        });
    }

    render() {
        const { handleSubmit, previousPage, isDisabled } = this.props;
        const { formatMessage } = this.props.intl;
        const { isDisabled: disabled } = this.state;
        const { country, countryCode } = this.state;

        return (
            <Grid fluid>
                <Row className={s.landingContainer}>
                    <Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
                        <div>
                            <h3 className={s.landingContentTitle}>
                                <FormattedMessage {...messages.contact} />
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className={cx(s.landingMainContent, s.spaceTop4, s.paddingTop2)}>
                                    <Row>
                                        <Col xs={12} sm={10} md={8} lg={8} className={s.space3}>
                                            <FormGroup className={s.formGroup}>
                                                <ControlLabel className={s.landingLabel}>
                                                    <FormattedMessage {...messages.name} />
                                                </ControlLabel>
                                                <Field
                                                    name="contactName"
                                                    component={this.renderFormControl}
                                                    className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                                                    label={formatMessage(messages.name)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={10} md={8} lg={8} className={s.space3}>
                                            <FormGroup className={s.formGroup}>
                                                <ControlLabel className={s.landingLabel}>
                                                    <FormattedMessage {...messages.email} />
                                                </ControlLabel>
                                                <Field
                                                    name="contactEmail"
                                                    component={this.renderFormControl}
                                                    className={cx(s.formControlInput, s.jumboInput, s.requiedBorder)}
                                                    label={formatMessage(messages.email)}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={10} md={8} lg={8} className={s.space3}>
                                            <ControlLabel className={s.landingLabel}>
                                                <FormattedMessage {...messages.phoneNumber} />
                                            </ControlLabel>
                                            <CountryList
                                                input={
                                                    {
                                                        name: 'countryCode',
                                                        onChange: this.handleChange,
                                                        value: countryCode,
                                                    }
                                                }
                                                isFrom
                                                className={cx(s.formControlSelect, s.jumboInput, s.requiedBorder, s.formControlSelectNew)}
                                                dialCode={false}
                                                getSelected={this.handleCountryChange}
                                                formName={'ListPlaceStep1'}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={10} md={8} lg={8} className={s.space3}>
                                            <FormGroup className={s.formGroup}>
                                                <Field


                                                    name="contactPhoneNumber"
                                                    type="text"
                                                    component={this.renderFormControlCurrency}
                                                    label={formatMessage(messages.phoneNumber)}
                                                    className={cx(s.formControlInput)}
                                                    // onChange={this.handleChange}
                                                    country={country}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                </div>

                                <div className={s.nextPosition}>
                                    <div className={s.nextBackButton}>
                                        <hr className={s.horizontalLineThrough} />
                                        <FormGroup className={s.formGroup}>
                                            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                                <Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("moods")}>
                                                    <FormattedMessage {...messages.back} />
                                                </Button>

                                                <Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} onClick={this.handleSubmit} disabled={disabled}>
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
        )
    }
}

ContactHost = reduxForm({
    form: 'ListPlaceStep1', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate,
    onSubmit: update
})(ContactHost);
const selector = formValueSelector('ListPlaceStep1');

const mapState = (state) => ({
    step1Errors: getFormSyncErrors('ListPlaceStep1')(state),
    countryCode: selector(state, 'countryCode'),
    contactDialCode: selector(state, 'contactDialCode'),
});

const mapDispatch = {
    submit,
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ContactHost)));