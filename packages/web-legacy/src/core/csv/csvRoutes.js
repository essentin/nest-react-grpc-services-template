var csv = require('csv-express')

import { listings, reservations, users } from './adminData';

const csvRoutes = app => {
	app.get('/export-admin-data', async function (req, res) {
		var type = req.query.type;
		let userType = req.query.usertype
		let keyword = req.query.keyword
		if (req.user && req.user.admin && type) {
			let data = [];
			if (type === 'users') {
				data = await users(keyword, userType);
			} else if (type === 'listings') {
				data = await listings();
			} else if (type === 'reservations') {
				data = await reservations();
			}
			res.setHeader('Content-disposition', 'attachment; filename=' + type + '-data.csv');
			res.set('Content-Type', 'text/csv');
			res.csv(data, true);
		} else {
			res.redirect('/');
		}
	})
};

export default csvRoutes;