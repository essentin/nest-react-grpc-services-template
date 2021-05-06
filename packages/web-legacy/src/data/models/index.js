import sequelize from '../sequelize';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';
import UserVerifiedInfo from './UserVerifiedInfo';
import EmailToken from './EmailToken';
import Reviews from './Reviews';
import ForgotPassword from './ForgotPassword';

//Payment
import PaymentMethods from './PaymentMethods';

// Payment Transaction and Booking
import Reservation from './Reservation';
import Transaction from './Transaction';

// Listing
import Listing from './Listing';
import ListingData from './ListingData';
import UserAmenities from './UserAmenities';
import UserSafetyAmenities from './UserSafetyAmenities';
import UserSpaces from './UserSpaces';
import UserListingSteps from './UserListingSteps';
import UserHouseRules from './UserHouseRules';
import ListPhotos from './ListPhotos';
import ListBlockedDates from './ListBlockedDates';
import Currencies from './Currencies';
import CurrencyRates from './CurrencyRates';
import Country from './Country';
import Cancellation from './Cancellation';
import CancellationDetails from './CancellationDetails';
import ListCalendar from './ListCalendar';
import UserMood from './UserMood';
// Site Admin
import AdminUser from './siteadmin/AdminUser';
import SiteSettings from './siteadmin/SiteSettings';
import ListSettings from './siteadmin/ListSettings';
import ListSettingsTypes from './siteadmin/ListSettingsTypes';
import StaticPage from './StaticPage';
import ServiceFees from './ServiceFees';
import UserInvitationSettings from './siteadmin/UserInvitationSettings';

// Wish List
import WishListGroup from './WishListGroup';
import WishList from './WishList';

// Special Price
import ReservationSpecialPricing from './ReservationSpecialPricing';

// Admin Roles and Privileges
import AdminRoles from './siteadmin/AdminRoles';
import AdminPrivileges from './siteadmin/AdminPrivileges';

//Activity Type
import ActivityType from './ActivityType';

import SpacePricing from './SpacePricing';
import SpaceAvailability from './SpaceAvailability';
import SpaceAvailabilitySession from './SpaceAvailabilitySession';

import ReservationBlockedDates from './ReservationBlockedDates';

import CardDetails from './CardDetails';

// Reservation ~~ Transaction

// Admin Invitation
import Invites from './Invites';
import DeletedInvite from './DeletedInvite';

// Referral or Invitation from User
import UserInvitation from './UserInvitation';


// Beta members history
import BetaMembers from './BetaMembers';
// Suggested workplaces
import SuggestedWorkplace from './SuggestedWorkplace';

import SpaceOpeningTime from './SpaceOpeningTime';

Reservation.hasMany(Transaction, {
  foreignKey: 'reservationId',
  as: 'transaction',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reservation.hasMany(ListBlockedDates, {
  foreignKey: 'reservationId',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Transaction.belongsTo(Reservation, {
  foreignKey: 'reservationId',
  as: 'reservation',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reservation.hasOne(CancellationDetails, {
  foreignKey: 'reservationId',
  as: 'cancellationDetails',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/*Reservation.hasMany(Reviews, {
  foreignKey: 'reservationId',
  as: 'reviews'
});*/

// USER - Releation with other Tables

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserVerifiedInfo, {
  foreignKey: 'userId',
  as: 'userVerifiedInfo',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(EmailToken, {
  foreignKey: 'userId',
  as: 'emailToken',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(ForgotPassword, {
  foreignKey: 'userId',
  as: 'forgotPassword',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Listing, {
  foreignKey: 'userId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(Reviews, {
  foreignKey: 'userId',
  as: 'reviews',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reviews.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Reviews.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/** User - Relation ends **/

// Listing - Relation with other tables

Listing.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasOne(UserListingSteps, {
  foreignKey: 'listId',
  as: 'userListingSteps',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListPhotos, {
  foreignKey: 'listId',
  as: 'listPhotos',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListBlockedDates, {
  foreignKey: 'listId',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(SpaceAvailability, {
  foreignKey: 'listId',
  as: 'spaceAvailability',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(SpaceAvailabilitySession, {
  foreignKey: 'listId',
  as: 'spaceAvailabilitySession',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasOne(ListingData, {
  foreignKey: 'listId',
  as: 'listingData',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Amenities
Listing.hasMany(UserAmenities, {
  foreignKey: 'listId',
  as: 'userAmenities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// HouseRules
Listing.hasMany(UserHouseRules, {
  foreignKey: 'listId',
  as: 'userHouseRules',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Safety Amenities
Listing.hasMany(UserSafetyAmenities, {
  foreignKey: 'listId',
  as: 'userSafetyAmenities',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Spaces
Listing.hasMany(UserSpaces, {
  foreignKey: 'listId',
  as: 'userSpaces',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Moods
Listing.hasMany(UserMood, {
  foreignKey: 'listId',
  as: 'userMood',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(SpacePricing, {
  foreignKey: 'listId',
  as: 'spacePricingData',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(ListCalendar, {
  foreignKey: 'listId',
  as: 'listCalendar',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(Reviews, {
  foreignKey: 'listId',
  as: 'reviews',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(SpaceOpeningTime, {
  foreignKey: 'listId',
  as: 'spaceOpeningTime',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

/** Listing Table Relation ends **/

UserProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserVerifiedInfo.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

EmailToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ForgotPassword.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserListingSteps.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListCalendar.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListCalendar.hasMany(ListBlockedDates, {
  foreignKey: 'id',
  as: 'listBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListBlockedDates.belongsTo(ListCalendar, {
  foreignKey: 'calendarId',
  as: 'listCalendar',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListPhotos.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListBlockedDates.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListingData.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserAmenities.belongsTo(ListSettings, {
  foreignKey: 'amenitiesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserHouseRules.belongsTo(ListSettings, {
  foreignKey: 'houseRulesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserSafetyAmenities.belongsTo(ListSettings, {
  foreignKey: 'safetyAmenitiesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserSpaces.belongsTo(ListSettings, {
  foreignKey: 'spacesId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

UserMood.belongsTo(ListSettings, {
  foreignKey: 'moodsId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListSettings.belongsTo(ListSettingsTypes, {
  foreignKey: 'typeId',
  as: 'listSettingsTypes',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ListSettingsTypes.hasMany(ListSettings, {
  foreignKey: 'typeId',
  as: 'listSettings',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

WishListGroup.hasMany(WishList, {
  foreignKey: 'wishListGroupId',
  as: 'wishList',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

WishList.belongsTo(WishListGroup, {
  foreignKey: 'wishListGroupId',
  as: 'wishListGroup',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Listing.hasMany(WishList, {
  foreignKey: 'listId',
  as: 'wishList',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

WishList.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

AdminRoles.hasMany(AdminPrivileges, {
  foreignKey: 'roleId',
  as: 'adminPrivileges',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

AdminPrivileges.belongsTo(AdminRoles, {
  foreignKey: 'roleId',
  as: 'adminRoles',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

// Reservation - ReservationBlockedDates
Listing.hasMany(ReservationBlockedDates, {
  foreignKey: 'listId',
  as: 'reservationBlockedDates',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

ReservationBlockedDates.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

SpaceOpeningTime.belongsTo(Listing, {
  foreignKey: 'listId',
  as: 'listing',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export {
  User,
  UserLogin,
  UserClaim,
  UserProfile,
  Listing,
  AdminUser,
  SiteSettings,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingSteps,
  ListSettings,
  ListSettingsTypes,
  UserHouseRules,
  ListingData,
  ListPhotos,
  ListBlockedDates,
  Currencies,
  CurrencyRates,
  Country,
  UserVerifiedInfo,
  EmailToken,
  ForgotPassword,
  PaymentMethods,
  Reservation,
  Transaction,
  ServiceFees,
  Cancellation,
  CancellationDetails,
  Reviews,
  ListCalendar,
  WishListGroup,
  WishList,
  StaticPage,
  ReservationSpecialPricing,
  AdminRoles,
  AdminPrivileges,
  ActivityType,
  SpacePricing,
  SpaceAvailability,
  SpaceAvailabilitySession,
  ReservationBlockedDates,
  CardDetails,
  Invites,
  UserMood,
  DeletedInvite,
  UserInvitation,
  UserInvitationSettings,
  BetaMembers,
  SuggestedWorkplace,
  SpaceOpeningTime
};
