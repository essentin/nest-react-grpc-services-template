import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

import InvitesType from '../../types/Invites/InvitesCommonType'

// Sequelize models
import { Invites, User, AdminUser } from '../../models'

const CreateInvites = {

    type: InvitesType,

    args: {
        email: { type: new NonNull(StringType) },
        firstName: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, {
        email,
        firstName
    }) {
        // Check if user is admin
        if (request.user.admin) {
            try {
                // Check if the user is already exists
                const checkUser = await User.findOne({
                    attributes: ['id', 'email'],
                    where: {
                        email: email,
                        userDeletedAt: null
                    },
                });

                // If already exists throw an error
                if (checkUser) {
                    return {
                        status: 500,
                        errorMessage: "This user already exists in FlowPass!"
                    };
                } else {

                    // Check email is used by admin users
                    const getAdminUserId = await AdminUser.find({
                        where: { email: email },
                    });

                    if (getAdminUserId) {
                        return {
                            status: 500,
                            errorMessage: "This user already exists in FlowPass!"
                        };
                    }

                    const invite = await Invites.find({
                        where: { email: email },
                    });

                    if (invite) {
                        return {
                            status: 500,
                            errorMessage: "This user already Invited in FlowPass!"
                        }
                    }

                    await Invites.create({
                        userId: request.user.id,
                        email,
                        firstName,
                    });


                    return {
                        status: 200,
                    }

                }
            } catch (e) {
                console.log(e)
            }

        } else {

            return {
                status: "notLoggedIn",
                errorMessage: "Please login and continue"
            };

        }
    },
};

export default CreateInvites;

