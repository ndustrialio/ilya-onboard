'use strict';

const chai = require('chai');
const enzyme = require('enzyme');
const faker = require('faker');
const sinon = require('sinon');
const fixtureFactories = require('../fixtures/factories');

global.expect = chai.expect;
global.fixture = fixtureFactories;
global.faker = faker;
global.sandbox = sinon.sandbox;
global.shallow = enzyme.shallow;

window.nd = {
  application: {
    clientId: faker.random.uuid()
  },
  sentry: {
    dataSourceName: `${faker.internet.url()}/`
  }
};
