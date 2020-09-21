import { getDateRange } from './dateUtils';

describe('dateUtils', function() {
  let baseProps;

  beforeEach(function() {
    baseProps = {
      startDayNumber: 0,
      endDayNumber: 6
    };
  });

  describe('getDateRange', function() {
    beforeEach(function() {});

    it('creates a date range from Sunday 00:00:00 to Saturday 24:59:59:999 with current date as starting date', function() {
      const { startDate, endDate } = getDateRange(new Date());

      expect(startDate.getDay()).to.equal(baseProps.startDayNumber);

      expect(endDate.getDay()).to.equal(baseProps.endDayNumber);
    });
  });
});
