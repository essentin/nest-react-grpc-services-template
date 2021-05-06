'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('HomeBanner'),
      queryInterface.dropTable('FooterBlock'),
      queryInterface.dropTable('WhyHostInfoBlock'),
      queryInterface.dropTable('StaticContents'),
      queryInterface.dropTable('StaticInfoBlock')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('HomeBanner', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        enable: {
          type: Sequelize.INTEGER,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
      queryInterface.createTable('FooterBlock', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title1: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content1: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        title2: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content2: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        title3: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content3: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        isEnable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
      queryInterface.createTable('WhyHostInfoBlock', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
        value: {
          type: Sequelize.STRING
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable('StaticContents', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        contentType: {
          type: Sequelize.ENUM('whyChoose', 'mobileApps'),
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }),
      queryInterface.createTable('StaticInfoBlock', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        image: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
        isEnable: {
          type: Sequelize.BOOLEAN,
          defaultValue: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      })
    ]);
  },
};
