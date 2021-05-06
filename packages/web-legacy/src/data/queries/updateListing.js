// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces
} from '../../data/models';

import UserMood from '../../data/models/UserMood';
import fetch from '../../core/fetch';

const updateListing = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    personCapacity: { type: IntType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMapTouched: { type: BooleanType },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    parkingOptions: { type: new List(IntType) },
    isParking: { type: BooleanType },
    parkingDescription: { type: StringType },
    moods: { type: new List(IntType) },
    contactName: { type: StringType },
    contactEmail: { type: StringType },
    contactPhoneNumber: { type: StringType },
    countryCode: { type: StringType },
    contactDialCode: { type: StringType }
  },

  async resolve({ request, response }, {
    id,
    personCapacity,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isMapTouched,
    amenities,
    safetyAmenities,
    parkingOptions,
    isParking,
    parkingDescription,
    moods,
    contactName,
    contactEmail,
    contactPhoneNumber,
    countryCode,
    contactDialCode
  }) {
    try {
      let isListUpdated = false;

      if (request.user || request.user.admin) {

        let where = { id };
        if (!request.user.admin) {
          where = {
            id,
            userId: request.user.id
          }
        };

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

        const doUpdateListing = await Listing.update({
          personCapacity: personCapacity,
          country: country,
          street: street,
          buildingName: buildingName,
          city: city,
          state: state,
          zipcode: zipcode,
          lat: latValue,
          lng: lngValue,
          isMapTouched: isMapTouched,
          isParking: isParking,
          parkingDescription: isParking ? parkingDescription : null,
          contactName: contactName,
          contactEmail: contactEmail,
          contactPhoneNumber: contactPhoneNumber,
          countryCode,
          contactDialCode
        },
          {
            where
          })
          .spread(function (instance) {
            // Check if any rows are affected
            if (instance > 0) {
              isListUpdated = true;
            }
          });

        // User Settings Data
        if (isListUpdated) {

          // Amenities
          if (amenities != null && amenities != undefined) {
            const removeAmenities = await UserAmenities.destroy({
              where: {
                listId: id
              }
            });
            amenities.map(async (item, key) => {
              let updateAmenities = await UserAmenities.create({
                listId: id,
                amenitiesId: item
              })
            });
          }

          // Safety Amenities
          if (safetyAmenities != null && safetyAmenities != undefined) {
            const removeSafetyAmenities = await UserSafetyAmenities.destroy({
              where: {
                listId: id
              }
            });
            safetyAmenities.map(async (item, key) => {
              let updateSafetyAmenities = await UserSafetyAmenities.create({
                listId: id,
                safetyAmenitiesId: item
              })
            });
          }

          // parkingOptions
          if (parkingOptions != null && parkingOptions != undefined) {
            const removeUserSpaces = await UserSpaces.destroy({
              where: {
                listId: id
              }
            });
            isParking && parkingOptions.map(async (item, key) => {
              let updateUserSpaces = await UserSpaces.create({
                listId: id,
                spacesId: item
              })
            });
          }

          // Moods Options
          if (moods != null && moods != undefined) {
            const removeUserMoods = await UserMood.destroy({
              where: {
                listId: id
              }
            });
            moods.map(async (item, key) => {
              let updateUserMoods = await UserMood.create({
                listId: id,
                moodsId: item
              })
            });
          }
        }



        if (isListUpdated) {
          return {
            status: 'success'
          }
        } else {
          return {
            status: 'failed'
          }
        }

      } else {
        return {
          status: "notLoggedIn",
        };
      }
    } catch (e) {
      console.log('error error error', e)
      return {
        status: 'failed'
      }
    }
  },
};

export default updateListing;
