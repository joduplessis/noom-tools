# Noom Tools v0.0.1

Noom Tools is an opinionated boilerplate for creating realtime & component driven JAMStack apps. 

## What does this solve?

There are usually things that every product/project needs to do - Noom Tools aims to be a starter kit for building quickly without a lot of reliance on 3rd party libs & frameworks. 

- Typescript & linting everywhere
- An API built with Fastify
- A component library & frontend built with React (already ingrated with the API)
- Realtime communication using websockets, Socket.io & Redis (for scaling the service)
- Custom JWT based authentication & claims 
- Tenant security at API level & also websocket subscription level
- Mail service for integrating Postmark (easily replacable by any other service)
- Secure S3 file uploads & downloads (Digital Ocean Spaces is supported too)
- TypeOrm integration
- A publishable UI library powered by Storybook
- Prettier integration for a post-commit hook
- PubSub service for the frontend
- Storage for the frontend using LocalStorage (not cookies)
- Sass everywhere for styles using [BEM](http://getbem.com/)
- A modular pattern for building a frontend application in a scalable way
- Sentry integration for catching errors
- A customizable webpack config geared for multi stage deployments
- A set of easy to use React Hooks that makes integrating difficult tasks easy, listening for websocket events is as simple as:
```
const { messageListener } = useSubscription()

messageListener('user-007', (message) => {
    // Do something here with the message
})
```  

## What this isn't (or doesn't have)

- GraphQL
- Styled Components or Emotion
- A finished & complete product
- An unopinionated approach (sorry!)

## Roadmap

- Documentation - please see each folder for a README with more details
- Better & more complete frontend app
- Testing & code coverage
- Better type usages
- Terraform deployment guide

Any feedback is of course welcome!