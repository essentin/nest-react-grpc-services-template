'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE ListSettingsTypes SET typeName = "parkingOptions", typeLabel = "Parking Options" WHERE id = 12'),
      queryInterface.sequelize.query('UPDATE ListSettingsTypes SET typeName = "spaceType", typeLabel = "Space Type" WHERE id = 1'),
      queryInterface.sequelize.query('UPDATE ListSettingsTypes SET typeName = "activities", typeLabel = "Activities" WHERE id = 3')

    ])
  },

  down: (queryInterface, Sequelize) => {
  }
};
