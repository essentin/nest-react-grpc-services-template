export const commonRoutes = [
    require('./receipt').default,
    require('./viewListing').default,    
    require('./passwordVerification').default,
    require('./contact').default,
    require('./profile').default,
    require('./reviews').default,
    require('./writeReview').default,

    // Static Pages
    require('./static/privacy').default,
    require('./static/help').default,
    require('./static/trustAndSafety').default,
    require('./moreAboutFlowpass').default,

    require('./userbanned').default,
    require('./notFound').default
]