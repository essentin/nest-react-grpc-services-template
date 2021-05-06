import {
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const ListCalendarType = new ObjectType({
    name: 'ListCalendar',
    fields: {
        id: { type: new NonNull(IntType) },
        listId: { type: new NonNull(IntType) },
        name: { type: StringType },
        url: { type: StringType },
        status: { type: StringType },
    },
});

export default ListCalendarType;