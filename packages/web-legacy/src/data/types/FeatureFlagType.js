import {
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
    GraphQLString as StringType,
    GraphQLObjectType as ObjectType
} from 'graphql';

import { features } from '../../config';

let featureFlagFields = {};
if (features.length > 0) features.map(feature => featureFlagFields[feature.key] = { type: BooleanType });

const FeatureFlagType = new ObjectType({
    name: 'FeatureFlag',
    fields: {
        ...featureFlagFields,
        status: { type: IntType },
        errorMessage: { type: StringType },
        result: {
            type: new ObjectType({
                name: 'FeaturesFlag',
                fields: {
                    count: { type: IntType },
                    ...featureFlagFields
                }
            })
        }
    }
});

export default FeatureFlagType;