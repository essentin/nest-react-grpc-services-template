import {
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const IntlMessageType = new ObjectType({
  name: 'IntlMessage',
  fields: {
    id: { type: new NonNull(StringType) },
    defaultMessage: { type: new NonNull(StringType) },
    message: { type: StringType },
    description: { type: StringType },
    files: { type: new List(StringType) },
  },
});

export default IntlMessageType;
