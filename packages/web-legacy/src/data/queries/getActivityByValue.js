import {
	GraphQLString as StringType,
} from 'graphql';

// Models
import { ListSettings } from '../models';

// Types
import ListSettingsActivity from '../types/ListSettingsActivity';

const getActivityByValue = {

	type: ListSettingsActivity,
	args: {
		itemName: { type: StringType },
	},
	async resolve({ request }, { id }) {
		return await ListSettings.findOne({
			where: {
				itemName: itemName,
				isEnable: true
			}
		});
	}
};

export default getActivityByValue;

