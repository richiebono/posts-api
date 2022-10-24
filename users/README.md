# NestJSApiUsers

An API to Provide users and authentication:

## Installation

```bash
   $ npm install
```

## Set Enviroment for secret key JWT and other configurations

```bash
   $ cp .env.example .env
```

To set up on multiple environments, such as dev, stage or prod, we do as follows:

```bash
   $ cp .env.example .env.dev # or .env.stage, etc
```

For more info access:
https://docs.docker.com/get-started/

## Install TypeScript Node

```bash
   $ npm install -g ts-node
```

## Running the app

```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
```

## Url Swagger for Api Documentation

```
http://localhost:3000/api/swagger
```

Configure `SWAGGER_USER` and `SWAGGER_PASSWORD` in the .env file and set `NODE_ENV` to `local` or `dev`or `staging` to access the SWAGGER(Open Api) documentation with basic authentication.

```
NODE_ENV=[:enviroments]
SWAGGER_USER=[:user]
SWAGGER_PASSWORD=[:password]
```

If you want to add more environments, include them in the `SWAGGER_ENVS` array in `main.ts`, see the following:

```typescript 
const SWAGGER_ENVS = ['local', 'dev', 'staging'];
```

## Configuring the NODE_API_PORT environment variable as the default port if you don't want to use the default

```
   NODE_API_PORT=3000 
```

## Running tests using jest

`$ npm test --  --detectOpenHandles`

Check code coverage using:

`$ npm run test:cov -- --detectOpenHandles`