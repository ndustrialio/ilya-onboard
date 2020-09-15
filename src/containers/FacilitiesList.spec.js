import React from 'react';
import { FacilitiesList } from '../containers';

describe('<FacilitiesList />', function() {
  let baseProps;

  beforeEach(function() {
    this.sandbox = sandbox.create();

    baseProps = {
      loadFacilities: this.sandbox.stub(),
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

  describe('componentDidMound', () => {
    let facilitiesList;

    beforeEach(() => {
      facilitiesList = shallow(<FacilitiesList {...baseProps} />);
    });

    it('loads the facilities', () => {
      expect(facilitiesList.exists()).to.be.true;
    });
  });

  // describe('componentDidMount', function () {
  //   let facilitiesList;
  //
  //   beforeEach(function () {
  //     facilitiesList = shallow(<FacilitiesList {...baseProps} />);
  //   });
  //
  //   it('loads the facilities', function () {
  //     expect(facilitiesList.exists()).to.be.true;
  //     baseProps.loadFacilities();
  //     // expect(baseProps.loadFacilities).to.be.calledOnce;
  //   });
  //
  //   it('renders <Loader /> while facilities are loading', function () {
  //     expect(facilitiesList.find('Facilities').exists()).to.not.be.true;
  //     expect(facilitiesList.find('Loader').exists()).to.be.true;
  //   });
  //
  //   it('renders <FacilitiesList /> when facilities are not loading', function () {
  //     facilitiesList.setProps({
  //       isLoading: false,
  //     });
  //
  //     expect(facilitiesList.find('Loader').exists()).to.not.be.true;
  //     expect(facilitiesList.find('FacilitiesList').exists()).to.be.true;
  //   });
  // });
});
