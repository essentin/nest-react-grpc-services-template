import {
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CreateListingType = new ObjectType({
  name: 'CreateListing',
  fields: {
    id: { type: IntType },
    personCapacity: { type: IntType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    status: { type: StringType },
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
});

export default CreateListingType;
