import {
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const AdminListingType = new ObjectType({
    name: 'AdminListing',
    fields: {
        id: { type: IntType },
        userId: { type: StringType },
        title: { type: StringType },
        description: { type: StringType },
        personCapacity: { type: IntType },
        country: { type: StringType },
        street: { type: StringType },
        buildingName: { type: StringType },
        city: { type: StringType },
        state: { type: StringType },
        zipcode: { type: StringType },
        lat: { type: FloatType },
        lng: { type: FloatType },
        coverPhoto: { type: IntType },
    },
});

export default AdminListingType;