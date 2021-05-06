import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType
} from 'graphql';
import jwt from 'jsonwebtoken';

import {
    User,
    UserProfile,
    AdminUser,
    UserVerifiedInfo,
    EmailToken
} from '../../models';

import UserRegisterCommonType from '../../types/UserRegisterCommonType';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { isUserInvited, changeInvitationStatus, getInviteCode, getMaxInviteCount } from '../../../helpers/inviteUserHelper';

import { auth } from '../../../config';

const CreateUser = {

    type: UserRegisterCommonType,

    args: {
        firstName: { type: StringType },
        lastName: { type: StringType },
        email: { type: new NonNull(StringType) },
        password: { type: new NonNull(StringType) },
        acceptTerms: { type: BooleanType },
        inviteEmail: { type: new NonNull(StringType) },
        inviteCode: { type: StringType }
    },

    async resolve({ request, response }, {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        acceptTerms,
        inviteEmail,
        inviteCode
    }) {

        let loginName = 'email';
        let updatedFirstName = capitalizeFirstLetter(firstName);
        let updatedLastName = capitalizeFirstLetter(lastName);
        let displayName = updatedFirstName + ' ' + updatedLastName;

        // Check if user already logged in
        if (!request.user) {
            try {
                let isInvited = await isUserInvited(inviteEmail, inviteCode);

                if (!isInvited) {
                    return {
                        status: 500,
                        errorMessage: "Invalid request"
                    };
                }

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
                        errorMessage: "Email already exist"
                    };
                } else {

                    // Check email is used by admin users
                    const getAdminUserId = await AdminUser.find({
                        where: { email: email },
                    });

                    if (getAdminUserId) {
                        return {
                            status: 500,
                            errorMessage: "Email already exist"
                        };
                    }

                    let newInviteCode = getInviteCode();
                    let maxInviteCount = await getMaxInviteCount();

                    // Create new User & Profile
                    const createUser = await User.create({
                        email: email,
                        emailConfirmed: true,
                        password: User.generateHash(password),
                        type: loginName,
                        profile: {
                            displayName,
                            firstName: updatedFirstName,
                            lastName: updatedLastName,
                            dateOfBirth,
                            acceptTerms,
                            inviteCode: newInviteCode,
                            maxInviteCount
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
                        ],
                    });

                    if (createUser) {
                        await changeInvitationStatus(inviteEmail, email, inviteCode);

                        const expiresIn = 60 * 60 * 24 * 180; // 180 days
                        const token = jwt.sign({ id: createUser.id, email: createUser.email, userType: createUser.userType }, auth.jwt.secret, { expiresIn });
                        response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
                        const getToken = await EmailToken.findOne({ where: { userId: createUser.id } });
                        return await {
                            status: 200,
                            result: {
                                emailToken: getToken.dataValues.token,
                            }
                        };
                    } else {
                        return {
                            status: 500,
                            errorMessage: "user not created"
                        };
                    }
                }
            } catch (e) {
                return {
                    status: 500,
                    errorMessage: "Something went wrong," + e.message
                };
            }
        } else {
            if (request.user.admin == true) {
                return {
                    status: 500,
                    errorMessage: "Logged in as admin user"
                };
            } else {
                return {
                    status: 500,
                    errorMessage: "Logged in"
                };
            }
        }

    },
};

export default CreateUser;