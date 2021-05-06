import { GraphQLInt as IntType, GraphQLObjectType as ObjectType, GraphQLString as StringType } from 'graphql';

const ListSettingsActivity = new ObjectType({
    name: 'listSettingsActivity',
    description: "Represents listing field values for the frontend",
    fields: {
        id: { type: IntType },
        typeId: { type: IntType },
        itemName: { type: StringType },
        itemDescription: { type: StringType },
        otherItemName: { type: StringType },
        maximum: { type: IntType },
        minimum: { type: IntType },
        startValue: { type: IntType },
        endValue: { type: IntType },
        isEnable: { type: StringType },
        activityType: { type: IntType },
        thumbnail: { type: StringType },
    }
});


export default ListSettingsActivity;
