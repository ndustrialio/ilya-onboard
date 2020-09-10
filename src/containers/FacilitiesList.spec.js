import React from 'react';

import { FacilitiesList as FacilitiesListContainer } from './FacilitiesList';

describe('<FacilitiesListContainer />', function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseProps = {
      actions: {
        facilities: {
          loadFacilities: this.sandbox.stub()
        }
      },
      facilities: [],
      history: {
        push: this.sandbox.stub()
      },
      isLoading: true
    };
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('componentDidMount', function() {
    let facilitiesList;

    beforeEach(function() {
      facilitiesList = shallow(<FacilitiesListContainer {...baseProps} />);
    });

    it('loads the facilities', function() {
      expect(baseProps.actions.facilities.loadFacilities).to.be.calledOnce;
    });

    it('renders <Loader /> while facilities are loading', function() {
      expect(facilitiesList.find('FacilitiesList').exists()).to.not.be.true;
      expect(facilitiesList.find('Loader').exists()).to.be.true;
    });

    it('renders <FacilitiesList /> when facilities are not loading', function() {
      facilitiesList.setProps({
        isLoading: false
      });

      expect(facilitiesList.find('Loader').exists()).to.not.be.true;
      expect(facilitiesList.find('FacilitiesList').exists()).to.be.true;
    });
  });
});
