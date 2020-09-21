function formatDateNoClockTime(date = new Date()) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return _formatDate(options)(date)('en-US');
}

const _formatDate = (options) => (date) => (locale) =>
  date.toLocaleDateString(locale, options);

/**
 * Returns a date range of one week from Sunday to end of day Saturday.  If no date is
 * passed in, the current date is used.
 * @param {Date} [date] - the date to base the range on
 * @returns {{endDate: Date, startDate: Date}}
 */
function getDateRange(date) {
  const fromDate = date || new Date();
  fromDate.setHours(0);
  fromDate.setMinutes(0);
  fromDate.setSeconds(0);
  fromDate.setMilliseconds(0);

  const endTime = new Date(fromDate).setDate(
    fromDate.getDate() + (6 - fromDate.getDay())
  );
  const startTime = new Date(fromDate).setDate(
    fromDate.getDate() - fromDate.getDay()
  );

  const endDate = new Date(endTime);
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  endDate.setMilliseconds(999);
  const startDate = new Date(startTime);

  return {
    startDate,
    endDate
  };
}

export { getDateRange, formatDateNoClockTime };
