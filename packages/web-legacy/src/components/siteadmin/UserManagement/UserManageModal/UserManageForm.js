import React, { Component } from 'react';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import update from './update';
import validate from './validate';

import { injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';

import { connect } from 'react-redux';
import { deleteListSettings } from '../../../../actions/siteadmin/deleteListSettings';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './UserManageModal.css';
import {
    Button,
    FormGroup,
    Col,
    Row,
    FormControl
} from 'react-bootstrap';

class UserManagementForm extends Component {

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
                <form onSubmit={handleSubmit(update)}>
                    {error && <strong>{formatMessage(error)}</strong>}
                    <FormGroup className={s.formGroup}>
                    <label>{formatMessage(messages.maximumInvites)}</label>
                        <Field
                            name="maxInviteCount"
                            type="text"
                            component={this.renderFormControl}
                            label={formatMessage(messages.maximumInvites)}
                            className={cx(s.formControlInput)}
                        />
                    </FormGroup>
                    <FormGroup className={s.formGroup}>
                        <Row>
                            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.btnAlignRight)}>
                                <Button className={cx(s.button, s.btnPrimary)} bsSize="large" type="submit" disabled={submitting}>
                                {messages.save.defaultMessage}
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

UserManagementForm = reduxForm({
    form: "UserManagementForm", // a unique name for this form
    destroyOnUnmount: true,
    validate
})(UserManagementForm);
 
const selector = formValueSelector("UserManagementForm"); // <-- same as form name

const mapState = (state) => ({
    isEnable: selector(state, 'isEnable'),
    activityTypeList: state.activityType,
});

const mapDispatch = {
    deleteListSettings
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(UserManagementForm)));