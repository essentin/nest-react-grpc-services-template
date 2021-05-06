import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
} from 'graphql';


const AmenitiesType = new ObjectType({
    name: 'AmenitiesType',
    fields: {
        id: {
            type: IntType
        },

        listId: {
            type: IntType
        },

        amenitiesId: {
            type: IntType
        }
    }
});

export default AmenitiesType;