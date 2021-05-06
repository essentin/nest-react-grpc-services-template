'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('UserProfile', 'isPhotoSkipped', {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('UserProfile', 'isPhotoSkipped')
    ])
  }
};
