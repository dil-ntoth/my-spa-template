import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';
import { server } from './mocks/server';
import setupI18next from './helpers/setupI18next';

// Establish API mocking before all tests.

beforeAll(() => {
  server.listen();
  setupI18next();
});

// Reset any request handlers and mock data that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

configure({
  testIdAttribute: 'data-qa-anchor',
});
