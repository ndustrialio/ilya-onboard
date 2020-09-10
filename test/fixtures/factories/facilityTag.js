'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory
  .define('facilityTag')
  .sequence('id')
  .attrs({
    createdAt: () => faker.date.past().toISOString(),
    facilityId: () => faker.random.number(),
    name: () => faker.commerce.productMaterial(),
    updatedAt: () => faker.date.recent().toISOString()
  });
