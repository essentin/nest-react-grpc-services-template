import passport from '../passport/passport';
import jwt from 'jsonwebtoken';
import { auth } from '../../../config';

const facebookAuth = app => {

  app.get('/login/facebook',
    function (req, res, next) {
      let referURL = req.query.refer, errorReturn = req.query.errorReturn;
      let inviteCode = req.query.inviteCode, userType = req.query.userType || 1;
      let expiresIn = 60 * 60; // 1 hour

      if (referURL && referURL != null) {
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

      passport.authenticate('facebook',
        {
          scope: [
            'email'
          ],
          session: false,
        }
      )(req, res, next);
    }
  );

  app.get('/login/facebook/return',
    (req, res, next) => {
      if (req.query.error_code) {
        let errorReturn = req.cookies.errorReturn;
        res.clearCookie("errorReturn");
        res.redirect(`${errorReturn}&error_message=${req.query.error_message}`);
      } else {
        next();
      }
    },
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      session: false
    }),
    (req, res) => {
      const type = req.user.type;
      let referURL = req.cookies.referURL;

      let errorReturn = req.cookies.errorReturn;
      if (errorReturn) res.clearCookie("errorReturn");

      let inviteCode = req.cookies.inviteCode;
      if (inviteCode) res.clearCookie("inviteCode");

      res.clearCookie("userType");

      if (type === 'verification') {
        res.redirect(auth.redirectURL.verification);
      } else if (type === 'userbanned') {
        res.redirect(auth.redirectURL.userbanned);
      } else if (type === 'userDeleted') {
        res.redirect(auth.redierrorReturnDeletedUser);
      } else if (type === 'notInvited') {
        let errorMessage = 'Vi kan inte hitta dig på inbjudnibgslistan. Kontakta gärna oss för en personlig inbjudan. Uppskattar ditt intresse för Flowpass.';
        res.redirect(`${errorReturn}&error_message=${errorMessage}`);
      } else if (type === 'emailRequired') {
        let errorMessage = 'Det verkar som du använt telefonnumer hos Facebook. Vi behöver din email för framtida kommunikation. Om du vill använda Facebook behöver du logga in med email hos dem.';
        res.redirect(`${errorReturn}&error_message=${errorMessage}`);
      } else if (type === 'invalidAccountType') {
        let errorMessage = 'Uh -oh! We cannot find your account. Please make sure it is not misspelled or please "Sign up" instead.';
        res.redirect(`${errorReturn}&error_message=${errorMessage}`);
      } else {
        if (referURL) {
          res.clearCookie("referURL");
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
          res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          res.redirect(referURL);
        } else {
          const expiresIn = 60 * 60 * 24 * 180; // 180 days
          const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
          res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
          res.redirect(auth.redirectURL.login);
        }
      }
    }
  );

};

export default facebookAuth;
