import React from 'react';
import FacilitiesList from './FacilitiesList';

describe('<FacilitiesList />', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      facilities: fixture.buildList(
        'facility',
        faker.random.number({ min: 1, max: 10 })
      )
    };
  });

  describe('componentDidMount', function() {
    let facilitiesList;

    beforeEach(function() {
      facilitiesList = shallow(<FacilitiesList {...baseProps} />);
    });

    it('displays the number of facilities', function() {
      expect(facilitiesList.find('.facilities-list__count').text()).to.equal(
        baseProps.facilities.length.toString()
      );
    });
  });
});
