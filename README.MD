# Paciolify

Millennia families tend to have separate bank accounts instead of a common one. This introduces an additional complexity level by managing expenses and budgets.

This application aims to facilitate family accounting by aggregating data from each member's bank account, providing a simple way to manage and control shared budgets and expenses.

![screenshot-landing](./lib/client/img/screenshot-landing.jpg)

## Getting Started

### Prerequisites

- node 8+
- npm 6+
- dependency-cruiser 4+ (for updating dependency graph)

### Installing

Clone the repo and install dependancies\_

```
  git clone git@github.com:ugobriasco/paciolify.git
  cd ./paciolify
  npm i
```

Spin up your mongodb:

```
  mongod
```

### Starting the application

The easy way:

```bash
npm start
```

If you want to select the environment:

```bash
# Start the application with environment parameter 'production'
NODE_ENV=production node .
```

Following all the available test evnvironments:

- production
- staging (default)
- Test

Here an example for triggering debugging logs:

````bash
# Start the application with debugging flag 'workers'
NODE_DEBUG=workers NODE_ENV=stage node .
````

Following all the available debug flags:

- workers
- server
- n26-api
- transactions

## Usage

### Banks supported

- N26

## Running tests

Run `npm test` to execute the unit and integration tests. It requires the following framework:

- [Mocha](https://mochajs.org/).
- [Chai](http://chaijs.com).

You can also run unit tests (`npm run test:unit`) or integration tests (`npm run test:integration`) separately

## Build with

- [mongo](https://docs.mongodb.com/getting-started/shell/)
- [node](https://nodejs.org/en/)
- [express](http://expressjs.com/)

## Architecture

Dependency graph [here](https://github.com/ugobriasco/paciolify/blob/master/dependencygraph.svg). For updating it, run:

```
npm run build:deptree
```

## Authors

- **[Ugo Briasco](https://github.com/ugobriasco)** - _Initial work_

## Contributing

A big thanks to [Luca Bartolomeo Pacioli](https://en.wikipedia.org/wiki/Luca_Pacioli) (1447 -1517) to invent the art of accounting and bookkeeping. If you want to honorate his memory by contributing to this application, please consider to follow the linting rules, run your tests before pushing to origin and provide clear and syntetic PRs.

## License

MIT
