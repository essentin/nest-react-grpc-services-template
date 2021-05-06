'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("ALTER TABLE WhyHostInfoBlock MODIFY value TEXT;"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
     
    ])
  }
};
