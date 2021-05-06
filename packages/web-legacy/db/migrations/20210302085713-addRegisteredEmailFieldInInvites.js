'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Invites', 'registeredEmail', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('DeletedInvite', 'registeredEmail', {
        type: Sequelize.STRING
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Invites', 'registeredEmail'),
      queryInterface.removeColumn('DeletedInvite', 'registeredEmail')
    ])
  }
};