import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';

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

import s from './WorkplaceSuggestModal.css';

import submit from './submit';
import validate from './validate';
import { closeWorkplaceSuggestModal } from '../../../actions/modalActions';
import messages from '../../../locale/messages';

class WorkplaceSuggestModal extends Component {


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
        const { closeWorkplaceSuggestModal, isOpenModal, handleSubmit, error, submitting } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <Modal
                    show={isOpenModal}
                    animation={false}
                    onHide={closeWorkplaceSuggestModal}
                    dialogClassName={cx(s.logInModalContainer, 'loginModal', 'signupModal', 'NewSignUpModal', 'meetModal')}
                >
                    <Modal.Header closeButton>
                        <Modal.Title><FormattedMessage {...messages.suggestModalTitle} /></Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <form onSubmit={handleSubmit(submit)}>
                            <Row>
                                {error && <strong className={cx(s.errorMessage, 'commonLoginPadding')}>{<FormattedMessage {...messages.error} />}</strong>}
                                <FormGroup className={cx(s.space1, s.mainPadding)}>
                                    <Field
                                        name="workplaceName"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={<FormattedMessage {...messages.nameOfThePlace} />}
                                        className={cx(s.formControlInput, s.backgroundOne)}
                                    />
                                </FormGroup>
                                <hr className={s.horizontalLineThrough} /> 
                                <FormGroup className={cx(s.space1, s.mainPadding)}>
                                    <Field
                                        name="city"
                                        type="text"
                                        component={this.renderFormControl}
                                        label={<FormattedMessage {...messages.city} />}
                                        className={cx(s.formControlInput, s.backgroundTwo)}
                                    />
                                </FormGroup>
                                <hr className={s.horizontalLineThrough} />
                                <FormGroup className={cx(s.noMargin, s.mainPadding)}>
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space5, s.spaceTop4, s.padding1)}>
                                            <Button className={cx(s.btnPrimary)} type="submit" disabled={submitting}>
                                                <FormattedMessage {...messages.send} />
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

WorkplaceSuggestModal = reduxForm({
    form: 'WorkplaceSuggestForm', // a unique name for this form
    validate,
    destroyOnUnmount: false
})(WorkplaceSuggestModal);

const mapState = (state) => ({
    isOpenModal: state.modalStatus.workplaceSuggestModal,
});

const mapDispatch = {
    closeWorkplaceSuggestModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(WorkplaceSuggestModal)));