import * as facilitiesActionCreators from '../actions/facilities';
import contxtService from '../services/contxt';

describe('actions/facilities', function() {
  beforeEach(function() {
    this.sandbox = sandbox.create();
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  describe('loadFacilities', function() {
    let dispatch;
    let expectedFacilities;

    beforeEach(function() {
      expectedFacilities = fixture.buildList(
        'facility',
        faker.random.number({ min: 1, max: 10 })
      );

      dispatch = this.sandbox.stub();
    });

    context('successfully loading the facilities', function() {
      let getAll;
      let promise;

      beforeEach(function() {
        getAll = this.sandbox
          .stub(contxtService.facilities, 'getAll')
          .resolves(expectedFacilities);

        promise = facilitiesActionCreators.loadFacilities()(dispatch);
      });

      it('dispatches a LOAD_FACILITIES_START action', function() {
        expect(dispatch).to.be.calledWith({
          type: 'LOAD_FACILITIES_START'
        });
      });

      it('gets all the facilities', function() {
        expect(getAll).to.be.calledOnce;
      });

      it('dispatches a LOAD_FACILITIES_SUCCESS action', function() {
        return promise.then(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FACILITIES_SUCCESS',
            payload: expectedFacilities
          });
        });
      });

      it('returns a resolved promise', function() {
        return expect(promise).to.be.fulfilled;
      });
    });

    context('failing to load the facilities', function() {
      let expectedError;
      let promise;

      beforeEach(function() {
        expectedError = new Error();

        this.sandbox
          .stub(contxtService.facilities, 'getAll')
          .rejects(expectedError);

        promise = facilitiesActionCreators.loadFacilities()(dispatch);
      });

      it('dispatches a LOAD_FACILITIES_FAILURE action', function() {
        return promise.then(expect.fail).catch(() => {
          expect(dispatch).to.be.calledWith({
            type: 'LOAD_FACILITIES_FAILURE',
            error: true,
            payload: expectedError
          });
        });
      });

      it('returns a rejected promise', function() {
        return expect(promise).to.be.rejectedWith(expectedError);
      });
    });
  });
});
