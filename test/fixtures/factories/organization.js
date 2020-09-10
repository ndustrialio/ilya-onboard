'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('organization').attrs({
  createdAt: () => faker.date.past().toISOString(),
  id: () => faker.random.uuid(),
  name: () => faker.company.companyName(),
  updatedAt: () => faker.date.recent().toISOString()
});
