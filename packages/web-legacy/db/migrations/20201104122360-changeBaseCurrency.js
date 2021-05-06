'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `Currencies` SET `isBaseCurrency`=0;"),
      queryInterface.sequelize.query("UPDATE `Currencies` SET `isBaseCurrency`=1 WHERE `symbol`='SEK';"),
      queryInterface.sequelize.query("UPDATE `PaymentMethods` SET `currency`='SEK';")
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
