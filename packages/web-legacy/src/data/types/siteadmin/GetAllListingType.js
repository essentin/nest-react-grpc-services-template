import { GraphQLInt as IntType, GraphQLList as List, GraphQLObjectType as ObjectType } from 'graphql';
import ShowListingType from '../../types/ShowListingType';

const GetAllListingType = new ObjectType({
  name: 'GetAllListingType',
  description: "This represent list data for admin management",
  fields: {
    usersData: {
      type: new List(ShowListingType),
    },
    count: {
      type: IntType
    }
  },
});
export default GetAllListingType;
