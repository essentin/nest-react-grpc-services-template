import ListSettingsType from '../types/ListingSettingsType';

import { ListSettingsTypes } from '../../data/models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';

const getListingSettings = {

  type: new List(ListSettingsType),

  args: {
    step: { type: StringType },
    listOfId: { type: new List(IntType) }
  },

  async resolve({ request }, { step, listOfId }) {
    
    let where = {};

    if (step != undefined) {
      where = { 
          step: step 
      };
    }

    if(listOfId != undefined) {
      where = {
        ...where,
        id: {
          $in: listOfId
        }
      }
    }

    where = Object.assign({}, where, { isEnable: true });

    const getResults = await ListSettingsTypes.findAll({
      where
    });

    if (!getResults) {
      return {
        status: "failed"
      }
    }

    return getResults;

  },

};

export default getListingSettings;
