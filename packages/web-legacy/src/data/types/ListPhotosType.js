import {
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const ListPhotosType = new ObjectType({
  name: 'ListPhotos',
  fields: {
    id: { type: new NonNull(IntType) },
    listId: { type: new NonNull(IntType) },
    name: { type: StringType },
    type: { type: StringType },
    isCover: { type: IntType },
    photosCount: { type: IntType },
    status: { type: StringType },
    iscoverPhotoDeleted: { type: BooleanType },
  },
});

export default ListPhotosType;
