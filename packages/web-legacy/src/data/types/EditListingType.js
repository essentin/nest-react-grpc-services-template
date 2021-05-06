import {
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const EditListingType = new ObjectType({
  name: 'EditListing',
  fields: {
    id: { type: IntType },
    title: { type: StringType },
    description: { type: StringType },
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
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    houseRules: { type: new List(IntType) },
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    basePrice: { type: FloatType },
    cleaningPrice: { type: FloatType },
    currency: { type: StringType },
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    coverPhoto: { type: IntType },
    blockedDates: { type: new List(StringType) },
    isParking: { type: BooleanType },
    parkingDescription: { type: StringType },
    isAllAge: { type: StringType },
    houseRuleDesc: { type: StringType },
    wifiName: { type: StringType },
    arrivalInstruction: { type: StringType },
    spaceSize: { type: FloatType },
  },
});

export default EditListingType;