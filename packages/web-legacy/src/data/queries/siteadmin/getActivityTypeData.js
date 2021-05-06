import ActivityTypeDataScheme from '../../types/siteadmin/ActivityType';
import { ActivityType } from '../../../data/models';

const getActivityType = {

  type: ActivityTypeDataScheme,

  async resolve({ request }) {
    const getResults = await ActivityType.findAll({
      attributes: ["id", "isEnable", "name"]
    });

    if (!getResults) {
      return {
        status: 400
      }
    }
    return {
      status: 200,
      results: getResults
    }
  },

};

export default getActivityType;
