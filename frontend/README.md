# Frontend web application template

## Installation

### Global packages

-   Node v12.18.0
-   NPM v6.14.4

Make sure you have the required global packages installed. In the root of this project run the following command to install all required dependencies.

#### Installing dependencies

```
npm install
npm run start
```

### Other important NPM scripts

```
npm run start - starts up a local development server on port 3000
npm run build - uses a Webpack config to bundle the app locally
npm run build:prod - uses a Webpack config to bundle the app for production
npm run build:dev - uses a Webpack config to bundle the app for development
```

## Conventions & best practices

### Compilation

All compilation is done using Webpack. Relevant `webpack.config` files reside in the root directory of the frontend application (this folder). Config files are suffixed to indicate which environments they build for. By example; the following configuration is for production: `webpack.config.prod.js`.

Output bundles are outputted to the `/public` folder.

### Typescript

TypeScript is used & compiled with `webpack` & `ts-loader`.

### Prettier & coding standards

Linting is enforced at build-time with `ts-lint`. Code formatting is automated with [Prettier](https://prettier.io/). There is a pre-commit hook to format code before committing by using [Husky](https://github.com/typicode/husky). For more information on the specific rules, view the `.prettierrc` file.

### Styles

SASS is used together with a modified version of the [BEM](http://getbem.com/) pattern as a symantic guide. Whilst not strictly enforced, always use the most obvious/simplest naming of the element where possible. Hyphenate element names to be more descriptive or to avoid conflicts.

#### Examples:

```
<div className="form-component">
    <div className="form-component__field" />
</div>
```

```
<div className="form-component">
    <div className="form-component__field-padding" />
    <div className="form-component__label-padding" />
</div>
```

Global styles should be add to `src/styles.sass`

### Images & static assets

Static assets (images, PDF's, etc.) can be added to `src/assets` which will output directly to the `/public` folder for each build. No need to import them directly.

### Exports & function names

Exports needs to have a _named_ export module (_not default_). The name needs to be based on the filename, but converted to camel-casing. By example; the `about.page.tsx` should export a named class or function, called `AboutPage`.

### Authentication

Authentication is handled by **auth0**. `withAuthenticationRequired` is used to wrap pages to ensure athentication is enforced.

### Modules

Modules form top level encapsulated components & represent top level URL paths (where possible). Any subsequent routing within this URL path should be accomplished within the module (class or function) themselves. Modules must be added to the `src/modules` directory. By example; `src/modules/[MODULE_NAME]/[MODULE_NAME].module.tsx`.

### Routes

Routes for each module must be added as `src/modules/[MODULE_NAME]/[MODULE_NAME].routes.ts`.

### Components

Shared components must be added to the `src/components` directory. Module specific components should be at the root of the respective module directory. By example; `src/modules/[MODULE_NAME]/components/[COMPONENT_NAME]/[COMPONENT_NAME].component.tsx`. This folder & file naming convention should be followed for shared components.

### Services

Shared API (and other) services must be added to `src/services`. Module specific services should be at the root of the respective module directory. By example; `src/modules/[MODULE_NAME]/services/[SERVICE_NAME].service.ts`. This folder & file naming convention should be followed for shared services.

### Portals

React Portals must be added to `src/portals`.

### Contexts

React Contexts must be added to `src/contexts`.

### SASS

Sass includes & partials must be added to `src/sass`.

### Helpers

Helper functions & utility libraries must be added to `src/helpers`.
