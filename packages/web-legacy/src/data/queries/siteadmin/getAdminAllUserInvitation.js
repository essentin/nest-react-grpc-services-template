import {
	GraphQLString as StringType,
	GraphQLInt as IntType
} from 'graphql';

import UserInvitationCommonType from '../../types/UserInvitation/UserInvitationCommonType';
import { UserInvitation } from '../../models';

const getAdminAllUserInviteation = {

	type: UserInvitationCommonType,

	args: {
		currentPage: { type: IntType },
		searchList: { type: StringType }
	},

	async resolve({ request }, { currentPage, searchList }) {
		try {
			if (request.user && request.user.admin) {
				let limit = 10, offset = 0, results, count, where = {};

				if (request.user || !request.user.admin) {
					return {
						status: 401,
						errorMessage: 'Please login with your account and continue.'
					};
				}
				// Offset from Current Page
				if (currentPage) {
					offset = (currentPage - 1) * limit;
				}

				if (searchList) {
					where = {
						$or: [
							{
								firstName: {
									$like: '%' + searchList + '%'
								}
							},
							{
								email: {
									$like: '%' + searchList + '%'
								}
							},
						]
					}
				}

				count = await UserInvitation.count({
                    attributes: ['id'],
					where
				});

				results = await UserInvitation.findAll({
                    attributes: ['email', 'invitedAt', 'registeredAt', 'status'],
					where,
					limit,
					offset,
					order: [['id', 'ASC']]
				});

				return {
					results,
					count,
					status: results ? 200 : 500,
					errorMessage: results ? null : "Oops! Something went wrong, please try again"
				};
			} else {
				return {
					status: 401,
					errorMessage: `Oops! Please login and continue.`
				}
			}
		} catch (e) {
			return {
				status: 500,
				errorMessage: `Something went wrong, ${e.message}`
			}
		}
	},

};

export default getAdminAllUserInviteation;