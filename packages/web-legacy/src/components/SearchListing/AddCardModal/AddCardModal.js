import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Button,
	Grid,
	Row,
	Col,
	Modal
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddCardModal.css';
import messages from '../../../locale/messages';
import { closeHomeAddCardModal } from '../../../actions/modalActions';
import CardForm from '../../CardForm/CardForm'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { Elements } from 'react-stripe-elements';

class AddCardModal extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {

	}

	render() {
		const { closeHomeAddCardModal, homeCardModalStatus, handleClick } = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<Modal
					show={homeCardModalStatus}
					animation={false}
				>
					<Modal.Header closeButton>
						<Modal.Title></Modal.Title>
					</Modal.Header>
					<Modal.Body >
						<Elements>
							<CardForm page={'home'} handleClick={handleClick} />
						</Elements>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const mapState = (state) => ({
	homeCardModalStatus: state.modalStatus.homeCardModalStatus,
});

const mapDispatch = {
	closeHomeAddCardModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AddCardModal)));