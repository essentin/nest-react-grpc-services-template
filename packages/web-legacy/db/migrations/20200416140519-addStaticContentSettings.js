'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticContents',[
        {
          name: 'whyChooseTitle',
          content: 'Why Choose Rentall Space?',
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block1Title',
          content: 'Lorem Ipsum Doller',
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block1Content',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block2Title',
          content: 'Lorem Ipsum Doller',
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block2Content',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block3Title',
          content: 'Lorem Ipsum Doller',
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'block3Content',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'whyChooseBanner',
          contentType: 'whyChoose',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'mobileAppsTitle',
          content: 'Lorem Ipsum',
          contentType: 'mobileApps',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'mobileAppsContent1',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          contentType: 'mobileApps',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StaticContents', {
      contentType: {
        $in: ['whyChoose', 'mobileApps']
      }
    })
  }
};
