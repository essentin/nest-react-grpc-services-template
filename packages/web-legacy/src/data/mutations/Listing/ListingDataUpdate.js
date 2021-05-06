// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType
} from 'graphql';

// GraphQL Type
import EditListingType from '../../types/EditListingType';

// Sequelize models
import {
    Listing,
    ListingData,
    SpaceAvailability,
    SpaceAvailabilitySession
} from '../../../data/models';

const ListingDataUpdate = {

    type: EditListingType,

    args: {
        id: { type: IntType },
        cancellationPolicy: { type: IntType },
        maxDaysNotice: { type: StringType },
        bookingNoticeTime: { type: StringType },
        currency: { type: StringType },
        spaceAvailability: { type: StringType },

    },

    async resolve({ request, response }, {
        id,
        cancellationPolicy,
        maxDaysNotice,
        bookingNoticeTime,
        currency,
        spaceAvailability
    }) {

        let isListUpdated = false;
        const spaceAvailabilityData = JSON.parse(spaceAvailability);

        // Check whether user is logged in
        if (request.user || request.user.admin) {
            let where = { id };
            if (!request.user.admin) {
                where = {
                    id,
                    userId: request.user.id
                }
            };

            // Confirm whether the Listing Id is available
            const isListingAvailable = await Listing.findById(id);

            if (isListingAvailable != null) {

                // Check if record already available for this listing
                const isListingIdAvailable = await ListingData.findOne({ where: { listId: id } });
                if (isListingIdAvailable != null) {
                    // Update Record
                    const updateData = ListingData.update({
                        cancellationPolicy: cancellationPolicy,
                        maxDaysNotice: maxDaysNotice,
                        bookingNoticeTime: bookingNoticeTime,
                        currency: currency
                    },
                        {
                            where: {
                                listId: id
                            }
                        });
                    isListUpdated = true;

                } else {
                    // Create New Record
                    const createData = ListingData.create({
                        listId: id,
                        cancellationPolicy: cancellationPolicy,
                        maxDaysNotice: maxDaysNotice,
                        bookingNoticeTime: bookingNoticeTime,
                        currency: currency
                    });

                    if (createData) {
                        isListUpdated = true;
                    }
                }

                if (spaceAvailabilityData) {
                    const removeSpaceAvailability = await SpaceAvailability.destroy({
                        where: {
                            listId: id,
                        }
                    });

                    const removeSpaceSession = await SpaceAvailabilitySession.destroy({
                        where: {
                            listId: id,
                        }
                    });

                    if (spaceAvailabilityData.length > 0) {
                        spaceAvailabilityData.map(async (item, key) => {

                            let updateSpaceAvailability = await SpaceAvailability.create({
                                listId: id,
                                day: item.day,
                                isOpen: item.isOpen,
                                isWholeDay: item.isWholeDay,
                            })

                            if (item.isWholeDay == 'false' && item.isOpen) {
                                item.timeSlot && item.timeSlot.length > 0 && item.timeSlot.map(async (value, key) => {

                                    let updateSpaceSession = await SpaceAvailabilitySession.create({
                                        listId: id,
                                        spaceAvailabilityId: updateSpaceAvailability.id,
                                        day: item.day,
                                        startTime: value.startTime.value,
                                        endTime: value.endTime.value,
                                        isNextDay: value.endTime.isNextDay
                                    })

                                })
                            }
                        });
                    }
                }


                if (isListUpdated) {
                    return {
                        status: 'success'
                    }
                } else {
                    return {
                        status: 'failed'
                    }
                }

            } else {
                return {
                    status: 'notAvailable'
                }
            }

        } else {
            return {
                status: "notLoggedIn",
            };
        }

    },
};

export default ListingDataUpdate;