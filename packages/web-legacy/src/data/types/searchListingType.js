import { GraphQLList as List, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

import ShowListingType from './ShowListingType';

const searchListingType = new ObjectType({
  name: 'SearchListing',
  fields: {
    count: { type: StringType },
    results: { type: new List(ShowListingType) },
    status: { type: StringType },
  },
});

export default searchListingType;