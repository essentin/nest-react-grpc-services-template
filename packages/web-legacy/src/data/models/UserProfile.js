import DataType from 'sequelize';
import Model from '../sequelize';

const UserProfile = Model.define('UserProfile', {

  userId: {
    type: DataType.UUID,
    primaryKey: true,
  },

  profileId: {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true
  },

  firstName: {
    type: DataType.STRING(100),
  },

  lastName: {
    type: DataType.STRING(100),
  },

  displayName: {
    type: DataType.STRING(100),
  },

  dateOfBirth: {
    type: DataType.STRING(100),
  },

  picture: {
    type: DataType.STRING(255),
  },

  gender: {
    type: DataType.STRING(50),
  },

  phoneNumber: {
    type: DataType.STRING(50),
  },

  preferredLanguage: {
    type: DataType.STRING(50),
  },

  preferredCurrency: {
    type: DataType.STRING(50),
  },

  info: {
    type: DataType.TEXT,
  },

  location: {
    type: DataType.TEXT,
  },

  stripeCusId: {
    type: DataType.STRING(255),
  },

  country: {
    type: DataType.INTEGER
  },

  verificationCode: {
    type: DataType.INTEGER
  },

  countryCode: {
    type: DataType.STRING(10)
  },

  countryName: {
    type: DataType.STRING(255),
  },

  zipcode: {
    type: DataType.STRING(10)
  },

  acceptTerms: {
    type: DataType.BOOLEAN
  },

  isPhotoSkipped: {
    type: DataType.BOOLEAN
  },

  stepTwo: {
    type: DataType.BOOLEAN
  },

  stepThree: {
    type: DataType.BOOLEAN
  },

  inviteCode: {
    type: DataType.STRING
  },

  maxInviteCount: {
    type: DataType.INTEGER
  },

  companyName: {
    type: DataType.STRING
  },

  isPartner: {
    type: DataType.BOOLEAN
  }

});

export default UserProfile;