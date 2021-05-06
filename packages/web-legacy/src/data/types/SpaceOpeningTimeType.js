import {
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType
  } from 'graphql';
 
  
  const SpaceOpeningTimeType = new ObjectType({
      name: 'SpaceOpeningTime',
      fields: {
          id: { type: IntType },
          listId: { type: IntType },
          day: { type: StringType },
          startTime: { type: FloatType },
          endTime: { type: FloatType },
      }
  });
  
  export default SpaceOpeningTimeType;
  