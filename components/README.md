# Noom tools components

Use:

```
import { View } from '@noomtools/ui'
import '@noomtools/ui/dist/index.css'
```

## Development

#### Global packages

-   Node v12.18.0
-   NPM v6.14.4

Make sure you have the required global packages installed. In the root of this project run the following command to install all required dependencies.

```
npm install
```

### Scripts

```
npm publish - publish to NPM
npm run storybook - launches the Storybook applet in a new browser tab
npm run build:prod - builds the library, ready to publish
```

### Building components

Components are created within their own folder in the `src` folder. Naming conventions follow the capital case convention: all component files start with a capital letter. Including `sass` files & `stories`.

#### Stories

Stories need to be created within the component folder & need to be named in the following way: `[COMPONENT].stories.tsx`.

#### Styles

Styles are created using Sass & need to follow the same convention as stories: `[COMPONENT].sass`.

##### Module class / function names

Each module needs to have a _named_ export (not _default_). The name needs to be based on the filename.

##### Root level exports for components & styles

After creating a component, the module must also be exported from the _index.ts_ file. The Sass file must be imported to the _index.sass_ file.

#### Coding standards

Linting as well as code formatting is enforced by using TSLint & [Prettier](https://prettier.io/). There is a pre-commit hook to format code before committing by using [Husky](https://github.com/typicode/husky). For more information on the specific rules, view the `.prettierrc` file.

Note: it is advisable to adopt this standard when coding, but not mandatory as code will be properly formatted before each commit.

#### CSS rule conventions

A modified version of the [BEM](http://getbem.com/) pattern is used for writing selectors. Whilst not strictly enforced, always use the most obvious/simplest naming of the element where possible (keep it to 1 word). Hyphenate element names to be more descriptive or to avoid conflicts.

###### Examples:

```
<div className="form">
    <div className="form__field" />
</div>
```

```
<div className="formt">
    <div className="form__field-padding" />
    <div className="form__label-padding" />
</div>
```
