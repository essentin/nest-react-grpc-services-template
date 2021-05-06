import {
    GraphQLString as StringType,
} from 'graphql';

import {
    User,
    AdminUser
} from '../../models';

import CommonResponseType from '../../types/siteadmin/CommonResponseType';

const checkUserExist = {

    type: CommonResponseType,

    args: {
        email: { type: StringType }
    },

    async resolve({ request, response }, { email }) {
        try {
            if (request.user && request.user.admin) {
                let attributes = ['id'];

                const checkUser = await User.findOne({
                    attributes,
                    where: {
                        email
                    }
                });
                const getAdminUser = await AdminUser.find({
                    attributes,
                    where: {
                        email
                    }
                });

                return await {
                    status: (checkUser || getAdminUser) ? 500 : 200
                };
            } else {
                return {
                    status: 500,
                    errorMessage: "Please login and continue"
                };
            }

        } catch (error) {
            return {
                status: 500,
                errorMessage: "Oops! something went wrong. Please try again." + error
            };
        }
    }
};

export default checkUserExist;

/*
query CheckUserExist($email: String){
  checkUserExist(email: $email){
    status
  }
}
*/