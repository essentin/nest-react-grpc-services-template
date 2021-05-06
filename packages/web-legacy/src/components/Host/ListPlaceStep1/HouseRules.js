// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Helpers
import validateStep2 from './validateStep2';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
	Grid,
	Button,
	Row,
	FormGroup,
	Col,
	FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';


import updateStep2 from './updateStep2';

class HouseRules extends Component {

	static propTypes = {
		previousPage: PropTypes.any,
		nextPage: PropTypes.any
	};

	constructor(props) {
		super(props);
		this.state = {
			isDisabled: true,
		};
	}

	componentDidMount() {
		const { formErrors } = this.props;
		if (formErrors != undefined) {
			if (formErrors.hasOwnProperty('syncErrors')) {
				this.setState({ isDisabled: true });
			} else {
				this.setState({ isDisabled: false });
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const { formErrors } = nextProps;
		if (formErrors != undefined) {
			if (formErrors.hasOwnProperty('syncErrors')) {
				this.setState({ isDisabled: true });
			} else {
				this.setState({ isDisabled: false });
			}
		}
	}

	renderFormControlTextArea = ({ input, label, meta: { touched, error }, className }) => {
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<FormControl
					{...input}
					className={className}
					placeholder={label}
					componentClass={"textarea"}
					minLength={100}
				/>
				{touched && error && <span className={cx(s.errorMessage, s.textAreaContent)}>{formatMessage(error)}</span>}
				{(!touched || !error) && <span className={cx(s.description, s.textAreaContent)}>{formatMessage(messages.houseRuleMinLen)}</span>}
			</div>
		)
	}


	render() {
		const { handleSubmit, nextPage, previousPage } = this.props;
		const { formatMessage } = this.props.intl;
		const { isDisabled } = this.state;

		return (
			<Grid fluid>
				<Row className={s.landingContainer}>
					<Col xs={12} sm={12} md={12} lg={8} className={s.landingContent}>
						<div>
							<form onSubmit={handleSubmit}>
								<div className={s.landingMainContent}>
									<h3 className={cx(s.landingContentTitle)}>
										<FormattedMessage {...messages.whatHouseRules} />
									</h3>
									<div>
										<p className={s.subContent}>
											<FormattedMessage {...messages.whatHouseRulesDesc1} />
										</p>
									</div>
									<FormGroup className={s.formGroup}>
										<Field name="houseRuleDesc"
											component={this.renderFormControlTextArea}
											className={s.textareaInput}
											label={formatMessage(messages.descriptionLabel)}
										/>
										{/* <div className={cx(s.textAlignRight, s.spaceTop4)}><FormattedMessage {...messages.houseRuleMinLen} /></div> */}
									</FormGroup>

									
								</div>
								<div className={s.nextPosition}>
									<div className={s.nextBackButton}>
										<hr className={s.horizontalLineThrough} />
										<FormGroup className={s.formGroup}>
											<Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
												<Button className={cx(s.button, s.btnPrimaryBorder, s.backNextBtn, s.pullLeft)} onClick={() => previousPage("about-your-space")}>
													<FormattedMessage {...messages.back} />
												</Button>
												<Button className={cx(s.button, s.btnPrimary, s.backNextBtn, s.noMarginRight)} disabled={isDisabled} onClick={() => nextPage("instructions")}>
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
		);
	}
}

HouseRules = reduxForm({
	form: 'ListPlaceStep2', // a unique name for this form
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: true,
	validate: validateStep2,
	onSubmit: updateStep2,
})(HouseRules);

const selector = formValueSelector('ListPlaceStep2');


const mapState = (state) => ({
	listingFields: state.listingFields.data,
	formErrors: state.form.ListPlaceStep2,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HouseRules)));
