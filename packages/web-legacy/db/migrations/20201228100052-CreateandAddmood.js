'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('UserMood', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        listId: {
          type: Sequelize.INTEGER,
        },
        moodsId: {
          type: Sequelize.INTEGER,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),

      queryInterface.sequelize.query("INSERT INTO ListSettingsTypes (typeName, fieldType, step, isEnable, typeLabel, isMultiValue, createdAt, updatedAt) VALUES  ('mood', 'stringType', 1, '1', 'Moods', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())"),
    ])

  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('UserMood')
    ])
  }
};
