'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticPage', {
      id: {
        $in: [1, 3]
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StaticPage', [{
      pageName: 'About Us',
      content: `<p><strong>It all started with Covid-19 and the pain of finding somewhere to work when offices where shutting down. It was hard to find good workspaces near our homes or on the way to the office. And to work at home was not an optimal solution. </strong></p><p><br></p><p><strong>So we decided to build a platform where you can find great workspaces but also to enable companies and individuals to book and check-in to workspaces through one membership and one app.</strong></p><p><br></p><p><strong>We have just started this journey. If you are interested in joining us, please send us an email at hello@flowpass.co or follow a link that suits you below:</strong></p><p><br></p><p><strong>&gt; I got workspace that I want to make additional revenue on, click here.</strong></p><p><br></p><p><strong>&gt; My company is looking for a distributed workspace solution for our employees, click here</strong></p><p><br></p><p><strong>&gt; I would like to join as a beta tester and try different workspaces, click here</strong></p>`,
      metaTitle: 'About Us',
      metaDescription: 'About Us',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      pageName: 'Travel Credit',
      content: '',
      metaTitle: 'Travel Credit',
      metaDescription: 'Travel Credit',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  }
};