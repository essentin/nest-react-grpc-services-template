'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('ActivityType', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING
        },
        isEnable: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0
        },
        image: {
          type: Sequelize.STRING,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      })
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
