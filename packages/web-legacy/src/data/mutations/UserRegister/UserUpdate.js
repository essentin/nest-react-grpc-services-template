import {
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType
} from 'graphql';

import { UserProfile } from '../../models';

import UserRegisterCommonType from '../../types/UserRegisterCommonType';

import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';

const UserUpdate = {

    type: UserRegisterCommonType,

    args: {
        firstName: { type: StringType },
        lastName: { type: StringType },
        zipcode: { type: StringType },
        isPhotoSkipped: { type: BooleanType },
        stepTwo: { type: BooleanType },
        stepThree: { type: BooleanType },
        companyName: { type: StringType }
    },

    async resolve({ request }, {
        firstName,
        lastName,
        zipcode,
        isPhotoSkipped,
        stepTwo,
        stepThree,
        companyName
    }) {
        if (request.user && request.user.admin != true) {
            try {
                let updatedFirstName, updatedLastName, displayName;
                if (firstName && lastName) {
                    updatedFirstName = capitalizeFirstLetter(firstName);
                    updatedLastName = capitalizeFirstLetter(lastName);
                    displayName = updatedFirstName + ' ' + updatedLastName;
                }

                const updateUser = UserProfile.update(
                    {
                        firstName: updatedFirstName,
                        lastName: updatedLastName,
                        displayName,
                        zipcode,
                        isPhotoSkipped,
                        stepTwo,
                        stepThree,
                        companyName
                    },
                    {
                        where: {
                            userId: request.user.id
                        }
                    }
                );

                return {
                    status: updateUser ? 200 : 500,
                    errorMessage: updateUser ? null : `User not updated`
                }
            } catch (e) {
                return {
                    status: 500,
                    errorMessage: `Something went wrong, ${e.message}`
                }
            }
        } else {
            return {
                status: 401,
                errorMessage: `User not logged in`
            };
        }
    },
};

export default UserUpdate;