const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationpratice.com.br',
    video: false,
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      allureCypress(on);
      // implement node event listeners here
    },
  },
});
