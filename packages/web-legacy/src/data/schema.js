import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import news from './queries/news';
import intl from './queries/intl';
import userLogin from './queries/userLogin';
import userLogout from './queries/userLogout';
import userAccount from './queries/userAccount';
import userEditProfile from './queries/userEditProfile';
import showUserProfile from './queries/showUserProfile';
import locationItem from './queries/locationItem';
import createListing from './queries/createListing';
import showListing from './queries/showListing';
import showListingSteps from './queries/showListingSteps';
import ManageListingSteps from './queries/ManageListingSteps';
import getListingSettings from './queries/getListingSettings';
import updateListing from './queries/updateListing';
import updateListingStep2 from './queries/updateListingStep2';
import updateListingStep3 from './queries/updateListingStep3';
import updateListingStep4 from './queries/updateListingStep4';
import DateAvailability from './queries/DateAvailability';
import getListingSpecSettings from './queries/getListingSpecSettings';
import GetAddressComponents from './queries/GetAddressComponents';
import getCountries from './queries/getCountries';
import ChangePassword from './queries/ChangePassword';
import getUserVerifiedInfo from './queries/getUserVerifiedInfo';
import updateUserVerifiedInfo from './queries/updateUserVerifiedInfo';
import UploadProfilePicture from './queries/UploadProfilePicture';
import RemoveProfilePicture from './queries/RemoveProfilePicture';
import EmailVerification from './queries/EmailVerification';
import ResendConfirmEmail from './queries/ResendConfirmEmail';
// Forgot Password
import sendForgotPassword from './mutations/ForgotPassword/SendForgotPassword';
import forgotPasswordVerification from './queries/ForgotPassword/ForgotPasswordVerification';
import changeForgotPassword from './mutations/ForgotPassword/ChangeForgotPassword';

// Payment/Booking
import createReservation from './mutations/Payment/createReservation';

// Reservation
import getItinerary from './queries/Reservation/getItinerary';
import getListReservation from './queries/Reservation/getListReservation';
import getAllReservation from './queries/Reservation/getAllReservation';
import getAllReservationAdmin from './queries/Reservation/getAllReservationAdmin';
import checkReservation from './queries/Reservation/checkReservation';
import updateReservation from './mutations/Reservation/updateReservation';
import getPaymentData from './queries/Reservation/getPaymentData';
import cancelReservationData from './queries/Reservation/cancelReservationData';
import cancelReservation from './mutations/Reservation/cancelReservation';
import viewReservationAdmin from './queries/Reservation/viewReservationAdmin';

// Ban/ Unban user
import getUserBanStatus from './queries/getUserBanStatus';

// Remove Listing
import RemoveListing from './mutations/Listing/RemoveListing';

// Currency
import getCurrencies from './queries/getCurrencies';
import Currency from './queries/Currency';
import StoreCurrencyRates from './queries/StoreCurrencyRates';
import getBaseCurrency from './queries/getBaseCurrency';
import managePaymentCurrency from './mutations/Currency/managePaymentCurrency';

// Manage Listing
import ManageListings from './queries/ManageListings';
import managePublish from './mutations/Listing/ManagePublish';

import getListingCalendars from './queries/Listing/getListingCalendars';
import deleteCalendar from './mutations/Listing/DeleteImportCalendar';
import getBlockedDates from './queries/Listing/getBlockedDates';
import blockImportedDates from './mutations/Listing/BlockImportedDates';

// Search Listing
import SearchListing from './queries/SearchListing';

// List Photos
import CreateListPhotos from './mutations/CreateListing/CreateListPhotos';
import RemoveListPhotos from './mutations/CreateListing/RemoveListPhotos';
import ShowListPhotos from './queries/ShowListPhotos';

import UserListing from './queries/UserListing';
import getListMeta from './queries/Listing/getListMeta';

import getProfile from './queries/UserProfile';

// For Site Admin

// User Management
import deleteUser from './mutations/UserManagement/deleteUser';

// Listing Management
import adminRemoveListing from './mutations/SiteAdmin/ListingManagement/adminRemoveListing';

// Currency Management
import currencyManagement from './mutations/SiteAdmin/CurrencyManagement/currencyManagement';
import baseCurrency from './mutations/SiteAdmin/CurrencyManagement/baseCurrency';

// Logo
import uploadLogo from './mutations/SiteAdmin/Logo/uploadLogo';
import removeLogo from './mutations/SiteAdmin/Logo/removeLogo';
import getLogo from './queries/siteadmin/getLogo';

import adminUserLogin from './queries/siteadmin/adminUserLogin';
import changeAdminUser from './mutations/SiteAdmin/changeAdminUser';

import userManagement from './queries/siteadmin/userManagement';
import editUser from './queries/siteadmin/editUser';
import updateUser from './queries/siteadmin/updateUser';
import siteSettings from './queries/siteadmin/siteSettings';
import updateSiteSettings from './queries/siteadmin/updateSiteSettings';
import getAdminListingSettings from './queries/siteadmin/getAdminListingSettings';

import addListSettings from './queries/siteadmin/addListSettings';
import updateListSettings from './queries/siteadmin/updateListSettings';
import deleteListSettings from './queries/siteadmin/deleteListSettings';

import getAllListings from './queries/siteadmin/getAllListings';

import getUserDashboard from './queries/siteadmin/getUserDashboard';
import getListingDashboard from './queries/siteadmin/getListingDashboard';
import getReservationDashboard from './queries/siteadmin/getReservationDashboard';
import reviewsManagement from './queries/siteadmin/reviewsManagement';

// Service Fees
import updateServiceFees from './mutations/ServiceFees/updateServiceFees';
import getServiceFees from './queries/ServiceFees/getServiceFees';

// Cancellation
import getAllCancellation from './queries/Cancellation/getAllCancellation';
import getSpecificCancellation from './queries/Cancellation/getSpecificCancellation';

// Reviews
import userReviews from './queries/Reviews/userReviews';
import pendingReviews from './queries/Reviews/pendingReviews';
import writeReview from './mutations/Reviews/writeReview';
import writeReviewData from './queries/Reviews/writeReviewData';
import moreListReviews from './queries/Reviews/moreListReviews';
import writeAdminReview from './mutations/SiteAdmin/AdminReview/writeAdminReview';
import getAdminReviews from './queries/siteadmin/getAdminReviews';
import deleteAdminReview from './mutations/SiteAdmin/AdminReview/deleteAdminReview';
import editAdminReview from './queries/siteadmin/editAdminReview';

// Wish List
import getAllWishListGroup from './queries/WishList/getAllWishListGroup';
import CreateWishListGroup from './mutations/WishList/CreateWishListGroup';
import getWishListGroup from './queries/WishList/getWishListGroup';
import UpdateWishListGroup from './mutations/WishList/UpdateWishListGroup';
import DeleteWishListGroup from './mutations/WishList/DeleteWishListGroup';
import CreateWishLists from './mutations/WishList/CreateWishLists';
import CreateWishList from './mutations/WishList/CreateWishList';

// SMS Verification
import getPhoneData from './queries/SmsVerification/getPhoneData';
import AddPhoneNumber from './mutations/SmsVerification/AddPhoneNumber';
import VerifyPhoneNumber from './mutations/SmsVerification/VerifyPhoneNumber';
import RemovePhoneNumber from './mutations/SmsVerification/RemovePhoneNumber';
import updateListStatus from './mutations/WishList/updateListStatus';
import getUserStatus from './queries/getUserStatus';

// Update user ban

import updateBanServiceHistoryStatus from './mutations/SiteAdmin/updateBanServiceHistoryStatus';

//View profile
import ManageListingsProfile from './queries/ViewProfile/ManageListingsProfile';

// Transaction
import ManageListingTransaction from './queries/ManageListing/ManageListingTransaction';

// Day Drag Calendar
import ListingDataUpdate from './mutations/Listing/ListingDataUpdate';
import UpdateBlockedDates from './mutations/Listing/UpdateBlockedDates';
import getListAvailableDates from './queries/Listing/getListAvailableDates';
import getSpecialPricing from './queries/Listing/getSpecialPricing';
import getUpcomingBookings from './queries/getUpcomingBookings';
import getCheckUserStatus from './queries/getCheckUserStatus';
import getStepTwo from './queries/Listing/getStepTwo';

import getEditStaticPage from './queries/siteadmin/getEditStaticPage';
import updateStaticPage from './mutations/SiteAdmin/updateStaticPage';

// SiteAdmin Reviews
import getReviewsDetails from './queries/siteadmin/Reviews/getReviewsDetails';
import editUserReviews from './queries/siteadmin/Reviews/editUserReviews';

import writeUserReview from './mutations/SiteAdmin/userReview/writeUserReview';
import updateReview from './mutations/SiteAdmin/userReview/updateReview';

// Home page logo
import getHomeLogo from './queries/siteadmin/getHomeLogo';
import uploadHomeLogo from './mutations/SiteAdmin/Logo/uploadHomeLogo';
import removeHomeLogo from './mutations/SiteAdmin/Logo/removeHomeLogo';
import getEmailLogo from './queries/siteadmin/getEmailLogo';
import uploadEmailLogo from './mutations/SiteAdmin/Logo/uploadEmailLogo';
import removeEmailLogo from './mutations/SiteAdmin/Logo/removeEmailLogo';

//remove special pricing or blocked dates
import RemoveBlockedDates from './mutations/Listing/RemoveBlockedDates';

// Admin Roles
import createAdminRole from './mutations/SiteAdmin/AdminRoles/createAdminRole';
import getAllAdminRoles from './queries/siteadmin/AdminRoles/getAllAdminRoles';
import deleteAdminRole from './mutations/SiteAdmin/AdminRoles/deleteAdminRole';

// Admin Users
import getAllAdminUsers from './queries/siteadmin/AdminUser/getAllAdminUsers';
import createAdminUser from './mutations/SiteAdmin/AdminUser/createAdminUser';
import deleteAdminUser from './mutations/SiteAdmin/AdminUser/deleteAdminUser';
import getAdminUser from './queries/siteadmin/AdminUser/getAdminUser';

import getActivityType from './queries/siteadmin/getActivityTypeData';
import getActivityByValue from './queries/getActivityByValue';

import updateIconUploadLoader from './mutations/SiteAdmin/IconUploadLoader/updateIconUploadLoader';

import getAvailableTimes from './queries/Listing/getAvailableTimes';
import getBlockedTimes from './queries/Listing/getBlockedTimes';

import updateCancellation from './mutations/SiteAdmin/updateCancellation';
import getReservationActivity from './queries/Reservation/getReservationActivity';

//Cards
import addCard from './mutations/Cards/addCard';
import setDefaultCard from './mutations/Cards/setDefaultCard';
import removeCard from './mutations/Cards/removeCard';
import getCardDetails from './queries/Cards/getCardDetails';
import getDefaultCardDetails from './queries/Cards/getDefaultCardDetails';

import removeReservationBlockedDates from './mutations/Listing/removeReservationBlockedDates';

//Invites
import createInvites from './mutations/Invites/CreateInvites';
import getAllInvites from './queries/getAllInvites';

// Filter count
import getFilterCount from './queries/GetFilterCount';

//Upate User Type
import updateUserType from './mutations/SiteAdmin/updateUserType';

// scanner - check for reservagtion
import checkForReservation from './queries/CheckForReservation';

// User register
import createUser from './mutations/UserRegister/CreateUser';
import userUpdate from './mutations/UserRegister/UserUpdate';

//Referral or Invitation from User
import cancelUserInvitation from './mutations/UserInvitation/cancelUserInvitation';
import createUserInvitation from './mutations/UserInvitation/createUserInvitation';
import getAllUserInvitation from './queries/UserInvitation/getAllUserInvitation';

// User invites settings
import updateUserInvitationSettings from './mutations/SiteAdmin/UserInviteSettings/updateUserInvitationSettings';
import getUserInvitationSettings from './queries/UserInvitationSettings/getUserInvitationSettings';

// Manage user
import updateUserMaxInvites from './mutations/SiteAdmin/updateUserMaxInvites';

// Validate invite
import checkInvite from './queries/checkInvite';

// Check user exist
import checkUserExist from './queries/siteadmin/checkUserExist';

import getAllFeatureFlag from './queries/getAllFeatureFlag';

// create beta members
import CreateBetaMembers from './mutations/CreateBetaMembers';
// create suggested workplace
import CreateSuggestedWorkplace from './mutations/CreateSuggestedWorkplace';

// Set Partner listing
import updatePartner from './mutations/SiteAdmin/updatePartner';

// create host user
import createHostUser from './mutations/UserManagement/createHostUser';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      news,
      intl,
      userLogin,
      userLogout,
      userAccount,
      userEditProfile,
      userManagement,
      editUser,
      updateUser,
      showUserProfile,
      adminUserLogin,
      siteSettings,
      updateSiteSettings,
      locationItem,
      createListing,
      showListing,
      updateListing,
      showListingSteps,
      addListSettings,
      updateListSettings,
      deleteListSettings,
      getListingSettings,
      UserListing,
      getProfile,
      getAdminListingSettings,
      updateListingStep2,
      updateListingStep3,
      updateListingStep4,
      ManageListingSteps,
      ShowListPhotos,
      DateAvailability,
      getListingSpecSettings,
      getCurrencies,
      Currency,
      ManageListings,
      getAllListings,
      SearchListing,
      getBaseCurrency,
      StoreCurrencyRates,
      GetAddressComponents,
      getLogo,
      getCountries,
      getUserDashboard,
      getListingDashboard,
      getUserVerifiedInfo,
      EmailVerification,
      ResendConfirmEmail,
      getItinerary,
      getListReservation,
      getAllReservation,
      getAllReservationAdmin,
      getServiceFees,
      getPaymentData,
      getAllCancellation,
      getSpecificCancellation,
      cancelReservationData,
      userReviews,
      pendingReviews,
      writeReviewData,
      moreListReviews,
      forgotPasswordVerification,
      getListingCalendars,
      getBlockedDates,
      getListMeta,
      getAdminReviews,
      editAdminReview,
      getAllWishListGroup,
      getWishListGroup,
      viewReservationAdmin,
      getReservationDashboard,
      getPhoneData,
      ManageListingsProfile,
      getUserBanStatus,
      ManageListingTransaction,
      getUserStatus,
      checkReservation,
      getListAvailableDates,
      getSpecialPricing,
      getUpcomingBookings,
      getCheckUserStatus,
      reviewsManagement,
      getEditStaticPage,
      getReviewsDetails,
      editUserReviews,
      getStepTwo,
      getHomeLogo,
      getEmailLogo,
      getAllAdminRoles,
      getAllAdminUsers,
      getAdminUser,
      getActivityType,
      getAvailableTimes,
      getBlockedTimes,
      getActivityByValue,
      getReservationActivity,
      getCardDetails,
      getDefaultCardDetails,
      getAllInvites,
      getFilterCount,
      checkForReservation,
      getAllUserInvitation,
      getUserInvitationSettings,
      checkInvite,
      checkUserExist,
      getAllFeatureFlag
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      ChangePassword,
      updateUserVerifiedInfo,
      UploadProfilePicture,
      RemoveProfilePicture,
      createReservation,
      updateServiceFees,
      updateReservation,
      managePaymentCurrency,
      RemoveListing,
      deleteUser,
      adminRemoveListing,
      currencyManagement,
      baseCurrency,
      uploadLogo,
      removeLogo,
      CreateListPhotos,
      RemoveListPhotos,
      cancelReservation,
      writeReview,
      sendForgotPassword,
      changeForgotPassword,
      managePublish,
      changeAdminUser,
      deleteCalendar,
      blockImportedDates,
      writeAdminReview,
      deleteAdminReview,
      CreateWishListGroup,
      UpdateWishListGroup,
      DeleteWishListGroup,
      CreateWishLists,
      CreateWishList,
      AddPhoneNumber,
      VerifyPhoneNumber,
      RemovePhoneNumber,
      updateBanServiceHistoryStatus,
      updateListStatus,
      ListingDataUpdate,
      UpdateBlockedDates,
      updateStaticPage,
      writeUserReview,
      updateReview,
      uploadHomeLogo,
      removeHomeLogo,
      uploadEmailLogo,
      removeEmailLogo,
      RemoveBlockedDates,
      createAdminRole,
      deleteAdminRole,
      createAdminUser,
      deleteAdminUser,
      updateIconUploadLoader,
      updateCancellation,
      addCard,
      setDefaultCard,
      removeCard,
      removeReservationBlockedDates,
      createInvites,
      updateUserType,
      createUser,
      userUpdate,
      createUserInvitation,
      cancelUserInvitation,
      updateUserInvitationSettings,
      updateUserMaxInvites,
      CreateBetaMembers,
      CreateSuggestedWorkplace,
      updatePartner,
      createHostUser
    },
  }),
});

export default schema;