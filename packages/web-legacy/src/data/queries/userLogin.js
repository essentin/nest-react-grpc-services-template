// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType
} from 'graphql';
import userLoginType from '../types/userLoginType';
// Authentication Utils
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { auth } from '../../config';
// Sequelize models
import { User, UserLogin, UserClaim, UserProfile } from '../../data/models';
const userLogin = {
  type: userLoginType,
  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    userType: { type: new NonNull(IntType) }
  },
  async resolve({ request, response }, {
    email,
    password,
    userType
  }) {
    // Check if user already logged in
    if (!request.user) {
      // Check if the user is already exists
      const userLogin = await User.findOne({
        attributes: ['id', 'email', 'password', 'userBanStatus', 'userDeletedAt', 'userType'],
        where: {
          email: email,
          userDeletedAt: null
        },
      });
      // Let the user in
      if (userLogin) {
        if (bcrypt.compareSync(password, userLogin.password)) {
          if (userType !== userLogin.userType) {
            return {
              status: "invalidAccountType",
            };
          } else if (userLogin.userBanStatus == 1) {
            return {
              status: "userbanned",
            };
          } else if (userLogin.userDeletedAt != null) {
            return {
              status: "userDeleted",
            };
          } else {
            const expiresIn = 60 * 60 * 24 * 180; // 180 days
            const token = jwt.sign({ id: userLogin.id, email: userLogin.email, userType: userLogin.userType }, auth.jwt.secret, { expiresIn });
            response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
            return {
              status: "success",
            };
          }
        } else {
          return {
            status: "password",
          };
        }
      } else {
        return {
          status: "email",
        };
      }
    } else {
      if (request.user.admin == true) {
        return {
          status: "adminLoggedIn",
        };
      } else {
        return {
          status: "loggedIn",
        };
      }
    }
  },
};
export default userLogin;
