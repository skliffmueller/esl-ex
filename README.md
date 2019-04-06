# ESL Leagues React App

This is a react app to show a developers potential when given a project to reproduce.

## Installation

First you must install some global npm modules. Here are the basics to install:

```bash
npm install -g webpack typescript webpack-dev-server
```

Now simply run a regular npm install

```bash
npm install
```

The module tslint is optional to install
```bash
npm install -g tslint
```

## Running the application

For running as a developer just simply run the following:

```bash
npm run start:dev
```

Sometimes, the browser will not open automatically due to permission issues. After the app has bundled, you may open your browser and access http://localhost:9000/ to see the application.

To make a production build run the following:

```angular2html
NODE_ENV=production npm run build
```

## tslint

```
npm run tslint
```