import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
} from 'graphql';


const SpaceAvailabilitySessionTypes = new ObjectType({
    name: 'SpaceAvailabilitySession',
    fields: {
        id: { type: IntType },
        spaceAvailabilityId: { type: IntType },
        listId: { type: IntType },
        day: { type: StringType },
        startTime: { type: FloatType },
        endTime: { type: FloatType },
        createdAt: { type: StringType },
        updatedAt: { type: StringType },
        isNextDay: { type: BooleanType }
    }
});

export default SpaceAvailabilitySessionTypes;
