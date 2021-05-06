import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import cx from 'classnames';

import { DayPickerSingleDateController, isInclusivelyAfterDay, isSameDay, DayPickerRangeController } from 'react-dates';

import { START_DATE, END_DATE } from 'react-dates/constants';

// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

// Translation
import { injectIntl } from 'react-intl';

import { formValueSelector, change } from 'redux-form';

class DateRange extends React.Component {
	static propTypes = {
		onChange: PropTypes.any.isRequired,
		numberOfMonths: PropTypes.number.isRequired,
		setPersonalizedValues: PropTypes.any.isRequired,
		formatMessage: PropTypes.any,
		personalized: PropTypes.shape({
			startDate: PropTypes.string,
		})
	};

	static defaultProps = {
		autoFocusEndDate: false,
		showInputs: false,
		keepOpenOnDateSelect: false,
		initialVisibleMonth: null,
		hideKeyboardShortcutsPanel: true,
		noBorder: true,
		startDateOffset: undefined,
		renderCalendarDay: undefined,
		renderDayContents: null,
		minimumNights: 0,
		smallDevice: false,
		verySmallDevice: false
	};

	constructor(props) {
		super(props);
		this.state = {
			focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
			startDate: null,
			focused: false,
			endDate: null,
		};
		this.onDatesChange = this.onDatesChange.bind(this);
		this.onFocusChange = this.onFocusChange.bind(this);
	}

	// componentWillReceiveProps(newProps) {
	// 	const { datesValue } = newProps;
	// 	this.setState({
	// 		startDate: datesValue
	// 	})
	// }

	componentDidMount() {
		const { personalized } = this.props;
		if (personalized != undefined) {
			if (personalized.startDate && personalized.endDate) {
				if (personalized.singleDate) {
					this.setState({
						startDate: moment(personalized.startDate),
						endDate: null
					});
				} else {
					this.setState({
						startDate: moment(personalized.startDate),
						endDate: moment(personalized.endDate)
					});
				}
			} else if (personalized.startDate && !personalized.endDate) {
				this.setState({
					startDate: moment(personalized.startDate),
					endDate: null
				});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const { personalized, datesValue } = nextProps;
		if (personalized != undefined) {
			if (personalized.startDate && personalized.endDate) {
				if (personalized.singleDate) {
					this.setState({
						startDate: moment(personalized.startDate),
						endDate: null
					});
				} else {
					this.setState({
						startDate: moment(personalized.startDate),
						endDate: moment(personalized.endDate)
					});
				}

			} else if (datesValue === null && personalized.startDate != null
				&& personalized.endDate === null) {
				this.setState({
					startDate: moment(personalized.startDate),
					endDate: null
				});
			} else if (datesValue === null && personalized.startDate === null
				&& personalized.endDate === null) {
				this.setState({
					startDate: null,
					endDate: null
				});
			}
		}
	}

	// onDateChange(startDate) {
	// 	const { onChange, setPersonalizedValues, formName, change } = this.props;
	// 	this.setState({ startDate });
	// 	change(formName, 'dates', moment(startDate).format('YYYY-MM-DD'))
	// }

	onDatesChange({ startDate, endDate }) {
		const { onChange, setPersonalizedValues } = this.props;
		this.setState({ startDate, endDate });
		if (startDate != null) {
			setPersonalizedValues({ name: 'startDate', value: moment(startDate).format("YYYY-MM-DD") });
			setPersonalizedValues({ name: 'singleDate', value: true });
			change('SearchForm', 'singleDate', true);
		} else {
			setPersonalizedValues({ name: 'startDate', value: null });
			setPersonalizedValues({ name: 'singleDate', value: false });
			change('SearchForm', 'singleDate', false);
		}

		if (endDate != null) {
			setPersonalizedValues({ name: 'endDate', value: moment(endDate).format("YYYY-MM-DD") });
			setPersonalizedValues({ name: 'singleDate', value: false });
			change('SearchForm', 'singleDate', false);
		} else {
			setPersonalizedValues({ name: 'endDate', value: null });
		}

		if (startDate != null && endDate != null) {
			let newEndDate = moment(endDate).add(1, 'days')
			onChange(`'${moment(startDate).format("YYYY-MM-DD")}' AND '${moment(newEndDate).format("YYYY-MM-DD")}'`);
			setPersonalizedValues({ name: 'singleDate', value: false });
			change('SearchForm', 'singleDate', false);
			setPersonalizedValues({ name: 'startDate', value: moment(startDate).format("YYYY-MM-DD") });
			setPersonalizedValues({ name: 'endDate', value: moment(endDate).format("YYYY-MM-DD") });
		}
	}

	onFocusChange(focusedInput) {
		this.setState({
			// Force the focusedInput to always be truthy so that dates are always selectable
			focusedInput: !focusedInput ? START_DATE : focusedInput,
		});
	}


	render() {
		const { focusedInput, startDate, endDate } = this.state;
		const { smallDevice, verySmallDevice, datesValue } = this.props;
		// let today = moment(), condition = null;
		// condition = day => !isInclusivelyAfterDay(day, today);
		let daySize = (verySmallDevice) ? 35 : 60;
		let verticalHeight = (verySmallDevice) ? '70vh' : '80vh';
		let today = moment(), condition = null;
		condition = day => !isInclusivelyAfterDay(day, today)

		return (
			<div>
				{
					!smallDevice && <div>
						<DayPickerRangeController
							{...this.props}
							focusedInput={focusedInput}
							startDate={(startDate) ? moment(startDate) : null}
							endDate={(endDate) ? moment(endDate) : null}
							onDatesChange={this.onDatesChange}
							onFocusChange={this.onFocusChange}
							numberOfMonths={2}
							isOutsideRange={condition}
							onOutsideClick={() => { console.log('') }}
						/>
						{/* <DayPickerSingleDateController
							{...this.props}
							openDirection={"up"}
							appendToBody={true}
							date={startDate}
							onDateChange={date => this.onDateChange(date)}
							focused={this.state.focused}
							onFocusChange={({ focused }) => this.setState({ focused })}
							numberOfMonths={1}
							id={"id"}
							hideKeyboardShortcutsPanel
							isOutsideRange={condition}
							onOutsideClick={() => { console.log('') }}
							isDayHighlighted={date => datesValue ? (moment(datesValue).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) : false}
						/> */}
					</div>
				}
				{
					smallDevice && <div className={cx('dateRangeSmall')}>
						<DayPickerRangeController
							{...this.props}
							focusedInput={focusedInput}
							startDate={(startDate) ? moment(startDate) : null}
							endDate={(endDate) ? moment(endDate) : null}
							onDatesChange={this.onDatesChange}
							onFocusChange={this.onFocusChange}
							numberOfMonths={1}
							// orientation={'vertical'}
							verticalHeight={verticalHeight}
							withFullScreenPortal
							daySize={daySize}
							isOutsideRange={condition}
							onOutsideClick={() => { console.log('') }}
						/>
						{/* <DayPickerSingleDateController
							{...this.props}
							openDirection={"up"}
							appendToBody={true}
							date={startDate}
							onDateChange={date => this.onDateChange(date)}
							focused={this.state.focused}
							onFocusChange={({ focused }) => this.setState({ focused })}
							numberOfMonths={1}
							id={"id"}
							hideKeyboardShortcutsPanel
							isOutsideRange={condition}
							isDayHighlighted={date => datesValue ? (moment(datesValue).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) : false}
						/> */}
					</div>
				}
			</div>
		);
	}
}


const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
	personalized: state.personalized,
	datesValue: selector(state, 'dates')
});

const mapDispatch = {
	setPersonalizedValues,
	change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(DateRange)));

