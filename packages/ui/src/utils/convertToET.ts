export const convertToET = (
  etYear: number,
  etMonth: number,
  etDay: number | undefined,
  etHour: number | undefined,
  etMinute: number | undefined
) => {
  let date = new Date(Date.UTC(etYear, etMonth, etDay, etHour, etMinute, 0));

  let utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  let tzDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  let offset = utcDate.getTime() - tzDate.getTime();

  date.setTime(date.getTime() + offset);

  return date.toISOString();
};
