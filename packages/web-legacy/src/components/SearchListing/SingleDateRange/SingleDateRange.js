import React from 'react';

import moment from 'moment';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { DayPickerSingleDateController, isInclusivelyAfterDay } from 'react-dates';
import { formValueSelector, change } from 'redux-form';
import { START_DATE, END_DATE } from 'react-dates/constants';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import cx from 'classnames';

import { setPersonalizedValues } from '../../../actions/personalized';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';


class SingleDateRange extends React.Component {

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
		};
		this.onDateChange = this.onDateChange.bind(this);
	}

	componentDidMount() {
		const { personalized, locale } = this.props;
		moment.locale(locale);
		if (personalized && personalized.startDate) {
			this.setState({
				startDate: moment(personalized.startDate, 'YYYY-MM-DD')
			})
		} else {
			this.setState({
				startDate: null
			})
		}

	}

	componentWillReceiveProps(newProps) {
		const { personalized } = newProps;
		if (personalized && personalized.startDate) {
			this.setState({
				startDate: moment(personalized.startDate, 'YYYY-MM-DD')
			})
		} else {
			this.setState({
				startDate: null
			})
		}

	}

	onDateChange(startDate) {
		const { onChange, setPersonalizedValues, change } = this.props;
		this.setState({ startDate });
		setPersonalizedValues({ name: 'singleDate', value: false })
		setPersonalizedValues({ name: 'startDate', value: startDate })
	}

	render() {
		const { focusedInput, startDate } = this.state;
		const { smallDevice, verySmallDevice, locale } = this.props;
		moment.locale(locale);

		let daySize = (verySmallDevice) ? 35 : 60;
		let verticalHeight = (verySmallDevice) ? '70vh' : '80vh';

		let today = moment(), condition = null;
		condition = day => !isInclusivelyAfterDay(day, today)

		return (
			<div>
				{
					!smallDevice && <DayPickerSingleDateController
						{...this.props}
						openDirection={"up"}
						appendToBody={true}
						date={startDate}
						onDateChange={date => this.onDateChange(date)}
						focused={this.state.focused}
						onFocusChange={({ focused }) => this.setState({ focused })}
						numberOfMonths={2}
						id={"id"}
						hideKeyboardShortcutsPanel
						isOutsideRange={condition}
						onOutsideClick={() => { console.log('') }}
						isDayHighlighted={date => startDate ? (moment(startDate).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) : false}
					/>
				}
				{
					smallDevice && <div className={cx('dateRangeSmall')}>
						<DayPickerSingleDateController
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
							isDayHighlighted={date => startDate ? (moment(startDate).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')) : false}
						/>
					</div>
				}
			</div>
		);
	}
}


const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
	personalized: state.personalized,
	datesValue: selector(state, 'dates'),
	locale: state.intl.locale
});

const mapDispatch = {
	setPersonalizedValues,
	change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SingleDateRange)));