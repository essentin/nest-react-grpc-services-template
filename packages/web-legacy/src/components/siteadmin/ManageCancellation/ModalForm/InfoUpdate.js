import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForm.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';

// Style
import {
	Button,
	Row,
	FormGroup,
	Col,
	ControlLabel,
	FormControl,
	Panel
} from 'react-bootstrap';


class InfoUpdate extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		initialValues: PropTypes.object,
	};

	static defaultProps = {
		data: []
	};

	renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
		return (
			<FormGroup>
				{touched && error && <span className={s.errorMessage}>{error}</span>}
				<FormControl
					{...input}
					className={className}
					componentClass="textarea"
					placeholder={label}
					rows={10}
				>
					{children}
				</FormControl>
			</FormGroup >
		);
	}


	render() {
		const { error, handleSubmit, submitting, dispatch, initialValues, title } = this.props;
		const { data } = this.props;

		return (
			<div>
				<h1 className={s.headerTitle}>{title}</h1>
				<Col xs={12} sm={12} md={12} lg={12} className={cx(s.blockcenter, s.noMarginTop)}>
					<Panel className={s.panelHeader}>
						<form onSubmit={handleSubmit(submit)}>
							{error && <strong>{error}</strong>}
							<Field name="cancellationInfo" type="text" component={this.renderFormControlTextArea} />
							<FormGroup className={s.formGroup}>
								<Row>
									<Col xs={12} sm={12} md={12} lg={12}>
										<Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >Save</Button>
									</Col>
								</Row>
							</FormGroup>
						</form>
					</Panel>
				</Col>
			</div>
		);
	}

}

InfoUpdate = reduxForm({
	form: 'InfoUpdateForm', // a unique name for this form
	validate
})(InfoUpdate);

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(InfoUpdate)));



