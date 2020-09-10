'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;
const _ = require('underscore');

factory
  .define('facility')
  .sequence('id')
  .attrs({
    address1: () => faker.address.streetAddress(),
    address2: () => faker.address.secondaryAddress(),
    city: () => faker.address.city(),
    createdAt: () => faker.date.past().toISOString(),
    geometryId: () => faker.random.uuid(),
    info: () => factory.build('facilityInfo'),
    state: () => faker.address.state(),
    timezone: () =>
      faker.random.arrayElement([
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles'
      ]),
    weatherLocationId: () => null,
    zip: () => faker.address.zipCode()
  })
  .attr('name', ['city'], (city) => `${faker.address.cityPrefix()} ${city}`)
  .attr('organization', () => factory.build('organization', null))
  .attr('organizationId', ['organization'], (organization) => organization.id)
  .attr('facility_groupings', ['id', 'organizationId'], (id, organizationId) =>
    _.times(faker.random.number({ min: 0, max: 5 }), () =>
      factory.build('facilityGrouping', { organizationId, facilityId: id })
    )
  )
  .attr('tags', ['id'], (id) =>
    _.times(faker.random.number({ min: 0, max: 5 }), () =>
      factory.build('facilityTag', { facilityId: id })
    )
  );
