import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLList as List,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';
import sequelize from '../sequelize';



const listIdArrayType = new ObjectType({
  name: 'moodsList',
  fields: {
    id: { type: IntType }
  }
})


const ListSettings = new ObjectType({
  name: 'listingSettings',
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
    thumbnail: { type: StringType },
    moodsListId: {
      type: new List(listIdArrayType),
      async resolve(ListSettings) {
        return await sequelize.query(`select Listing.id from Listing join UserMood on UserMood.listId = Listing.id where UserMood.moodsId = ${ListSettings.dataValues.id} and Listing.isPublished = true`,
          { type: sequelize.QueryTypes.SELECT });
      }
    },
    amenitiesListId: {
      type: new List(listIdArrayType),
      async resolve(ListSettings) {
        return await sequelize.query(`select Listing.id from Listing join UserAmenities on UserAmenities.listId = Listing.id where UserAmenities.amenitiesId = ${ListSettings.dataValues.id} and Listing.isPublished = true`,
          { type: sequelize.QueryTypes.SELECT });
      }
    }
    // moodCount: {
    //   type: IntType,
    //   async resolve(ListSettings) {
    //     return await UserMood.count({
    //       where: {
    //         moodsId: ListSettings.dataValues.id,
    //       },
    //     });
    //   }
    // },
    // amenitiesCount: {
    //   type: IntType,
    //   async resolve(ListSettings) {
    //     return await UserAmenities.count({
    //       where: {
    //         amenitiesId: ListSettings.dataValues.id,
    //       },
    //     });
    //   }
    // }
  }
});

const ListSettingsType = new ObjectType({
  name: 'listingSettingsTypes',
  description: "Represents listing field types for the frontend",
  fields: {
    id: { type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isMultiValue: { type: BooleanType },
    isEnable: { type: StringType },
    status: { type: StringType },
    listSettings: {
      type: new List(ListSettings),
      resolve(listSettingsType) {
        return listSettingsType.getListSettings();
      }
    }
  },
});

export default ListSettingsType;