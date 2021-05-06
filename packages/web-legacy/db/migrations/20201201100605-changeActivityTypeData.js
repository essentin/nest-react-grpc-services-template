'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {   
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Desk' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Lounge' WHERE `id`='2';"),
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Meeting' WHERE `id`='3';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Meeting' WHERE `id`='1';"),
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Events' WHERE `id`='2';"),
      queryInterface.sequelize.query("UPDATE `ActivityType` SET `name`='Media Productions' WHERE `id`='3';"),
    ])
  }
};
