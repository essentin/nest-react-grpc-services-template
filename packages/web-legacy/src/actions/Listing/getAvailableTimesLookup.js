import { gql } from 'react-apollo';
import moment from 'moment';

import {
	GET_AVAILABLE_TIME_LOOKUP_START,
	GET_AVAILABLE_TIME_LOOKUP_SUCCESS,
	GET_AVAILABLE_TIME_LOOKUP_ERROR
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
    query ($listId: Int!, $date: String!) {
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

export function getAvailableTimesLookup(listId, date, index) {

	return async (dispatch, getState, { client }) => {

		await dispatch({
			type: GET_AVAILABLE_TIME_LOOKUP_START,
			payload: {
				isLoading: true
			}
		});

		try {

			let bookingFormData = {}, isFieldActive = false;
			let startTime = null, endTime = null, existingDate = null;
			let startTimeObj = null, endTimeObj = null;
			let day = null, isNextAvailable, isToday = false, today = moment();
			let currentHours, currentMinutes, currentMinutesTime, currentTime;

			let startTimeLookup = generateTimes(360, 1410);
			let endTimeLookup = generateTimes(360, 360);

			startTimeLookup = await formatTimesLookup(startTimeLookup);
			endTimeLookup = await formatTimesLookup(endTimeLookup);


			if (date) {
				day = moment(date).format('dddd');
				isToday = moment(moment(date)).isSame(moment(), 'day');

				const { data } = await client.query({
					query,
					variables: {
						listId,
						day
					},
					fetchPolicy: 'network-only'
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
						await Promise.all(startTimeLookup.map(async (item, key) => {
							let isAvailable = true, findAvailability;
							if (blockedTimes.data && blockedTimes.data.getBlockedTimes
								&& blockedTimes.data.getBlockedTimes.length > 0) {
								// Within day                                
								findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.endTime >= item.value);
								if (!findAvailability) { // Next Day
									findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.isNextDay === true);
								}
								if (findAvailability) {
									isAvailable = false;
								}
							}
							if (isToday) {
								currentHours = Math.floor(Number(item.value) / 1);
								currentMinutesTime = Number(item.value) % 1;
								currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
								currentTime = moment({ h: currentHours, m: currentMinutes });
								if (today.isSameOrAfter(currentTime)) {
									isAvailable = false;
								}
							}
							startTimeLookup[key].isAvailable = isAvailable;
							startTimeLookup[key].disabled = false;
							startTimeLookup[key].isNextDay = item.isNextDay;
							if (startTimeObj === null && isAvailable) {
								startTimeObj = startTimeLookup[key];
								startTime = item.value;
							}
						}));


						let hours = Math.floor(Number(startTime) / 1) * 60;
						let minutesTime = Number(startTime) % 1;
						let minutes = (minutesTime && minutesTime == 0.5) ? 30 : 0;
						let currentStartTime = hours + minutes;
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
							if (isToday) {
								currentHours = Math.floor(Number(item.value) / 1);
								currentMinutesTime = Number(item.value) % 1;
								currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
								currentTime = moment({ h: currentHours, m: currentMinutes });
								if (today.isSameOrAfter(currentTime)) {
									isAvailable = false;
								}
							}
							endTimeLookup[key].isAvailable = isAvailable;
							endTimeLookup[key].disabled = false;
							endTimeLookup[key].isNextDay = item.isNextDay;
						}));

						endTimeLookup.splice(0, 1);

						if (startTime == 6) {
							endTimeLookup[47].isAvailable = false;
							endTimeLookup[47].disabled = true;
						}


					} else {

						if (data.getAvailableTimes.timeSlot && data.getAvailableTimes.timeSlot.length > 0) {
							await Promise.all(startTimeLookup.map(async (item, key) => {
								let openingTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= item.value && o.endTime >= item.value);
								let nextOpeningTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= item.value && o.isNextDay === true);
								let isAvailable = true, findAvailability;

								if (blockedTimes.data && blockedTimes.data.getBlockedTimes
									&& blockedTimes.data.getBlockedTimes.length > 0) {
									// Within day                                
									findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.endTime >= item.value);
									if (!findAvailability) { // Next Day
										findAvailability = blockedTimes.data.getBlockedTimes.find(o => o.startTime <= item.value && o.isNextDay === true);
									}
									if (findAvailability) {
										isAvailable = false;
									}
								}

								if (isToday) {
									currentHours = Math.floor(Number(item.value) / 1);
									currentMinutesTime = Number(item.value) % 1;
									currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
									currentTime = moment({ h: currentHours, m: currentMinutes });

									if (today.isSameOrAfter(currentTime)) {
										isAvailable = false;
									}
								}

								if (nextOpeningTime) {
									startTimeLookup[key].isAvailable = isAvailable;
									startTimeLookup[key].disabled = false;
									startTimeLookup[key].isNextDay = true;

									if (startTimeObj === null && isAvailable) {
										startTimeObj = startTimeLookup[key];
										startTime = item.value;
									}
								}

								if (openingTime) {
									startTimeLookup[key].isAvailable = isAvailable;
									startTimeLookup[key].disabled = false;
									if (startTimeObj === null && isAvailable) {
										startTimeObj = startTimeLookup[key];
										startTime = item.value;
									}
								}
							}));

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
								if (!nextOpeningTime && !openingTime) {
									nextOpeningTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= item.value && o.isNextDay === true);
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

								if (isToday) {
									currentHours = Math.floor(Number(item.value) / 1);
									currentMinutesTime = Number(item.value) % 1;
									currentMinutes = (currentMinutesTime && currentMinutesTime == 0.5) ? 30 : 0;
									currentTime = moment({ h: currentHours, m: currentMinutes });

									if (today.isSameOrAfter(currentTime)) {
										isAvailable = false;
									}
								}

								if (nextOpeningTime && !openingTime) {
									
									endTimeLookup[key].isAvailable = isAvailable;
									endTimeLookup[key].disabled = false;
									endTimeLookup[key].isNextDay = true;
								}

								if (openingTime && startTime !== item.value) {
									
									endTimeLookup[key].isAvailable = isAvailable;
									endTimeLookup[key].disabled = false;
								}

							}));

							if (startTimeObj !== null && endTimeObj === null) {
								let findEndTime;

								if (startTime <= 22.5) {
									findEndTime = data.getAvailableTimes.timeSlot.find(o => o.startTime <= startTime + 1 && o.endTime >= startTime + 1);
									if (findEndTime) {
										endTime = startTime + 1;
										endTimeObj = endTimeLookup.find(o => o.value === endTime);
									}
								} else if (startTime > 22.5 && isNextAvailable) {
									let updatedEndTime = (startTime > 11) ? 0.5 : 0;
									findEndTime = data.getAvailableTimes.timeSlot.find(o => o.endTime >= updatedEndTime && o.isNextDay === true);
									if (findEndTime) {
										endTime = updatedEndTime;
										endTimeObj = endTimeLookup.find(o => o.value === endTime);
									}
								}
							}
						}
					}
				}
			}

			await dispatch({
				type: GET_AVAILABLE_TIME_LOOKUP_SUCCESS,
				payload: {
					isLoading: false,
				}
			});

			return await {
				date,
				startTime,
				endTime,
				startTimeObj,
				endTimeObj,
				startLookup: startTimeLookup,
				endLookup: endTimeLookup
			};

		} catch (error) {

			dispatch({
				type: GET_AVAILABLE_TIME_LOOKUP_ERROR,
				payload: {
					error,
					isLoading: false,
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