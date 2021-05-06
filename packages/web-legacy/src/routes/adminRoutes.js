export const adminRoutes = [
    require('./siteadmin/adminLogin').default,
    require('./siteadmin/adminDashboard').default,
    require('./siteadmin/changeAdmin').default,
    require('./siteadmin/users').default,
    require('./siteadmin/listSettings').default,
    require('./siteadmin/listings').default,
    require('./siteadmin/reservations').default,
    require('./siteadmin/viewreservation').default,
    require('./siteadmin/staticPage').default,
    require('./siteadmin/editStaticPage').default,
    require('./siteadmin/invites').default,
    require('./siteadmin/userInvitationSettings').default,
    // require('./siteadmin/userInvitation').default,
    //Profile View
    require('./siteadmin/profileView').default,

    //Admin users and roles
    require('./siteadmin/adminRoles').default,
    require('./siteadmin/adminUser').default,


    require('./siteadmin/edituser').default,
    require('./siteadmin/siteSettings').default,
    require('./siteadmin/currencies').default,
    require('./siteadmin/viewReceipt').default,
    require('./siteadmin/serviceFeesSettings').default,
    require('./siteadmin/adminReviews').default,
    require('./siteadmin/writeReview').default,
    require('./siteadmin/editReview').default,
    require('./siteadmin/cancellation').default,
    require('./siteadmin/editCancellation').default,

    require('./siteadmin/userReviews').default,
    require('./siteadmin/userEditReviews').default
];