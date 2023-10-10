const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

const {
  initPlugin,
} = require("@frsource/cypress-plugin-visual-regression-diff/plugins");

//If using this approach, just call the key "setupNodeEvents" in the E2E configurations
// async function setupNodeEvents(on, config) {
//   await addCucumberPreprocessorPlugin(on, config);
//   on(
//     "file:preprocessor",
//     createBundler({
//       plugins: [createEsbuildPlugin(config)],
//     })
//   );
//   return config;
// }

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      initPlugin(on, config);
      on("file:preprocessor", bundler);
      await addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      allure: true,
      // allureResultsPath: "report/allure-report",
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.axa.com.br/",
    chromeWebSecurity: false,
  },
});
