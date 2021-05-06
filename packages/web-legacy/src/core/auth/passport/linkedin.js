import passport from 'passport';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { EmailToken, User, UserProfile, UserVerifiedInfo, Invites } from '../../../data/models';
import { auth as config } from '../../../config';
// Send Email
import { sendEmail } from '../../email/sendEmail';
// Upload profile image from linkedin
import { downloadFile } from '../../download/download';
// Helper
import { capitalizeFirstLetter } from '../../../helpers/capitalizeFirstLetter';
import { isUserInvited, changeInvitationStatus, getInviteCode, getMaxInviteCount } from '../../../helpers/inviteUserHelper';

passport.use(
    new LinkedInStrategy(
        {
            clientID: config.linkedin.id,
            clientSecret: config.linkedin.secret,
            callbackURL: config.linkedin.returnURL,
            scope: ['r_emailaddress', 'r_liteprofile'],
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            /* eslint-disable no-underscore-dangle */
            const loginName = 'linkedin';
            const claimType = 'urn:linkedin:access_token';
            const linkedinLogin = async () => {
                let random = Date.now();
                if (req.user) {
                    // For Google Verfication
                    await UserVerifiedInfo.update(
                        {
                            isLinkedinConnected: true,
                        },
                        {
                            where: { userId: req.user.id },
                        },
                    );
                    done(null, {
                        type: 'verification',
                    });
                } else {
                    let email =
                        profile &&
                        profile.emails &&
                        profile.emails[0] &&
                        profile.emails[0].value;
                    let userType = Number(req.cookies.userType);

                    const userLogin = await User.findOne({
                        attributes: ['id', 'email', 'userBanStatus', 'userDeletedAt', 'userType'],
                        where: { email, userDeletedAt: null },
                    });
                    if (userLogin) {
                        if (userType !== userLogin.userType) {
                            done(null, { type: 'invalidAccountType' });
                        } else if (userLogin.userBanStatus == 1) {
                            done(null, {
                                id: userLogin.id,
                                email: userLogin.email,
                                type: 'userbanned',
                            });
                        } else if (userLogin.userDeletedAt != null) {
                            done(null, {
                                id: userLogin.id,
                                email: userLogin.email,
                                type: 'userDeleted',
                            });
                        } else {
                            // There is an account associated with this email
                            await UserVerifiedInfo.update(
                                {
                                    isLinkedinConnected: true,
                                },
                                {
                                    where: { userId: userLogin.id },
                                },
                            );
                            done(null, {
                                id: userLogin.id,
                                email: userLogin.email,
                                userType: userLogin.userType,
                                type: 'login',
                            });
                        }
                    } else {
                        if (userType === 2) {
                            done(null, { type: 'invalidAccountType' });
                            return '';
                        }

                        let picture, inviteCode = req.cookies.inviteCode, profileUrl;
                        const isInvited = await isUserInvited(email, inviteCode);

                        if (!isInvited) {
                            done(null, { type: 'notInvited' });
                            return '';
                        }

                        await changeInvitationStatus(email, email, inviteCode);

                        if (profile && profile.photos && profile.photos.length > 0 && profile.photos[0].value) {
                            const FullProfileUrl = profile.photos[0] && profile.photos[0].value && profile.photos[3].value ? profile.photos[3].value : profile.photos[0].value;
                            if (FullProfileUrl) {
                                profileUrl = FullProfileUrl;
                            } else {
                                profileUrl = '';
                            }

                            // Do not upload when user only have default profile image
                            if (profileUrl) {
                                const originalImage = profileUrl.replace('?sz=50', '');
                                const profilePictureData = await downloadFile(originalImage);
                                if (profilePictureData.status === 200) {
                                    picture = profilePictureData.filename;
                                }
                            }
                        }


                        let updatedFirstName = capitalizeFirstLetter(profile.name.givenName);
                        let updatedLastName = capitalizeFirstLetter(profile.name.familyName);
                        let displayName = updatedFirstName + ' ' + updatedLastName;
                        let newInviteCode = getInviteCode();
                        let maxInviteCount = await getMaxInviteCount();

                        const user = await User.create(
                            {
                                email: email,
                                emailVerified: true,
                                password: User.generateHash(random.toString()),
                                type: loginName,
                                profile: {
                                    displayName,
                                    firstName: updatedFirstName,
                                    lastName: updatedLastName,
                                    picture,
                                    inviteCode: newInviteCode,
                                    maxInviteCount
                                },
                                userVerifiedInfo: {
                                    isLinkedinConnected: true,
                                },
                                emailToken: {
                                    token: random,
                                    email: email,
                                },
                            },
                            {
                                include: [
                                    { model: UserProfile, as: 'profile' },
                                    { model: UserVerifiedInfo, as: 'userVerifiedInfo' },
                                    { model: EmailToken, as: 'emailToken' },
                                ],
                            },
                        );
                        // Send Email
                        let content = {
                            token: random,
                            name: profile.name.givenName,
                            email: email,
                        };
                        sendEmail(email, 'welcomeEmail', content);
                        done(null, {
                            id: user.id,
                            email: user.email,
                            userType: user.userType,
                            type: 'login',
                        });
                    }
                }
            };
            linkedinLogin().catch(done);
        },
    ),
);
export default passport;