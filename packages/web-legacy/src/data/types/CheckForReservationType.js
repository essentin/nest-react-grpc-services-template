import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
} from 'graphql';

import ReservationType from './ReservationType';

const CheckForReservation = new ObjectType({
    name: 'CheckForReservation',
    fields: {
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: ReservationType
        }
    },
});

export default CheckForReservation;