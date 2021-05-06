import { gql } from 'react-apollo';
import moment from 'moment';
import { change } from 'redux-form';

import {
	GET_END_TIME_LOOKUP_START,
	GET_END_TIME_LOOKUP_SUCCESS,
	GET_END_TIME_LOOKUP_ERROR
} from '../../constants';

// Helpers
import { generateTimes } from '../../helpers/formatTimes';

const query = gql`
  query ($listId: Int!, $day: String!) {
    getAvailableTimes(listId: $listId, day: $day) {
        listId
        day
        isOpen
        isWholeDay
        timeSlot{
          day
          listId
          startTime
          endTime
          spaceAvailabilityId
          isNextDay
        }
    }
}
`;

const blockedQuery = gql`
    query ($listId: Int!,  $date: String!) {
        getBlockedTimes(listId: $listId, date: $date) {
            id
            listId
            reservationId
            date
            startTime
            endTime
            isNextDay
            createdAt
            updatedAt
        }
    }
`;

export function getEndTimesLookup(listId, date, startTime, endTimeLookup, index, formName) {

	return async (dispatch, getState, { client }) => {

		dispatch({
			type: GET_END_TIME_LOOKUP_START,
			payload: {
				isLoading: true,
				index
			}
		});

		try {

			let bookingFormData = {}, isFieldActive = false, isNextAvailable;
			let day = null, endTime = null, endTimeObj = null;
			let endTimeLookup = generateTimes(360, 360);
			endTimeLookup = await formatTimesLookup(endTimeLookup);

			if (date) {
				day = moment(date).format('dddd').toLowerCase();

				const { data } = await client.query({
					query,
					variables: {
						listId,
						day
					},
					fetchPolicy: 'network-only',
				});

				// Get Blocked Data
				const blockedTimes = await client.query({
					query: blockedQuery,
					variables: {
						listId,
						date
					},
					fetchPolicy: 'network-only'
				});

				// Opening Times Slots enabled
				if (data && data.getAvailableTimes) {

					if (data.getAvailableTimes.isWholeDay == 'true' && data.getAvailableTimes.isOpen == true) {
						let hours = Math.floor(Number(startTime) / 1) * 60;
						let minutesTime = Number(startTime) % 1;
						let minutes = (minutesTime && minutesTime == 0.5) ? 30 : 0;
						let currentStartTime = hours + minutes;

						currentStartTime = currentStartTime + 30;
						endTimeLookup = generateTimes(currentStartTime, 360);
						endTimeLookup = await formatTimesLookup(endTimeLookup);

						await Promise.all(endTimeLookup.map((item, key) => {
							let isAvailable = true, findAvailability;

							if (blockedTimes.data && blockedTimes.data.getBlockedTimes
								&& blockedTimes.data.getBlockedTimes.length > 0) {
								// Within day                                
								findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.endTime >= item.value);
								if (!findAvailability) { // Next Day
									findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.endTime >= item.value && o.isNextDay === true);
								}
								if (!findAvailability) { // Next Day and start previous day
									findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime >= o.endTime && o.startTime <= item.value && o.startTime <= 24 && o.isNextDay === true);
								}

								if (findAvailability) {
									isAvailable = false;
								}
							}


							// if (nextOpeningTime) {
							endTimeLookup[key].isAvailable = isAvailable;
							endTimeLookup[key].disabled = false;
							endTimeLookup[key].isNextDay = item.isNextDay;
							// }

						}));
					} else {
						if (data.getAvailableTimes.timeSlot && data.getAvailableTimes.timeSlot.length > 0) {
							// Find Is Next Available
							isNextAvailable = data.getAvailableTimes.timeSlot.find(o => o.isNextDay === true);
							// Find End Lookup start entry by chosen start time
							let hours = Math.floor(Number(startTime) / 1) * 60;
							let minutesTime = Number(startTime) % 1;
							let minutes = (minutesTime && minutesTime == 0.5) ? 30 : 0;
							let currentStartTime = hours + minutes;

							if (isNextAvailable) {
								currentStartTime = startTime > 22.5 ? 0 : currentStartTime + 30;
								endTimeLookup = generateTimes(currentStartTime, 1410);
								if (currentStartTime != 0) {
									endTimeLookup = endTimeLookup.concat(generateTimes(1440, 360));
								}
							} else {
								currentStartTime = startTime > 22 ? currentStartTime : currentStartTime + 30;
								endTimeLookup = generateTimes(currentStartTime, 1410);
							}

							endTimeLookup = await formatTimesLookup(endTimeLookup);

							await Promise.all(endTimeLookup.map((item, key) => {
								let openingTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= item.value && o.endTime >= item.value);
								let nextOpeningTime = data.getAvailableTimes.timeSlot.find(o => o.endTime >= item.value && o.isNextDay === true);
								if (!openingTime && !nextOpeningTime) {
									openingTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= item.value && o.isNextDay === true);
								}
								let isAvailable = true, findAvailability;

								if (blockedTimes.data && blockedTimes.data.getBlockedTimes
									&& blockedTimes.data.getBlockedTimes.length > 0) {
									// Within day                                
									findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.endTime >= item.value);
									if (!findAvailability) { // Next Day
										findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.endTime >= item.value && o.isNextDay === true);
									}
									if (!findAvailability) { // Next Day and start previous day
										findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime >= o.endTime && o.startTime <= item.value && o.startTime <= 24 && o.isNextDay === true);
									}

									if (findAvailability) {
										isAvailable = false;
									}
								}


								if (nextOpeningTime) {
									endTimeLookup[key].isAvailable = isAvailable;
									endTimeLookup[key].disabled = false;
									endTimeLookup[key].isNextDay = true;
								}

								if (openingTime && startTime !== item.value) {
									endTimeLookup[key].isAvailable = isAvailable;
									endTimeLookup[key].disabled = false;
								}
							}));
						}
					}

				}

				// Update End Times
				await dispatch(change('BookingForm', `extendDay[${index}].endLookup`, endTimeLookup));
				await dispatch(change('BookingForm', `extendDay[${index}].endTime`, endTime));
				await dispatch(change('BookingForm', `extendDay[${index}].endTimeObj`, endTimeObj));

			}

			await dispatch({
				type: GET_END_TIME_LOOKUP_SUCCESS,
				payload: {
					isLoading: false,
					index
				}
			});

			return true;

		} catch (error) {

			dispatch({
				type: GET_END_TIME_LOOKUP_ERROR,
				payload: {
					error,
					isLoading: false,
					index
				}
			});

		}
	};
}

async function formatTimesLookup(data) {
	let timeLookup = [], timeLookupObj;
	if (data && data.length > 0) {
		await Promise.all(data.map((item, key) => {
			timeLookupObj = {
				label: item.label,
				value: item.value,
				disabled: true,
				isAvailable: false,
				isBlocked: true,
				isNextDay: item.isNextDay
			}

			timeLookup.push(timeLookupObj);
		}));
	}

	return await timeLookup;
}