import moment from 'moment';

export function prepareCancellationData(userType, data) {
    let currentTime = moment(), reservationStartTime, cancelData;
    let cancellationData = {};
    let hours, minutes, minutesTime, checkInInterval = 0;
    let listingData = data.listData.listingData;

    reservationStartTime = new Date(data.checkIn);

    if (data.startTime) {
        hours = Math.floor(Number(data.startTime) / 1);
        minutesTime = Number(data.startTime) % 1;
        minutes = (minutesTime && minutesTime == 0.5) ? 30 : 0;
        reservationStartTime = moment({ y: reservationStartTime.getFullYear(), M: reservationStartTime.getMonth(), d: reservationStartTime.getDate(), h: hours, m: minutes });
        checkInInterval = reservationStartTime.diff(currentTime, 'minutes');
    }
    if (checkInInterval > 0 && listingData && listingData.cancellation) {
        hours = Math.floor(Number(checkInInterval) / 60);
        minutes = Number(checkInInterval) % 60;
        checkInInterval = Number(hours + '.' + minutes);
    }
    if (data.guestData && data.hostData && data.listData) {
        cancelData = calculateCancellation(checkInInterval, data);
    }
    const { policyName, accomodation, diffCreatedAt } = cancelData;
    let pricingData = calculatePrice(userType, data, accomodation);
    
    if (userType === 'host') {
        cancellationData.reservationId = data.id;

        cancellationData.cancellationPolicy = cancelData && cancelData.policyName;
        cancellationData.refundToGuest = data.total + data.guestServiceFee; 
        cancellationData.guestServiceFee = 0;
        cancellationData.hostServiceFee = data.hostServiceFee; 
        cancellationData.total = data.total + data.guestServiceFee; 

        cancellationData.currency = data.currency;
        cancellationData.cancelledBy = userType;
        cancellationData.checkIn = data.checkIn;
        cancellationData.checkOut = data.checkOut;
        cancellationData.guests = data.guests;
        cancellationData.guestName = data.guestData.firstName;
        cancellationData.hostName = data.hostData.firstName;
        cancellationData.listTitle = data.listData.title;
        cancellationData.confirmationCode = data.confirmationCode;
        cancellationData.guestEmail = data.guestData.userData.email;
        cancellationData.blockedDates = data.reservationBlockedDates;
    }

    if (userType === 'guest') {
        cancellationData.reservationId = data.id;

        cancellationData.cancellationPolicy = cancelData && cancelData.policyName;
        cancellationData.refundToGuest = pricingData.refundableNightPrice;
        cancellationData.guestServiceFee = pricingData.updatedGuestFee;
        cancellationData.hostServiceFee = pricingData.updatedHostFee;
        cancellationData.total = pricingData.subtotal;

        cancellationData.currency = data.currency;
        cancellationData.cancelledBy = userType;
        cancellationData.checkIn = data.checkIn;
        cancellationData.checkOut = data.checkOut;
        cancellationData.guests = data.guests;
        cancellationData.guestName = data.guestData.firstName;
        cancellationData.hostName = data.hostData.firstName;
        cancellationData.listTitle = data.listData.title;
        cancellationData.confirmationCode = data.confirmationCode;
        cancellationData.hostEmail = data.hostData.userData.email;
        cancellationData.blockedDates = data.reservationBlockedDates;
    }

    return cancellationData;
}


// Calculate Price amount
function calculatePrice(userType, data, accomodation) {
    let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0;
    let updatedGuestFee = 0, updatedHostFee = 0, subtotal = 0;
    const { total, guestServiceFee, hostServiceFee } = data;

    if (userType === 'guest') {
        if (accomodation == 100) {
            refundableNightPrice = (total + guestServiceFee) * (accomodation / 100);
            refundWithoutGuestFee = total * (accomodation / 100);
            updatedHostFee = hostServiceFee;
            updatedGuestFee = guestServiceFee;
        } else {
            refundableNightPrice = total * (accomodation / 100);
            refundWithoutGuestFee = total * (accomodation / 100);
            if (refundWithoutGuestFee != total) {
                nonRefundableNightPrice =
                    total + guestServiceFee - refundWithoutGuestFee;
                updatedHostFee = hostServiceFee;
                updatedGuestFee = guestServiceFee;
            }
        }
        subtotal = total + guestServiceFee;
        return { refundableNightPrice, updatedGuestFee, updatedHostFee, subtotal };
    } 
}



function calculateCancellation(checkInInterval, data) {
    let accomodation, policyName, diffCreatedAt, createdAtDate, currentTime;
    let cancellation;
    let createdAt = data.createdAt;
    let listingData = data.listData.listingData;

    if (listingData && listingData.cancellation) {
        cancellation = listingData.cancellation;
        policyName = cancellation.policyName;

        currentTime = moment();
        createdAtDate = moment(createdAt);
        diffCreatedAt = currentTime.diff(createdAtDate, 'hours');

        if (cancellation.id == 1) {
            if (checkInInterval > cancellation.priorDays) {
                accomodation = cancellation.accommodationPriorCheckIn;
            }
            else if (checkInInterval <= cancellation.priorDays) {
                accomodation = cancellation.accommodationDuringCheckIn;
            }
        }
        else {
            if (checkInInterval > cancellation.priorDays) {
                accomodation = cancellation.accommodationPriorCheckIn;
            }
            else if (checkInInterval <= cancellation.priorDays && checkInInterval > cancellation.maxDay) {
                accomodation = cancellation.accommodationBeforeCheckIn;
            }
            else if (checkInInterval <= cancellation.maxDay) {
                accomodation = cancellation.accommodationDuringCheckIn;
            }
        }

        if (diffCreatedAt < 24) {
            accomodation = 100;
        }
    }
    return { policyName, accomodation, diffCreatedAt };
}