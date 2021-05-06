import {
  SET_PERSONALIZED_VALUES,
  SET_INITIAL_PERSONALIZED_VALUES,
} from '../constants';

export function setPersonalizedValues({ name, value }) {
  return {
    type: SET_PERSONALIZED_VALUES,
    payload: {
      name,
      value,
    },
  };
}

export function setInitialPersonalizedValues() {
  return {
    type: SET_INITIAL_PERSONALIZED_VALUES,
    payload: {
      endTime: { label: '5:00PM', value: 17 },
      startTime: { label: '9:00AM', value: 9 },
      dates: null,
      showMap: true,
      lat: null,
      lng: null,
      location: '',
      chosen: null,
      geoType: null,
      geography: null,
      activityType: null,
      activityValue: null,
      activityId: null,
      showClearFilter: false,
      showFooter: false
    },
  };
}