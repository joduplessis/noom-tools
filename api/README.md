# API

## Installation

### Global packages

-   Node v12.18.0
-   NPM v6.14.4

Make sure you have the required global packages installed. In the root of this project run the following command to install all required dependencies.

#### Installing dependencies

```
npm install
npm run start:dev
```

Make sure you have the Redis & Postgres Docker images running. Add the following user email & password hash. This is not necessary for the API to work, but the tests look for this user. You are able to easily change this by referencing the `users.service` to generate a password.

```
jo@joduplessis.com
$2a$10$epExn2qaxMGottmLxzpiM.LH/Ti9y4H1ygX//1ukUZHEiP7Ea8b.y
```

Rename `env.local` to `.env` & update the variables with the correct values.

## Conventions & best practices

### Prettier & coding standards

Linting is enforced at build-time with `ts-lint`. Code formatting is automated with [Prettier](https://prettier.io/). There is a pre-commit hook to format code before committing by using [Husky](https://github.com/typicode/husky). For more information on the specific rules, view the `.prettierrc` file.

### Swagger

Swagger documentation is available at the `/documentation` route.

---

More coming soon!