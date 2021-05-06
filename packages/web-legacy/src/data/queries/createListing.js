// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType
} from 'graphql';

// GraphQL Type
import CreateListingType from '../types/CreateListingType';

// Sequelize models
import { Listing, SpaceAvailability } from '../../data/models';

import fetch from '../../core/fetch';

//Helper
import { checkUserType } from '../../helpers/checkUserType';

const createListing = {

  type: CreateListingType,

  args: {
    personCapacity: { type: IntType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isParking: { type: BooleanType },
    parkingDescription: { type: StringType },
    contactName: { type: StringType },
    contactEmail: { type: StringType },
    contactPhoneNumber: { type: StringType },
    countryCode: { type: StringType },
    contactDialCode: { type: StringType }
  },

  async resolve({ request, response }, {
    personCapacity,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isParking,
    parkingDescription,
    conatactName,
    conatactEmail,
    conatactPhoneNumber,
    countryCode,
    contactDialCode
  }) {

    if (request.user && request.user.admin != true) {

      let isHost = await checkUserType(request.user.id, 2);
      if (!isHost)  return { status: "failed" };

      const address = street + ", " + city + ", " + state + ", " + country + ", " + zipcode;

      const query = `
        query ($address: String) {
          locationItem(address: $address) {
            street
            city
            state
            country
            zipcode
            lat
            lng
          }
        }
      `;

      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          variables: { address: address }
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();

      let latValue = lat;
      let lngValue = lng;

      if (data.locationItem != null) {
        latValue = data.locationItem.lat;
        lngValue = data.locationItem.lng;
      }

      const doCreateListing = await Listing.create({
        userId: request.user.id,
        personCapacity: personCapacity,
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: latValue,
        lng: lngValue,
        isParking: isParking,
        parkingDescription: parkingDescription,
        conatactName,
        conatactEmail,
        conatactPhoneNumber,
        countryCode,
        contactDialCode
      });



      if (doCreateListing) {

        // Recently added list id
        const id = doCreateListing.dataValues.id;

        // SpaceAvailability
        let spaceAvailableSettings = [
          { listId: id, day: 'Sunday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Monday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Tuesday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Wednesday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Thursday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Friday', isOpen: true, isWholeDay: true },
          { listId: id, day: 'Saturday', isOpen: true, isWholeDay: true },
        ];

        const createSpaceAvailability = await SpaceAvailability.bulkCreate(spaceAvailableSettings)

        return {
          status: "success",
          id: id
        };
      } else {
        return {
          status: "failed",
        };
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default createListing;
