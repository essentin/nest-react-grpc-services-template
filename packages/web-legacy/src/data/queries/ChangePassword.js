import { 
  GraphQLNonNull as NonNull,
  GraphQLString as StringType 
} from 'graphql';

import { User } from '../../data/models';

import CommonResponseType from '../types/siteadmin/CommonResponseType';

const ChangePassword = {

  type: CommonResponseType,

  args: { newPassword: { type: new NonNull(StringType) } },

  async resolve({ request, response }, { newPassword }) {

    try {

      if (!request.user || request.user.admin) {
        return {
          status: 401,
          errorMessage: 'Please login with your account and continue.'
        };
      }

      const result = User.update(
        { password: User.generateHash(newPassword) },
        { where: { id: request.user.id } }
      );

      return {
        status: result ? 200 : 500,
        errorMessage: result ? null : "Something went wrong, Please try again",
      };

    } catch (e) {
      return {
        status: 500,
        errorMessage: 'Something went wrong!,' + error,
      };
    }

  }
};

export default ChangePassword;