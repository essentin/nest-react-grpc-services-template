'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Cancellation` SET  `priorDays`='24', `maxDay`= 0 ,`accommodationPriorCheckIn` = 100, `accommodationBeforeCheckIn` = 50 , `accommodationDuringCheckIn` = 0 , `policyContent`='Guests may cancel their Booking until 24 hours before the event start time and will receive a full refund (including all Fees) of their Booking Price. Bookings cancellations submitted less than 24 hours before the Event start time are not refundable.'  WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET  `priorDays`='168',`maxDay`= 24 , `accommodationPriorCheckIn` = 100, `accommodationBeforeCheckIn` = 50 , `accommodationDuringCheckIn` = 0 , `policyContent`='Guests may cancel their Booking until 7 days before the event start time and will receive a full refund (including all Fees) of their Booking Price. Guests may cancel their Booking between 7 days and 24 hours before the event start time and receive a 50% refund (excluding Fees) of their Booking Price. Booking cancellations submitted less than 24 hours before the Event start time are not refundable.'  WHERE `id`='2';"),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET  `priorDays`='720',`maxDay`= 168 , `accommodationPriorCheckIn` = 100, `accommodationBeforeCheckIn` = 50 , `accommodationDuringCheckIn` = 0 ,`policyContent`='Guests may cancel their Booking until 30 days before the event start time and will receive a full refund (including all Fees) of their Booking Price. Guests may cancel their Booking between 30 days and 7 days before the event start time and receive a 50% refund (excluding Fees) of their Booking Price. Cancellations submitted less than 7 days before the Event start time are not refundable.' WHERE `id`='3';"),
      queryInterface.sequelize.query("UPDATE `Cancellation` SET  `priorDays`='2160',`maxDay`= 336 , `accommodationPriorCheckIn` = 100, `accommodationBeforeCheckIn` = 50 , `accommodationDuringCheckIn` = 0 , `policyContent`='Guests may cancel their Booking until 90 days before the event start time and will receive a full refund (including all Fees) of their Booking Price. Guests may cancel their Booking between 90 days and 14 days before the event start time and receive a 50% refund (excluding Fees) of their Booking Price. Cancellations submitted less than 14 days before the Event start time are not refundable.'  WHERE `id`='4';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.dropTable('users');
  */
  }
};