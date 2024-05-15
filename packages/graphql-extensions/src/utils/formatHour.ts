const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
};

export const formatHour = (inputDateStr: string) => {
  const dateParts = inputDateStr.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!dateParts) {
    return null;
  }

  const [, year, month, day, hours, minutes] = dateParts;
  const date = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  return date.toLocaleString('en-US', options);
};
