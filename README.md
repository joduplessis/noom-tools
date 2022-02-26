# Noom Tools v 0.0.1

Noom Tools is an opinionated boilerplate for creating realtime & component driven JAMStack apps. 

## API

The API is built with Fastify & support multiple hooks for integrating with Postmark, JWT authnetication, TypeOrm & claims based token validation to keep database requests secure for each tenant. 

## Frontend

The frontend is built with React, a custom Webpack config & an opinionated way of creating & organizing code. There are also specific hooks that make difficult tasks very easy. Some of them are:
- S3 file uploads
- Realtime communication in a friendly manner
- Custom authentication (integrated with the Fastify API)

## Storybook

The component libary is built using Storybook & exportable as a standlone UI library via the NPM registry.

## Roadmap

- Documentation, sorry about that. Please see each folder for a README with more details.
- Sample app integrating the 3 aspects
- Testing & code coverage
- Better type usages

Any feedback is of course welcome