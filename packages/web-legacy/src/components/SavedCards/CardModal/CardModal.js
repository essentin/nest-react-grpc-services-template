import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Modal
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CardModal.css';
import messages from '../../../locale/messages';
import { closeCardModal } from '../../../actions/modalActions';
import CardForm from '../../CardForm/CardForm'
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';

class CardModal extends Component {


	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {

	}

	render() {
		const { closeCardModal, cardModalStatus, handleClick } = this.props;

		return (
			<div>
				<Modal
					show={cardModalStatus}
					animation={false}
					dialogClassName={cx(s.signupModalContainer, 'signupModal', 'NewSignUpModal', 'cardFormModal')} 
				>
					<Modal.Body >
						<Elements>
							<CardForm page={'cards'} handleClick={handleClick} show={true} />
						</Elements>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const mapState = (state) => ({
	cardModalStatus: state.modalStatus.cardModalStatus,
});

const mapDispatch = {
	closeCardModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CardModal)));