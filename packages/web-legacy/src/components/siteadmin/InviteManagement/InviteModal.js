import React from 'react'

//redux
import { connect } from 'react-redux'

//redux form
import { Field, reduxForm } from 'redux-form';
import validate from './validate'
import submit from './submit'

// Translation
import { injectIntl } from 'react-intl';

// graphql
import { compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import cx from 'classnames';

import s from './InviteManagement.css';

// redux actions
import { closeModal } from '../../../actions/siteadmin/Invites/sendInviteModal'

function InviteModal(props) {
    const { show, closeModal, error, submitting, handleSubmit, intl: { formatMessage } } = props




    return (
        <Modal show={show} onHide={() => closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>Send Invite</Modal.Title>
            </Modal.Header>
            <Modal.Body bsClass={s.logInModalBody}>
                <div className={s.root}>
                    <div className={s.container}>
                        <form onSubmit={handleSubmit(submit)}>
                            {error && <strong>{formatMessage(error)}</strong>}
                            <Field
                                name="firstName"
                                type="text"
                                component={RenderFormControl}
                                label={'First Name'}
                                className={cx(s.formControlInput)}
                                formatMessage={formatMessage}
                            />
                            <Field
                                name="email"
                                type="email"
                                component={RenderFormControl}
                                label={'Email'}
                                className={cx(s.formControlInput)}
                                formatMessage={formatMessage}
                            />
                            <button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}>Send</button>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const RenderFormControl = ({ input, label, type, meta: { touched, error }, className, formatMessage }) => {
    return (
        <FormGroup className={s.formGroup}>
            <label>{label}</label>
            <FormControl {...input} placeholder={label} type={type} className={className} />
            {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        </FormGroup>
    )
}

InviteModal = reduxForm({
    form: "Invites", // a unique name for this form
    validate,
})(InviteModal);

const mapState = (state) => ({
    show: state.invite.showInviteModal,
});

const mapDispatch = {
    closeModal
};



export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch)
)(InviteModal)
