
import messages from '../../../locale/messages';


const validateStep3 = values => {

	const errors = {};
	// Activity
	if (values.activity && values.activity.length > 0) {
		const activityArrayErrors = [];

		let checkValue = values.activity.find(o => o.isSelected == true);

		if (checkValue == undefined) {
			errors.activity = messages.required;
		}

		values.activity.forEach((activity, activityIndex) => {
			const activityErrors = {};

			if (activity.isSelected) {

				// Base Price
				if (!activity.basePrice) {
					activityErrors['basePrice'] = messages.required;
					activityArrayErrors[activityIndex] = activityErrors;
				}
				else if (activity.basePrice && activity.basePrice.toString().trim() == '') {
					activityErrors['basePrice'] = messages.required;
					activityArrayErrors[activityIndex] = activityErrors;
				}
				else if (activity.basePrice && (isNaN(activity.basePrice) || (!/^[0-9\.]+$/.test(activity.basePrice)) || (parseFloat(activity.basePrice, 10) < 1))) {
					activityErrors['basePrice'] = messages.invalid;
					activityArrayErrors[activityIndex] = activityErrors;
				}

				if (activity.activityType == '3') {
					// Min hours
					if (!activity.minHour) {
						activityErrors['minHour'] = messages.required;
						activityArrayErrors[activityIndex] = activityErrors;
					}
					else if (activity.minHour && activity.minHour.toString().trim() == '') {
						activityErrors['minHour'] = messages.required;
						activityArrayErrors[activityIndex] = activityErrors;
					}
					else if (activity.minHour && (isNaN(activity.minHour) || (!/^[0-9\.]+$/.test(activity.minHour)) || (parseFloat(activity.minHour, 10) < 1))) {
						activityErrors['minHour'] = messages.invalid;
						activityArrayErrors[activityIndex] = activityErrors;
					} else if (activity.minHour > 12) {
						activityErrors['minHour'] = messages.minHoursInvalid;
						activityArrayErrors[activityIndex] = activityErrors;
					}

					// Discount
					if (activity.discount && activity.discount.toString().trim() == '') {
						activityErrors['discount'] = messages.required;
						activityArrayErrors[activityIndex] = activityErrors;
					} else if (activity.discount && (isNaN(activity.discount) || (!/^[0-9\.]+$/.test(activity.discount)) || (parseFloat(activity.discount, 10) < 1) || (parseInt(activity.discount, 10) > 99))) {
						activityErrors['discount'] = messages.invalid;
						activityArrayErrors[activityIndex] = activityErrors;
					}
				}


				if (activity.isCleaningIncluded == 'false') {
					// Cleaning Price
					if (!activity.cleaningFee) {
						activityErrors['cleaningFee'] = messages.required;
						activityArrayErrors[activityIndex] = activityErrors;
					}
					else if (activity.cleaningFee && activity.cleaningFee.toString().trim() == '') {
						activityErrors['cleaningFee'] = messages.required;
						activityArrayErrors[activityIndex] = activityErrors;
					}
					else if (activity.cleaningFee && (isNaN(activity.cleaningFee) || (!/^[0-9\.]+$/.test(activity.cleaningFee)) || (parseFloat(activity.cleaningFee, 10) < 1))) {
						activityErrors['cleaningFee'] = messages.invalid;
						activityArrayErrors[activityIndex] = activityErrors;
					}
				}

				// Max Guest
				if (!activity.maxGuest) {
					activityErrors['maxGuest'] = messages.required;
					activityArrayErrors[activityIndex] = activityErrors;
				}
				else if (activity.maxGuest && activity.maxGuest.toString().trim() == '') {
					activityErrors['maxGuest'] = messages.required;
					activityArrayErrors[activityIndex] = activityErrors;
				}
				else if (activity.maxGuest && (isNaN(activity.maxGuest) || (!/^[1-9]\d*$/.test(activity.maxGuest)) || (parseFloat(activity.maxGuest, 10) < 1))) {
					activityErrors['maxGuest'] = messages.invalid;
					activityArrayErrors[activityIndex] = activityErrors;
				}
			}

		})

		if (activityArrayErrors.length) {
			errors.activity = activityArrayErrors;
		}

	}


	// Availability
	if (values.spaceAvailability && values.spaceAvailability.length > 0) {
		const availableArrayErrors = [];
		values.spaceAvailability.forEach((available, availableIndex) => {
			const availableErrors = {};
			if (available.isExist) {
				availableErrors['isExist'] = messages.required;
				availableArrayErrors[availableIndex] = availableErrors;
			}
		})
		if (availableArrayErrors.length) {
			errors.spaceAvailability = availableArrayErrors;
		}
	}



	return errors;
}

export default validateStep3;
