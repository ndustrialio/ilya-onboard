export function formatDateNoClockTime(date = new Date()) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  return formatDate(options)(date)('en-US');
}

export const formatDate = (options) => (date) => (locale) =>
  date.toLocaleDateString(locale, options);
