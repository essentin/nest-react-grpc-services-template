import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const FilterCountType = new ObjectType({
    name: 'FilterCountType',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: { type: IntType }
    },
});

export default FilterCountType;