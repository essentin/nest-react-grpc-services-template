// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing
} from '../../data/models';

const updateListingStep2 = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    title: { type: StringType },
    description: { type: StringType },
    coverPhoto: { type: IntType },
    isAllAge: { type: StringType },
    houseRuleDesc: { type: StringType },
    wifiName: { type: StringType },
    arrivalInstruction: { type: StringType },
    spaceSize: { type: FloatType },
  },

  async resolve({ request, response }, {
    id,
    title,
    description,
    coverPhoto,
    isAllAge,
    houseRuleDesc,
    wifiName,
    arrivalInstruction,
    spaceSize,

  }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      const doUpdateListing = await Listing.update({
        title,
        description,
        coverPhoto,
        isAllAge,
        houseRuleDesc,
        wifiName,
        arrivalInstruction,
        spaceSize,
      },
        {
          where
        })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });


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

  },
};

export default updateListingStep2;