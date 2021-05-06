import passport from '../passport/passport';
import jwt from 'jsonwebtoken';
import { auth } from '../../../config';

const googleAuth = app => {

  app.get('/login/google',
    function (req, res, next) {
      let referURL = req.query.refer, errorReturn = req.query.errorReturn;
      let inviteCode = req.query.inviteCode, userType = req.query.userType || 1;
      let expiresIn = 60 * 60; // 1 hour

      if (referURL) {
        referURL = referURL.indexOf('---') >= 0 ? referURL.replace('---', '?') : referURL;
        referURL = referURL.indexOf('--') >= 0 ? referURL.replace('--', '&') : referURL;
      }
      if (errorReturn) {
        errorReturn = errorReturn.indexOf('---') >= 0 ? errorReturn.replace('---', '?') : errorReturn;
        errorReturn = errorReturn.indexOf('--') >= 0 ? errorReturn.replace('--', '&') : errorReturn;
      }
      if (errorReturn) {
        res.cookie('errorReturn', errorReturn, { maxAge: 1000 * expiresIn, httpOnly: true });
      }
      if (referURL) {
        res.cookie('referURL', referURL, { maxAge: 1000 * expiresIn, httpOnly: true });
      }
      if (inviteCode) {
        res.cookie('inviteCode', inviteCode, { maxAge: 1000 * expiresIn, httpOnly: true });
      }

      res.cookie('userType', userType, { maxAge: 1000 * expiresIn, httpOnly: true });

      passport.authenticate('google',
        {
          scope: [
            'profile',
            'email'
          ],
          session: false,
        }
      )(req, res, next);
    }
  );

  app.get('/login/google/return',
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      const type = req.user.type;
      let referURL = req.cookies.referURL, errorReturn = req.cookies.errorReturn;
      if (errorReturn) res.clearCookie("errorReturn");

      const user = {
        id: req.user.id,
        email: req.user.email,
        userType: req.user.userType
      };

      let inviteCode = req.cookies.inviteCode;
      if (inviteCode) res.clearCookie("inviteCode");

      res.clearCookie("userType");

      if (type === 'verification') {
        res.redirect(auth.redirectURL.verification);
      } else if (type === 'userbanned') {
        res.redirect(auth.redirectURL.userbanned);
      } else if (type === 'userDeleted') {
        res.redirect(auth.redirectURL.returnURLDeletedUser);
      } else if (type === 'notInvited') {
        let errorMessage = 'Vi kan inte hitta dig på inbjudnibgslistan. Kontakta gärna oss för en personlig inbjudan. Uppskattar ditt intresse för Flowpass.';
        res.redirect(`${errorReturn}&error_message=${errorMessage}`);
      } else if (type === 'invalidAccountType') {
        let errorMessage = 'Uh -oh! We cannot find your account. Please make sure it is not misspelled or please "Sign up" instead.';
        res.redirect(`${errorReturn}&error_message=${errorMessage}`);
      } else {
        if (referURL) {
          res.clearCookie("referURL");
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
          res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          res.redirect(referURL);
        } else {
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
          res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          res.redirect(auth.redirectURL.login);
        }
      }
    }
  );
};

export default googleAuth;