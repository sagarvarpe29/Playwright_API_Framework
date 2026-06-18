import dotenv from 'dotenv'; //imports the dotenv package
dotenv.config(); //reads .env file and loads into process.env

import { defineConfig } from '@playwright/test';

export default defineConfig({

  // Directory where Playwright will look for test files
  testDir: './tests',

  // Run all tests in parallel across files
  fullyParallel: true,

  // Fail the build on CI if test.only() is accidentally left in code
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, no retries locally
  retries: process.env.CI ? 1 : 0,

  // Number of parallel workers — uses 4 locally, 2 on CI
  workers: process.env.CI ? 2 : 4,

  // Maximum time one test can run (30 seconds)
  timeout: 30000,

  // Reporter: Allure for HTML reports + list in terminal for live output
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,               // include request/response details in report
      outputFolder: 'allure-results', // raw results go here
      suiteTitle: true            // group tests by suite name in report
    }]
  ],

  // Shared settings applied to all tests
  use: {
    // Base API URL — reads from .env file, falls back to default
    baseURL: process.env.BASE_URL || 'https://reqres.in',

    // How long to wait for an assertion to pass (5 seconds)
    actionTimeout: 5000,

    // Attach request and response details to Allure report
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-key': process.env.API_KEY || ''
    },

    // Ignore SSL certificate errors (useful for self-signed certs in dev/staging)
    ignoreHTTPSErrors: true,
  },

  // Projects allow running same tests against different environments
  projects: [
    {
      name: 'dev',
      use: {
        baseURL: process.env.DEV_URL || 'https://reqres.in',
      }
    },
    {
      name: 'staging',
      use: {
        baseURL: process.env.STAGING_URL || 'https://reqres.in',
      }
    },
    {
      name: 'prod',
      use: {
        baseURL: process.env.PROD_URL || 'https://reqres.in',
      }
    }
  ]

});
