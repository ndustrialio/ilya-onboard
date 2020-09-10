'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('facilityGrouping').attrs({
  createdAt: () => faker.date.past().toISOString(),
  description: () => faker.hacker.phrase(),
  id: () => faker.random.uuid(),
  isPrivate: () => faker.random.boolean(),
  name: () => faker.commerce.productName(),
  organizationId: () => factory.build('organization').id,
  ownerId: () => faker.internet.userName(),
  parentGroupingId: () => faker.random.uuid(),
  updatedAt: () => faker.date.recent().toISOString()
});
