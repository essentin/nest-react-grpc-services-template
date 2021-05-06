import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLInt as IntType
} from 'graphql';

import ForgotPasswordType from '../../types/EmailTokenType';
import { ForgotPassword, User } from '../../models';

const sendForgotPassword = {

    type: ForgotPasswordType,

    args: {
        email: { type: new NonNull(StringType) },
        userType: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, { email, userType }) {

        if (!request.user) {
            let userId, token = Date.now();
            const getUser = await User.findOne({
                where: {
                    email,
                    userType,
                    userDeletedAt: null
                }
            });

            if (getUser) {
                userId = getUser.id;
                const deleteOldToken = await ForgotPassword.destroy({
                    where: {
                        email,
                        userId
                    }
                });
                return await ForgotPassword.create({
                    email,
                    userId,
                    token
                });
            } else {
                return {
                    status: 'notAvailable'
                }
            }

        } else {
            return {
                status: '400'
            }
        }

    },
};

export default sendForgotPassword;

/**
mutation sendForgotPassword($email: String!, $userType: Int!) {
    sendForgotPassword (email: $email, userType: $userType) {
      id
      email
      token
      userId
      status
    }
}
 */
