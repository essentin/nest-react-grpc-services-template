// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../../core/fetch';

// Locale
import messages from '../../../locale/messages';


// Redux Action
import { getListingData } from '../../../actions/getListing';
import { manageListingSteps } from '../../../actions/manageListingSteps';
import { getListingFieldsValues } from '../../../actions/getListingFieldsValues';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';

// For Redirect
import history from '../../../core/history';

async function update(values, dispatch) {

  let variables = Object.assign({}, values);

  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $personCapacity:Int,
    $country:String,
    $street:String,
    $buildingName:String,
    $city:String,
    $state:String,
    $zipcode:String,
  	$lat: Float,
  	$lng: Float,
  	$isMapTouched: Boolean,
    $amenities: [Int],
    $safetyAmenities: [Int],
    $parkingOptions: [Int],
    $isParking: Boolean,
    $parkingDescription:String,
    $moods: [Int],
    $contactName: String,
    $contactEmail: String,
    $contactPhoneNumber: String,
    $countryCode: String,
    $contactDialCode: String
  ) {
      updateListing (
        id: $id,
        personCapacity: $personCapacity
        country: $country
        street: $street
        buildingName: $buildingName
        city: $city
        state: $state
        zipcode: $zipcode
        lat: $lat
        lng: $lng
        isMapTouched: $isMapTouched,
        amenities: $amenities,
        safetyAmenities: $safetyAmenities,
        parkingOptions: $parkingOptions,
        isParking: $isParking,
        parkingDescription: $parkingDescription,
        moods: $moods,
        contactName: $contactName,
        contactEmail: $contactEmail,
        contactPhoneNumber: $contactPhoneNumber,
        countryCode: $countryCode,
        contactDialCode: $contactDialCode

      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data.updateListing.status == "success") {
    await dispatch(getListingData(values.id));
    await dispatch(manageListingSteps(values.id, 1));
    await dispatch(getListingFieldsValues("2", values.id));
    await dispatch(setLoaderComplete('updateListing'));

    history.push('/become-a-host/' + values.id + '/home');
  } else if (data.updateListing.status == "notLoggedIn") {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.notLoggedIn });
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default update;
