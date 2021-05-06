'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('User', 'deletedBy', {
        type: Sequelize.STRING(10)
      }),
      queryInterface.addColumn('UserProfile', 'acceptTerms', {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('UserProfile', 'zipcode', {
        type: Sequelize.STRING(10)
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('User', 'deletedBy'),
      queryInterface.removeColumn('UserProfile', 'acceptTerms'),
      queryInterface.removeColumn('UserProfile', 'zipcode')
    ])
  }
};
