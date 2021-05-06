'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(`Reservation`, `paymentState`, {
      type: Sequelize.ENUM('pending', 'requires_capture', 'completed'),
      defaultValue: 'pending',
    });
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
