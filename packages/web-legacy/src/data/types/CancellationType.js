import {
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLInt as IntType,
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
} from 'graphql';

const CancellationType = new ObjectType({
    name: 'Cancellation',
    fields: {
        id: {
            type: IntType
        },
        policyName: {
            type: StringType
        },
        policyContent: {
            type: StringType
        },
        priorDays: {
            type: IntType
        },
        accommodationPriorCheckIn: {
            type: FloatType
        },
        accommodationBeforeCheckIn: {
            type: FloatType
        },
        accommodationDuringCheckIn: {
            type: FloatType
        },
        guestFeePriorCheckIn: {
            type: FloatType
        },
        guestFeeBeforeCheckIn: {
            type: FloatType
        },
        guestFeeDuringCheckIn: {
            type: FloatType
        },
        hostFeePriorCheckIn: {
            type: FloatType
        },
        hostFeeBeforeCheckIn: {
            type: FloatType
        },
        hostFeeDuringCheckIn: {
            type: FloatType
        },
        isEnable: {
            type: BooleanType
        },
        maxDay: {
            type: IntType
        },
        subTitle: {
            type: StringType
        },
        subContent: {
            type: StringType
        },
        image: {
            type: StringType
        },
        status: {
            type: StringType
        }
    }
});

export default CancellationType;