# Simple CRUD application

Simple CRUD application is a nod.js application for practice in making CRUD applications.

## Installation
To use this tool you need to:
1. Clone this repository.
```git
git clone https://github.com/Lowton/rs-node-js-simple-crud-app.git
```
2. Go to the application folder
3. Run `npm install` or `npm i` to download packages
4. Run `npm run start:dev` to start the application in developer mode
   or `npm run start:prod` to run the application in production mode

# Usage
Port number for HTTP server should be set in .env file in the root directory
```properties
port=9000
```

## Available scripts
To start server:
```npm
# run server with native node.js
npm run start

# run server with nodemon
npm run start:dev

# build server with webpack and then run bundle server
npm run start:prod

# run built bundle
npm run prod
```
To run tests:
```npm
# run tests
npm run test

# run tests with coverage report
npm run test:coverage

# run e2e tests
npm run test:e2e
```
To build project with webpack
```npm
# run build
npm run build

# run build in development mode
npm run build:dev

# run build in production mode
npm run build:prod

# run watch
npm run watch
```


## License
[MIT](https://choosealicense.com/licenses/mit/)