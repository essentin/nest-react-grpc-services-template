'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'Flowpass' WHERE id=1"),
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'https://www.facebook.com/Flowpass-103178001464778' WHERE id=10"),   
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'https://www.instagram.com/flowpass.co/' WHERE id=12"), 
      queryInterface.sequelize.query("INSERT INTO SiteSettings (title, name, value, type, createdAt, updatedAt) VALUES ('LinkedIn Link', 'linkedinLink', 'https://www.linkedin.com/company/54350502/admin/', 'site_settings', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())"),
      queryInterface.sequelize.query("INSERT INTO SiteSettings (title, name, value, type, createdAt, updatedAt) VALUES ('Pinterest Link', 'pinterestLink', 'https://www.pinterest.se/pingman/flowpass/', 'site_settings', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())"),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'RentALL Space' WHERE id=1"),
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'https://www.facebook.com/radicalstartnow/' WHERE id=10"),
      await queryInterface.sequelize.query("UPDATE SiteSettings SET value = 'https://www.instagram.com/?hl=en' WHERE id=12"),
      queryInterface.sequelize.query("DELETE FROM SiteSettings WHERE name='linkedinLink';"),
      queryInterface.sequelize.query("DELETE FROM SiteSettings WHERE name='pinterestLink';"),   
    ])
  }
};


