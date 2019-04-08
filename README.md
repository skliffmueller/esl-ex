# ESL Leagues React App

This is a react app challenge given by ESL.

## Demo

You may access a running instance of the project at: http://esl-ex.rasterized.net

## Foundational Choices

This is a react/redux application built out in typescript with some strict tslint rules.

React router is also used for simple navigation.

There is one redux middleware being utilized `redux-axios-middleware`

The app uses SASS for styles, postcss-loader, and style-loader plugin in webpack.

The CSS naming conventions follow the SUIT CSS naming conventions: https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md

The webpack build process was built from the ground up, as well as the react app.

## Some notes about the app

Sometimes, the participants in a league results listing comes over with an ID of 0. This is an occasion I'm assuming the opposing team received a "Buy" round, and filter the particular round from the results.

Deleted accounts still exist in the listing, as they do contain a participant ID.

You may change the league ID in the url to view any results provided by the API, 3 links are provided in the app as examples.

## Before you begin

This application has been developed using node version 10.15.3. A useful utility for switching between node versions is nvm.

NVM for windows:

https://github.com/coreybutler/nvm-windows/releases

or follow the guide for all other operating systems:

https://github.com/creationix/nvm#installation-and-update

Once installed you may run `nvm install 10.15.3`

Note: Sometimes when switching versions in nvm, node-sass tends to break, to fix this just run `npm rebuild node-sass`

## Installation

First run npm install:

```bash
npm install
```

## Running the application

For running as a developer just simply run the following:

```bash
npm run start:dev
```

If you'd like to use a different port, simply set PORT env to the port you desire. Example:

```bash
PORT=8080 npm run start:dev
```

Sometimes, the browser will not open automatically due to permission issues. After the app has bundled, you may open your browser and access http://localhost:9000/ to see the application.

Keep in mind, you will have to disable CORS on the browser you use. Microsoft Edge cannot disable cores, but Firefox and Chrome, you can disable CORS.

Firefox, you must install a plugin to disable CORS. The plugin is available here: https://addons.mozilla.org/en-US/firefox/addon/cross-domain-cors/

Chrome, you can disable cors via the command line: https://stackoverflow.com/a/6083677

To make a production build run the following:

```bash
NODE_ENV=production npm run build
```

You must run tslint and fix any syntax errors before running a production deployment (docker build):

```bash
npm run tslint
```

## Deployment

First you must build the docker image:

```bash
docker build -t esl-ex:latest .
```

To run the image, you must expose port 3000:

```bash
docker run -d -p 3000:3000 esl-ex:latest
```

You should be able to access the server at http://localhost:3000/ if running locally. Or the server you are deploying too http://<domain/ip>:3000/

Note: If you get any tslint errors, you may need to correct the syntax tslint is shouting at you about.