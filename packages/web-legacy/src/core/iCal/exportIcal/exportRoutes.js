var ical = require('ical-generator');
import { sitename, url } from '../../../config';
import { getRange } from '../../../helpers/dateRange';
import { getBlockedDates, isListExist } from './dbFunctions';

var cal = ical({ domain: url, name: sitename });

const exportICalRoutes = app => {

    app.get('/export-calendar', async function (req, res) {
        var listId = req.query['id'];
        var datesCollection = [];
        const listData = await isListExist(listId);
        if (listData) {
            const dates = await getBlockedDates(listId);
            if (dates && dates.length > 0) {
                datesCollection = getRange(dates);
                cal.clear();
                datesCollection.map((item) => {
                    cal.createEvent({
                        start: item.startDate,
                        end: item.endDate,
                        summary: sitename + ' - ' + listData.title,
                        description: listData.title,
                        location: listData.city,
                        url: url + '/space/' + listData.id
                    });
                });
            } else {
                cal.clear();
            }
        } else {
            cal.clear();
        }
        cal.serve(res);
    })
};

export default exportICalRoutes;