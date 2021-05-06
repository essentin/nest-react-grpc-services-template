import DataType from 'sequelize';
import Model from '../sequelize';
import bcrypt from 'bcrypt';

const Listing = Model.define('Listing', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: DataType.UUID,
    allowNull: false
  },

  title: {
    type: DataType.STRING,
  },

  description: {
    type: DataType.TEXT,
  },

  personCapacity: {
    type: DataType.INTEGER,
  },

  country: {
    type: DataType.STRING,
  },

  street: {
    type: DataType.STRING,
  },

  buildingName: {
    type: DataType.STRING,
  },

  city: {
    type: DataType.STRING,
  },

  state: {
    type: DataType.STRING,
  },

  zipcode: {
    type: DataType.STRING,
  },

  lat: {
    type: DataType.FLOAT,
  },

  lng: {
    type: DataType.FLOAT,
  },

  coverPhoto: {
    type: DataType.INTEGER,
  },

  isMapTouched: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  bookingType: {
    type: DataType.ENUM('request', 'instant'),
    defaultValue: 'instant',
    allowNull: false
  },

  isPublished: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  isReady: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  reviewsCount: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  },

  isParking: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },

  parkingDescription: {
    type: DataType.TEXT,
  },

  isAllAge: {
    type: DataType.BOOLEAN,
    defaultValue: true,
  },

  houseRuleDesc: {
    type: DataType.TEXT,
  },

  wifiName: {
    type: DataType.TEXT,
  },

  arrivalInstruction: {
    type: DataType.TEXT,
  },

  spaceSize: {
    type: DataType.FLOAT,
  },

  contactName: {
    type: DataType.STRING
  },

  contactEmail: {
    type: DataType.STRING
  },

  contactPhoneNumber: {
    type: DataType.STRING
  },

  countryCode: {
    type: DataType.STRING,
    defaultValue: 'SE'
  },

  contactDialCode: {
    type: DataType.STRING,
    defaultValue: '+46'
  },

  isPartner: {
    type: DataType.BOOLEAN,
    defaultValue: 0
  }

});

export default Listing;