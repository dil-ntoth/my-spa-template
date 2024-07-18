# react-spa-template

This is a template for building a Single Page Application (SPA) using React for the HighBond platform. In this documentation, we will describe what is included in this template and what setups are optional. We'll also explain the rationale behind the technology choices we made and how you can switch to different tools if desired.

## Setups included in this template

- Basic React app setup with Typescript and CSS
- _[optional]_ Using `pnpm` as the package manager
- _[optional]_ Using `Vite` as the build tool
- Atlas theme setup
- Localization setup
- Router setup
- HighBond dependencies
  - monitor script (including pendo script)
  - global nav web component
  - JwtHighbondClient
- _[optional]_ Unit tests examples running with `vitest`
- _[optional]_ End to end tests examples running with `playwright`

## How to use

To use this template, once cloned, run:

```bash
# use the correct node version
nvm use

# install pnpm globally
npm install -g pnpm

# install dependencies
pnpm i

# install browsers for playwright
npx playwright install

# start the local app
pnpm dev
```

Then you can start modifying the SPA from `src/main.tsx`.

### Scripts

- `pnpm dev`: Starts the local development app.
- `pnpm build`: Builds the SPA.
- `pnpm lint`: Runs ESLint for code linting.
- `pnpm preview`: Previews the production build. Note that `msw`` won't work in this environment as it's a production build.
- `pnpm test`: Runs unit tests in either `watch` or `ci` mode depending on the environment.
- `pnpm test:coverage`: Generates a test coverage report for unit tests.
- `pnpm test:e2e`: Runs end-to-end tests.
- `pnpm test:e2e:dev`: Runs end-to-end tests with a user interface.

## Decision making

### Build tool - why Vite?

We chose Vite as the build tool for our SPA template due to its speed and developer experience. Vite is a build tool that leverages native ES modules to enable fast development and building processes. It provides a fast development server with hot module replacement, making the development workflow smooth and efficient.

#### How to switch to ESBuild?

We understand sometimes `esbuild` might be a better choice in terms of the flexibility it can provide. If you prefer using `esbuild` over Vite, you can follow these steps to switch:

1. Install `esbuild` and the required development dependencies:

```bash
pnpm i -D esbuild
```

2. Update your `package.json` scripts to use `esbuild` for building and serving your project, also removing `vite`.

3. Replace the Vite-specific configuration files `vite.config.ts` and settings with their `esbuild` equivalents. You may need to tweak your configuration according to your specific project requirements. Here's an example esbuild script might be good to start with:

<details>
<summary><b>example build.js for esbuild</b></summary>

```js
import fs from 'fs';
import { exec } from 'child_process';
import esbuild from 'esbuild';
import dotenv from 'dotenv';
dotenv.config();

const envValue = (paramName, defaultValue) => {
  return JSON.stringify(process.env[paramName] || defaultValue);
};

const buildOptions = {
  entryPoints: ['./src/main.tsx'],
  outdir: './build/static/',
  publicPath: '/static/',
  platform: 'browser',
  minify: true,
  bundle: true,
  splitting: true,
  format: 'esm',
  loader: {
    '.js': 'jsx',
    '.woff': 'copy',
    '.woff2': 'copy',
    '.svg': 'text',
  },
  define: {
    global: 'window',
    'process.env.NODE_ENV': envValue('NODE_ENV', 'production'),
  },
};

esbuild
  .build(buildOptions)
  .then((result) => {
    const promise = new Promise((resolve, reject) => {
      if (process.env.GIT_REVISION) {
        resolve(process.env.GIT_REVISION);
        return;
      }
      exec('git rev-parse --short=8 HEAD', function (err, stdout, stderr) {
        if (err) {
          reject(err);
        }
        resolve(stdout.trim());
      });
    });
    return promise;
  })
  .then((commit) => {
    if (process.env.NODE_ENV !== 'production') {
      return commit;
    }
    let renameCounter = 2;
    const promise = new Promise((resolve, reject) => {
      const handleError = (err) => {
        if (err === null) {
          renameCounter -= 1;
          if (renameCounter === 0) {
            resolve(commit);
          }
        } else {
          reject(err);
        }
      };

      fs.rename('build/static/index.js', `build/static/main.${commit}.js`, handleError);
      fs.rename('build/static/index.css', `build/static/main.${commit}.css`, handleError);
    });
    return promise;
  })
  .then((commit) => {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    let filename = 'main';
    if (process.env.NODE_ENV === 'production') {
      filename = `main.${commit}`;
    }
    indexHtml = indexHtml.replace(
      '</head>',
      `<script defer="defer" type="module" src="/static/${filename}.js"></script><link href="/static/${filename}.css" rel="stylesheet"></head>`,
    );
    fs.writeFileSync('build/index.html', indexHtml);
    return;
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
```

</details>

### Unit/Component testing - why Vitest?

We chose `vitest` as the testing framework for our SPA template due to its simplicity and compatibility with Vite. `vitest` is a lightweight testing solution specifically designed for Vite projects. It offers a minimal setup while supporting essential testing features.

Advantages of using `vitest` over native Jest:

- **Vite Integration:** `vitest` is built to work seamlessly with Vite, making it easier to set up and run tests for your Vite-based applications.

- **Faster Tests:** As `vitest` leverages native ES modules, it tends to have faster test execution times, especially for large projects.

- **Simplified Configuration:** `vitest` requires minimal configuration and follows Vite's conventions, reducing the overhead of setting up and maintaining testing environments.

#### How to switch back to Jest only?

If you prefer using `Jest` for testing over `vitest`, you can switch by following these steps:

1. Install `Jest` and required testing libraries, e.g. `testing-library`

2. Configure `Jest` in your project by following [their documentation](https://jestjs.io/docs/configuration).

3. Replace test files using `vitest` with their equivalents for `Jest`. You may need to rewrite some tests and adapt the testing environment to work with `Jest`.

### End to end testing - why Playwright?

We chose `Playwright` as the end-to-end testing tool for our SPA template due to its cross-browser support and robust automation capabilities. `Playwright` allows you to run tests on Chromium, Firefox, and WebKit, plus it is fast, requires very minial setup, and supports lots of features as cypress or cypress plugin does. For example, accessibility testing, screenshot difference testing.

#### How to Switch to Cypress?

If you prefer using `Cypress` for end-to-end testing over `Playwright`, you can switch by following these steps:

1. Install `Cypress` and its required dependencies, e.g. `testing-library`

2. Configure `Cypress` in your project by following [their documentation](https://docs.cypress.io/guides/getting-started/installing-cypress).

3. Replace the `Playwright` specific test files with their equivalents for `Cypress`. You may need to rewrite some test scenarios to work with the `Cypress` testing environment.
