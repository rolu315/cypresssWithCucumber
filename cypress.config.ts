import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  return config;
}

export default defineConfig({
  retries: {
    openMode: 0,
  },
  video: false,
  env: {
    host: 'https://api.thedogapi.com',
  },
  e2e: {
    specPattern: '**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    setupNodeEvents,
  },
});
