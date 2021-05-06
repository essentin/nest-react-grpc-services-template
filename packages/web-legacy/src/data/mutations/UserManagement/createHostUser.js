import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';

import {
    User,
    UserProfile,
    AdminUser,
    UserVerifiedInfo,
    EmailToken
} from '../../models';

import UserRegisterCommonType from '../../types/UserRegisterCommonType';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { getInviteCode, getMaxInviteCount } from '../../../helpers/inviteUserHelper';

const createHostUser = {

    type: UserRegisterCommonType,

    args: {
        firstName: { type: new NonNull(StringType) },
        lastName: { type: StringType },
        email: { type: new NonNull(StringType) },
        password: { type: new NonNull(StringType) },
        zipcode: { type: StringType }
    },

    async resolve({ request, response }, {
        firstName,
        lastName,
        email,
        password,
        zipcode
    }) {

        try {
            if (!(request.user && request.user.admin)) return {
                status: 401,
                errorMessage: "Please login and continue."
            }

            let loginName = 'email',
                updatedFirstName = capitalizeFirstLetter(firstName),
                updatedLastName = lastName && capitalizeFirstLetter(lastName),
                displayName = updatedFirstName + ' ' + updatedLastName;

            const checkUser = await User.findOne({
                attributes: ['email'],
                where: {
                    email: email,
                    userDeletedAt: null
                }
            });

            // Check email is used by admin users
            const checkAdminUser = await AdminUser.find({
                where: { email: email },
            });

            // If already exists throw an error
            if (checkUser || checkAdminUser) return {
                status: 500,
                errorMessage: "Email already exists"
            };

            const maxInviteCount = await getMaxInviteCount();
            let inviteCode = getInviteCode();

            // Create new User & Profile
            const createUser = await User.create({
                email,
                emailConfirmed: true,
                password: User.generateHash(password),
                type: loginName,
                userType: 2,
                isAdmin: true,
                profile: {
                    displayName,
                    firstName: updatedFirstName,
                    lastName: updatedLastName,
                    acceptTerms: true,
                    inviteCode,
                    maxInviteCount,
                    zipcode,
                    isPhotoSkipped: true,
                    stepTwo: true,
                    stepThree: true
                },
                userVerifiedInfo: {
                    isEmailConfirmed: false
                },
                emailToken: {
                    token: Date.now(),
                    email
                }
            }, {
                include: [
                    { model: UserProfile, as: "profile" },
                    { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
                    { model: EmailToken, as: 'emailToken' },
                ]
            });

            return await {
                status: createUser ? 200 : 500,
                errorMessage: !createUser ? "Something went wrong" : null
            }
        } catch (e) {
            return {
                status: 500,
                errorMessage: "Something went wrong, " + e
            };
        }

    },
};

export default createHostUser;