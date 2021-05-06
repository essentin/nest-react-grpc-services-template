import moment from 'moment';

export function formattingTime(time) {
  let amPM, updatedTime;
  if (!isNaN(time)) {
    if (time < 11 || time > 23) {
      amPM = 'AM';
    } else {
      amPM = 'PM';
    }
    if (time < 12) {
      return time + amPM;
    } else {
      if (time > 24) {
        updatedTime = Number(time) - 24;
      } else if (time == 12) {
        updatedTime = 12;
      } else {
        updatedTime = Number(time) - 12;
      }
      return updatedTime + amPM;
    }
  }
}

export function checkInData(checkDataValue) {
  let checkIn;
  if (checkDataValue === 'Flexible') {
    checkIn = 'Flexible';
  } else {
    if (checkDataValue != null) {
      checkIn = formattingTime(checkDataValue);
    }
  }

  return checkIn;
}

export function checkIn(checkInStart, checkInEnd) {
  let checkIn;
  if (checkInStart === 'Flexible') {
    checkIn = 'Flexible';
  } else {
    if (checkInEnd === 'Flexible') {
      checkIn = 'From ' + formattingTime(checkInStart);
    } else {
      if (checkInStart != null && checkInEnd != null) {
        checkIn =
          formattingTime(checkInStart) + ' - ' + formattingTime(checkInEnd);
      }
    }
  }

  return checkIn;
}

export function checkValue(value, defaultValue) {
  return value !== null ? value : defaultValue;
}

export function generateTimes(startTime, endTime, hourFormat) {
  let timesLookup = [],
    start = 30,
    end = 1410;
  let value = 0,
    label = '';
  start = (startTime || startTime === 0) ? Number(startTime) : start;
  end = endTime ? Number(endTime) : end;
  // For next day
  if (startTime >= endTime) {
    end = 1410;
  }

  for (let i = start; i <= end; i = i + 30) {
    let hours = Math.floor(Number(i) / 60);
    let minutesTime = Number(i) % 60;
    let minutes = minutesTime && minutesTime == 30 ? 0.5 : 0;
    value = Number(hours + minutes);
    if (hourFormat) {
      label = hours + '.' + (minutesTime == 0 ? '00' : minutesTime.toString());
    } else {
      if (value >= 12 && value != 24) {
        label = hours > 12 && hours < 22 ? '' : '';
        label = label + (hours > 12 ? hours - 12 : hours);
        label = label + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'PM';
      } else {
        label = hours < 10 ? '' : '';
        label = hours === 0 ? '12' : label + hours;
        label = label + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'AM';
      }
    }

    timesLookup.push({
      value,
      hours,
      minutes,
      minutesTime,
      label,
      isNextDay: false,
    });
  }

  // For next day
  if (startTime >= endTime) {
    start = 0;
    end = endTime;

    for (let i = start; i <= end; i = i + 30) {
      let hours = Math.floor(Number(i) / 60);
      let minutesTime = Number(i) % 60;
      let minutes = minutesTime && minutesTime == 30 ? 0.5 : 0;
      value = Number(hours + minutes);

      if (value >= 12 && value != 24) {
        label = hours > 12 && hours < 22 ? '0' : '';
        label = label + (hours > 12 ? hours - 12 : hours);
        label = label + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'PM';
      } else {
        label = hours < 10 ? '' : '';
        label = hours === 0 ? '12' : label + hours;
        label = label + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'AM';
      }

      label = label + '*';

      timesLookup.push({
        value,
        hours,
        minutes,
        minutesTime,
        label,
        isNextDay: true,
      });
    }
  }

  return timesLookup;
}

export function formatTime(time, hourFormat) {
  let hours = Math.floor(Number(time) / 1);
  let minutesTime = Number(time) % 1;

  let minutes = minutesTime && minutesTime == 0.5 ? 30 : 0;
  let label;
  if (hourFormat) {
    label = hours + '.' + (minutesTime == 0 ? '00' : minutesTime.toString());
  } else {
    if (time >= 12 && time != 24) {
      label = hours > 12 && hours < 22 ? '' : '';
      label = label + (hours > 12 ? hours - 12 : hours);
      label = label + '.' + (minutes == 0 ? '00' : minutes) + 'PM';
    } else {
      label = hours < 10 ? '' : '';
      label = hours === 0 ? '12' : label + hours;
      label = label + '.' + (minutes == 0 ? '00' : minutes) + 'AM';
    }
  }

  return label;
}
