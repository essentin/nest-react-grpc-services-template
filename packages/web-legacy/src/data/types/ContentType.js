import { GraphQLNonNull as NonNull, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const ContentType = new ObjectType({
  name: 'Content',
  fields: {
    path: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    content: { type: new NonNull(StringType) },
    component: { type: new NonNull(StringType) },
  },
});

export default ContentType;
