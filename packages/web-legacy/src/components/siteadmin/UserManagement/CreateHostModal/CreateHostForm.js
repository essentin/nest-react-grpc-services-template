import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
    Button,
    FormGroup,
    Col,
    Row,
    FormControl
} from 'react-bootstrap';

import s from './CreateHostModal.css';

import submit from './submit';
import validate from './validate';
import messages from '../messages';

class CreateHostForm extends Component {

    renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl {...input} placeholder={label} type={type} className={className} />
            </div>
        )
    }

    render() {
        const { error, handleSubmit, submitting } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <form onSubmit={handleSubmit(submit)}>
                    {error && <strong>{formatMessage(error)}</strong>}
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.firstName)}</label>
                        <Field
                            name="firstName"
                            type="text"
                            component={this.renderFormControl}
                            label={formatMessage(messages.firstName)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.lastName)}</label>
                        <Field
                            name="lastName"
                            type="text"
                            component={this.renderFormControl}
                            label={formatMessage(messages.lastName)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.email)}</label>
                        <Field
                            name="email"
                            type="text"
                            component={this.renderFormControl}
                            label={formatMessage(messages.email)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.zipcode)}</label>
                        <Field
                            name="zipcode"
                            type="text"
                            component={this.renderFormControl}
                            label={formatMessage(messages.zipcode)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.password)}</label>
                        <Field
                            name="password"
                            type="password"
                            component={this.renderFormControl}
                            label={formatMessage(messages.password)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                        <Row>
                            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.btnAlignRight)}>
                                <Button className={cx(s.button, s.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                                {formatMessage(messages.create)}
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

CreateHostForm = reduxForm({
    form: "CreateHostForm", // a unique name for this form
    destroyOnUnmount: true,
    validate
})(CreateHostForm);
 
const selector = formValueSelector("CreateHostForm"); // <-- same as form name

const mapState = (state) => ({
    isEnable: selector(state, 'isEnable'),
    activityTypeList: state.activityType,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CreateHostForm)));