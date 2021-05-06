// Fetch request
import fetch from '../../../core/fetch';

// Redux Actions
import { getSearchResults, loadingSearchResults, getToCurrency } from '../../../actions/getSearchResults';

async function submit(values, dispatch) {

  let startTime, endTime, variables;

  if (values.startTime) {
    startTime = JSON.stringify(values.startTime)
  }
  if (values.endTime) {
    endTime = JSON.stringify(values.endTime)
  }

  dispatch(getToCurrency());

  variables = Object.assign({}, values, { startTime, endTime });

  dispatch(loadingSearchResults());
  const query =
    `query(
      $personCapacity: String,
      $dates: String,
      $currentPage: Int,
      $lat: Float,
      $lng: Float,
      $amenities: [Int],
      $parkingOptions: [Int],
      $priceRange: String,
      $geography: String,
      $bookingType: String,
      $geoType: String,
      $searchByMap: Boolean,
      $sw_lat: Float,
      $sw_lng: Float,
      $ne_lat: Float,
      $ne_lng: Float,
      $exactGuest: Int,
      $minPrice: Float,
      $startTime: String,
      $endTime: String,
      $currency: String,
      $activityType: Int,
      $showWhishList: Boolean,
      $moods: Int
    ){
      SearchListing(
        personCapacity: $personCapacity,
        dates: $dates,
        currentPage: $currentPage
        lat: $lat,
        lng: $lng,
        amenities: $amenities,
        parkingOptions: $parkingOptions,
        priceRange: $priceRange,
        geography: $geography,
        bookingType: $bookingType,
        geoType: $geoType,
        searchByMap: $searchByMap,
        sw_lat: $sw_lat,
        sw_lng: $sw_lng,
        ne_lat: $ne_lat,
        ne_lng: $ne_lng,
        exactGuest: $exactGuest,
        minPrice: $minPrice,
        startTime: $startTime,
        endTime: $endTime,
        currency: $currency,
        activityType: $activityType,
        showWhishList: $showWhishList,
        moods: $moods
      ) {
        count
        results {
          id
          title
          personCapacity
          lat
          lng
          coverPhoto
          bookingType
          reviewsCount,
          reviewsStarRating,
          city,
          state,
          country,
          listPhotos {
            id
            name
            type
            status
          }
          listingData {
            basePrice
            currency
          }
          wishListStatus
          isListOwner
          spaceSize
          activity{
            listId
            activityType
            basePrice
            minHour
            discount
            cleaningFee
            maxGuest
            isCleaningIncluded
          }
        }
      }
    }
  `;


  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    }),
    credentials: 'include',
  });

  const { data } = await resp.json();

  if (data && data.SearchListing) {
    dispatch(getSearchResults(data.SearchListing));
  }

}

export default submit;
