import { GraphQLNonNull as NonNull, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const NewsItemType = new ObjectType({
  name: 'NewsItem',
  fields: {
    title: { type: new NonNull(StringType) },
    link: { type: new NonNull(StringType) },
    author: { type: StringType },
    pubDate: { type: new NonNull(StringType) },
    content: { type: StringType },
  },
});

export default NewsItemType;
