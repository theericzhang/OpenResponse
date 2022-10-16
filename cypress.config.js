const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "b81wjq",
    e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000/",
    experimentalStudio: true,
  },
});
