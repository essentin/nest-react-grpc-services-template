import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';


const ActivityType = new ObjectType({
    name: 'ActivityType',
    fields: {
        id: {
            type: IntType
        },
        name: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        image: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
    }
});

const ActivityTypeDataScheme = new ObjectType({
    name: 'ActivityTypeDataScheme',
    fields: {
        results: {
            type: new List(ActivityType)
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default ActivityTypeDataScheme;