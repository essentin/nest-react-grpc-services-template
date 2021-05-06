require('dotenv').config();

/* eslint-disable max-len */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
export const url = process.env.WEBSITE_URL || 'http://localhost:3001';
export const sitename = process.env.SITENAME || 'Your Website Name';
export const adminEmail = [
  'admin_001@yourdomain.com',
  'admin_002@yourdomain.com',
  'admin_003@yourdomain.com'
];

// Max File upload size in MB
export const maxUploadSize = 10;

// default locale is the first one
export const locales = ['en-US', 'sv-SV'];

export const databaseUrl = process.env.DATABASE_URL;

export const doSpacesEndpoint = '< Your space endpoint >'
export const doSpacesAccessKey = '< Your access key >'
export const doSpacesSecretKey = '< Your space secret key >'
export const doSpacesName = '< Your space name >'

// Listing Photos Upload Directory
export const fileuploadDir = process.env.FILEUPLOAD_DIR || './images/upload/';

// Logo upload directory
export const logouploadDir = process.env.LOGOUPLOAD_DIR || './images/logo/';

// Home page Banner upload directory
export const banneruploadDir = process.env.BANNER_UPLOAD_DIR || './images/banner/';

// User Profile Photos Upload Directory
export const profilePhotouploadDir = process.env.PROFILE_PHOTO_UPLOAD_DIR || './images/avatar/';

// Amenities image upload directory
export const amenitiesUploadDir = process.env.AMENITIES_UPLOAD_DIR || './images/amenities/';

// Static block image upload directory
export const homebanneruploadDir = process.env.HOME_BANNER_UPLOAD_DIR || './images/home/';

// Site Admin Icon image upload directory
export const iconUploadDir = process.env.ICONUPLOAD_DIR || './images/icon/';

// Site Admin Cancel Image upload directory
export const cancellationDir = process.env.CANCELLATION_DIR || './images/cancellation/';

export const analytics = {

  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X',
  },

};

export const googleMapAPI = process.env.GOOGLE_MAP_API || '<Your API Key>';

export const googleMapServerAPI = process.env.GOOGLE_MAP_SERVER_API || '<Your API Key>';

export const serverKey = process.env.PUSH_NOTIFICATION_SERVER_KEY || '<Your API Key>';

export const payment = {

  stripe: {
    secretKey: process.env.STRIPE_SECRET, /* From ENV */
    publishableKey: 'pk_test_3DbjLdpBqXOfOAjjf0nQq9av'
  }

};

export const setBoundary = {
  north: 59.427841,
  south: 59.224443,
  west: 17.765876,
  east: 18.198229,
}

// site key for google recaptcha
export const googleCaptcha = {
  sitekey: '<Your Site key>',
};

// SMS verification
export const sms = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNTSID,
    authToken: process.env.TWILIO_AUTHTOKEN,
    phoneNumber: process.env.TWILIO_PHONENUMBER
  }
};

// Email Settings
export const emailConfig = {
  host: process.env.SMTP_HOST, /* From ENV */
  port: process.env.SMTP_PORT || 25,
  email: process.env.SMTP_LOGIN_EMAIL || '<Your Login Email>',
  sender: process.env.SMTP_FROM_NAME || '<Your From Name>',
  senderEmail: process.env.SMTP_SENDER_EMAIL || '<Your Sender Email>',
  password: process.env.SMTP_LOGIN_PASSWORD,
  secure: process.env.SMTP_SECURE || false,
  tls: process.env.SMTP_TLS || false,
};

export const sendgridConfig = {
  apiKey: process.env.SENDGRID_API_KEY,
  senderEmail: '<Your Sendgrid configured email>',
  templates: {
    template_name: 'template_id',
  }
}

export const auth = {

  jwt: { secret: process.env.JWT_SECRET },

  redirectURL: {
    login: process.env.LOGIN_URL || '/',
    verification: process.env.LOGIN_URL || '/security',
    userbanned: process.env.USER_BANNED_URL || '/userbanned',
    returnURLDeletedUser: process.env.DELETE_USER_URL || '/userbanned'
  },

  // https://developers.facebook.com/
  facebook: {
    id: process.env.FACEBOOK_APP_ID,
    secret: process.env.FACEBOOK_APP_SECRET,
    returnURL: process.env.FACEBOOK_CLIENT_URL || `${url}/login/facebook/return`,
  },

  // https://cloud.google.com/console/project
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
    returnURL: process.env.GOOGLE_CLIENT_URL || `${url}/login/google/return`,
  },

  linkedin: {
    id: process.env.LINKEDIN_CLIENT_ID,
    secret: process.env.LINKEDIN_CLIENT_SECRET,
    returnURL: process.env.LINKEDIN_CLIENT_URL || `${url}/login/LINKEDIN/return`,
  },
};

export const databaseEnv = 'local';

export const defaultLat = 59.3293;
export const defaultLng = 18.0686;

export const optimizelySDKKey = 'SDK_KEY';
export const features = [
  { key: 'checkIn', name: 'Check-in' },
  { key: 'linkedIn', name: 'linked-in' },
  { key: 'suggestWorkspace', name: 'suggest-workspace' },
  { key: 'inviteUser', name: 'invite_user' },
  { key: 'hostExperience', name: 'host_experience' },
  { key: 'security', name: 'security' }
];