'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE Cancellation SET policyName = "Very Flexible" WHERE id = 1'),
      queryInterface.sequelize.query('UPDATE Cancellation SET policyName = "Flexible" WHERE id = 2'),
      queryInterface.sequelize.query('UPDATE Cancellation SET policyName = "Standard 30 day" WHERE id = 3'),
      queryInterface.bulkInsert('Cancellation', [{
        policyName: 'Standard 90 day',
        policyContent: 'Cancel up to until 90 days before your book and get a 100% refund plus service fees back.',
        priorDays: 90,
        accommodationPriorCheckIn: 100,
        accommodationBeforeCheckIn: 100,
        accommodationDuringCheckIn: 0,
        guestFeePriorCheckIn: 100,
        guestFeeBeforeCheckIn: 100,
        guestFeeDuringCheckIn: 0,
        hostFeePriorCheckIn: 100,
        hostFeeBeforeCheckIn: 100,
        hostFeeDuringCheckIn: 0,
        isEnable: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }])

    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
