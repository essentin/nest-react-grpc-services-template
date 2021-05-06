import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { FormattedMessage, injectIntl } from 'react-intl';
import {
    Button,
    Row,
    Col,
    Modal,
    FormGroup,
    FormControl
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ApplyForBetaModal.css';

import submit from './submit';
import validate from './validate';
import { closeApplyForBetaModal } from '../../actions/modalActions';
import messages from '../../locale/messages';

class ApplyForBetaModal extends Component {

    constructor(props) {
        super(props);
    }

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                <label className={s.labelText}>{label}</label>
                <FormControl {...input} type={type} className={className} disabled={isDisabled} />
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
            </div>
        )
    }

    render() {
        const { closeApplyForBetaModal, isOpenModal, handleSubmit, error, submitting } = this.props;

        return (
            <div>
                <Modal
                    show={isOpenModal}
                    animation={false}
                    onHide={closeApplyForBetaModal}
                    dialogClassName={cx(s.logInModalContainer, 'loginModal', 'signupModal', 'NewSignUpModal', 'meetModal', 'appyBetaModal')}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><FormattedMessage {...messages.joinBeta} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <form onSubmit={handleSubmit(submit)}>
                            <Row>
                                {error && <strong className={cx(s.errorMessage, 'commonLoginPadding')}>{<FormattedMessage {...messages.error} />}</strong>}
                                <FormGroup className={cx(s.space1, s.mainPadding)}>
                                    <Field
                                        name="firstName"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={<FormattedMessage {...messages.firstName} />}
                                        className={cx(s.formControlInput, s.backgroundOne)}
                                    />
                                </FormGroup>
                                <hr className={s.horizontalLineThrough} />
                                <FormGroup className={cx(s.space1, s.mainPadding)}>
                                    <Field
                                        name="lastName"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={<FormattedMessage {...messages.lastName} />}
                                        className={cx(s.formControlInput, s.backgroundOne)}
                                    />
                                </FormGroup>
                                <hr className={s.horizontalLineThrough} />
                                <FormGroup className={cx(s.space1, s.mainPadding)}>
                                    <Field
                                        name="email"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={<FormattedMessage {...messages.email} />}
                                        className={cx(s.formControlInput, s.backgroundTwo)}
                                    />
                                </FormGroup>
                                <hr className={s.horizontalLineThrough} /> 
                                <FormGroup className={cx(s.noMargin, s.mainPadding)}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space5, s.spaceTop4, s.padding1)}>
                                            <Button block className={cx(s.btnPrimary, s.button)} type="submit" disabled={submitting}>
                                                <FormattedMessage {...messages.joinBeta} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Row>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

ApplyForBetaModal = reduxForm({
    form: 'ApplyForBetaForm', // a unique name for this form
    validate,
    destroyOnUnmount: false
})(ApplyForBetaModal);

const mapState = (state) => ({
    isOpenModal: state.modalStatus.applyForBetaModal,
});

const mapDispatch = {
    closeApplyForBetaModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ApplyForBetaModal)));