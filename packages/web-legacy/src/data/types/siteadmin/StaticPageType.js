import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const StaticPageType = new ObjectType({
    name: 'StaticPageType',
    fields: {
        id: {
            type: IntType
        },
        pageName: {
            type: StringType
        },
        content: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        metaTitle: {
            type: StringType
        },
        metaDescription: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default StaticPageType;