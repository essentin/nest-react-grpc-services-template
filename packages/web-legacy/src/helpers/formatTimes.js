export function generateTimes(startTime, endTime) {
  let timesLookup = [],
    start = 30,
    end = 1410;
  let value = 0,
    label = '';
  start = startTime ? Number(startTime) : start;
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

    if (value >= 12 && value != 24) {
      label = hours > 12 && hours < 22 ? '' : '';
      label = label + (hours > 12 ? hours - 12 : hours);
      label = label + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'PM';
    } else {
      label = hours < 10 ? '' : '';
      label =
        label + hours + '.' + (minutesTime == 0 ? '00' : minutesTime) + 'AM';
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

export function formatTime(time) {
  let hours = Math.floor(Number(time) / 1);
  let minutesTime = Number(time) % 1;

  let minutes = minutesTime && minutesTime == 0.5 ? 30 : 0;
  let label;
  if (time >= 12 && time != 24) {
    label = hours > 12 && hours < 22 ? '' : '';
    label = label + (hours > 12 ? hours - 12 : hours);
    label = label + '.' + (minutes == 0 ? '00' : minutes) + 'PM';
  } else {
    label = hours < 10 ? '' : '';
    label = hours === 0 ? '12' : label + hours;
    label = label + '.' + (minutes == 0 ? '00' : minutes) + 'AM';
  }

  return label;
}

export function formatDay(day) {
  let daysLookup = {
    monday: 'Mon',
    tuesday: 'Tues',
    wednesday: 'Wed',
    thursday: 'Thurs',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  };
  if (day) {
    return daysLookup[day];
  } else {
    return null;
  }
}
