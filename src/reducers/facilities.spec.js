import facilitiesReducer from './facilities';

const INITIAL_STATE = Object.freeze({
  isLoading: true,
  items: Object.freeze([]),
  error: null
});

describe('reducers/facilities', function() {
  it('should return the initial state', function() {
    expect(facilitiesReducer(undefined, {})).to.deep.equal(INITIAL_STATE);
  });

  describe('LOAD_FACILITIES_START', function() {
    let nextState;

    beforeEach(function() {
      nextState = facilitiesReducer(INITIAL_STATE, {
        type: 'LOAD_FACILITIES_START'
      });
    });

    it('sets the current loading status to `true`', function() {
      expect(nextState.isLoading).to.be.true;
    });

    context('after a LOAD_FACILITIES_FAILURE', function() {
      let nextState;

      beforeEach(function() {
        const previousState = Object.freeze({
          ...INITIAL_STATE,
          isLoading: false,
          error: new Error()
        });

        nextState = facilitiesReducer(previousState, {
          type: 'LOAD_FACILITIES_START'
        });
      });

      it('deletes the previous error', function() {
        expect(nextState.error).to.be.null;
      });
    });
  });

  describe('LOAD_FACILITIES_SUCCESS', function() {
    let expectedFacilities;
    let nextState;

    beforeEach(function() {
      expectedFacilities = fixture.buildList(
        'facility',
        faker.random.number({ min: 1, max: 10 })
      );

      const previousState = Object.freeze({
        ...INITIAL_STATE,
        isLoading: true
      });

      nextState = facilitiesReducer(previousState, {
        type: 'LOAD_FACILITIES_SUCCESS',
        payload: expectedFacilities
      });
    });

    it('stores the facilities in the state', function() {
      expect(nextState.items).to.equal(expectedFacilities);
    });

    it('sets the current loading status to `false`', function() {
      expect(nextState.isLoading).to.be.false;
    });
  });

  describe('LOAD_FACILITIES_FAILURE', function() {
    let nextState;
    let expectedError;

    beforeEach(function() {
      expectedError = new Error();

      const previousState = Object.freeze({
        ...INITIAL_STATE,
        isLoading: true,
        error: expectedError
      });

      nextState = facilitiesReducer(previousState, {
        type: 'LOAD_FACILITIES_FAILURE',
        payload: expectedError
      });
    });

    it('sets the current loading status to `false`', function() {
      expect(nextState.isLoading).to.be.false;
    });

    it('stores the error in the state', function() {
      expect(nextState.error).to.be.equal(expectedError);
    });
  });
});
