const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export const formatDateNoTime = (inputDateStr: string) => {
  const dateParts = inputDateStr.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!dateParts) {
    return null;
  }

  const [, year, month, day] = dateParts;
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  return date.toLocaleString('en-US', options);
};
