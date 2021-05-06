import { gql } from 'react-apollo';
import moment from 'moment';

// Redux form
import { initialize } from 'redux-form';

import {
	GET_TIMES_LOOKUP_START,
	GET_TIMES_LOOKUP_SUCCESS,
	GET_TIMES_LOOKUP_ERROR
} from '../../constants';

// Helpers
import { generateTimes } from '../../helpers/formatTimes';

// Redux action
import { getAvailableTimesLookup } from './getAvailableTimesLookup';

export function getTimesLookup(listId, index, date, formName, blockedDates) {

	return async (dispatch, getState, { client }) => {

		dispatch({
			type: GET_TIMES_LOOKUP_START,
			payload: {
				isLoading: true,
				index
			}
		});

		try {

			let bookingFormData = {}, isFieldActive = false;
			let startTime = null, endTime = null, existingDate = null;
			let startTimeObj = null, endTimeObj = null;
			let updatedLookup, isToday = false;

			// Booking Form
			if (getState().form && getState().form.BookingForm) {
				bookingFormData = getState().form.BookingForm.values;
				isFieldActive = (getState().form.BookingForm.values && getState().form.BookingForm.values.extendDay) ? true : false;
			}

			let startTimeLookup = generateTimes(360, 1410);
			let endTimeLookup = generateTimes(360, 360);
			let checkDate = false;
			if (date) {
				isToday = moment(moment(date)).isSame(moment(), 'day');
				if (blockedDates && blockedDates.length > 0) {
					let findDate = blockedDates.find((o => moment(o.blockedDates).format('YYYY-MM-DD') == moment(date).format('YYYY-MM-DD')));
					if (!findDate) {
						updatedLookup = await dispatch(getAvailableTimesLookup(listId, date, index));
					} else {
						checkDate = true;
					}
				} else {
					updatedLookup = await dispatch(getAvailableTimesLookup(listId, date, index));
				}


				if (updatedLookup) {
					startTimeLookup = updatedLookup.startLookup;
					endTimeLookup = updatedLookup.endLookup;
				} else {
					startTimeLookup = await formatTimesLookup(startTimeLookup, isToday);
					endTimeLookup = await formatTimesLookup(endTimeLookup, isToday);
				}

				if (checkDate) {
					startTimeLookup = await formatTimesLookup(startTimeLookup, isToday, true);
					endTimeLookup = await formatTimesLookup(endTimeLookup, isToday, true);
				}

				if (isFieldActive) {
					if (checkDate) {
						existingDate = date || null;
					} else {
						existingDate = updatedLookup.date || null;
						startTime = updatedLookup.startTime || null;
						endTime = updatedLookup.endTime || null;
						startTimeObj = updatedLookup.startTimeObj || null;
						endTimeObj = updatedLookup.endTimeObj || null;
					}

				}
			} else {
				if (isFieldActive) {
					existingDate = bookingFormData['extendDay'][index].date || null;
					startTime = bookingFormData['extendDay'][index].startTime || null;
					endTime = bookingFormData['extendDay'][index].endTime || null;
					startTimeObj = bookingFormData['extendDay'][index].startTimeObj || null;
					endTimeObj = bookingFormData['extendDay'][index].endTimeObj || null;
				}

				startTimeLookup = await formatTimesLookup(startTimeLookup, isToday);
				endTimeLookup = await formatTimesLookup(endTimeLookup, isToday);
			}

			if (isFieldActive) {
				bookingFormData['extendDay'][index] = {
					date: existingDate,
					startTime,
					endTime,
					startTimeObj,
					endTimeObj,
					startLookup: startTimeLookup,
					endLookup: endTimeLookup
				};
			} else {
				bookingFormData['extendDay'] = [{
					startLookup: startTimeLookup,
					endLookup: endTimeLookup
				}];
			}

			// Reinitialize the form values
			await dispatch(initialize('BookingForm', bookingFormData, true));


			await dispatch({
				type: GET_TIMES_LOOKUP_SUCCESS,
				payload: {
					isLoading: false,
					index
				}
			});

		} catch (error) {

			dispatch({
				type: GET_TIMES_LOOKUP_ERROR,
				payload: {
					error,
					isLoading: false,
					index
				}
			});

		}
	};
}

async function formatTimesLookup(data, isToday, disable) {
	let timeLookup = [], timeLookupObj;
	let disabled = false, isAvailable = true, isBlocked = false;
	if (data && data.length > 0) {
		await Promise.all(data.map((item, key) => {
			if (isToday) { // If today
				currentHours = Math.floor(Number(item.value) / 1);
				currentMinutesTime = Number(item.value) % 1;
				currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
				currentTime = moment({ h: currentHours, m: currentMinutes });

				if (today.isSameOrAfter(currentTime)) {
					disabled = true;
					isAvailable = false;
					isBlocked = true;
				} else {
					disabled = false;
					isAvailable = true;
					isBlocked = false;
				}
			} else { // If not today
				disabled = false;
				isAvailable = true;
				isBlocked = false;
			}

			if (disable) {
				disabled = true;
				isAvailable = false;
				isBlocked = true;
			}

			timeLookupObj = {
				label: item.label,
				value: item.value,
				//disabled: ((key % 2 == 0) ? false : false),
				//isAvailable: ((key % 2 == 0) ? false : true),
				disabled,
				isAvailable,
				isBlocked,
				isNextDay: item.isNextDay
			}

			timeLookup.push(timeLookupObj);
		}));
	}

	return await timeLookup;
}