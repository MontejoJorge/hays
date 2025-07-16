export const dateToOffsetDateTime = (date: string): string => {
  if (!date) return '';
  const dateObj = new Date(date);
  const offsetMinutes = dateObj.getTimezoneOffset();
  const offsetHours = Math.abs(offsetMinutes / 60);
  const offsetSign = offsetMinutes > 0 ? '-' : '+';
  const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:00`;
  const formattedDate = dateObj.toISOString().replace('Z', formattedOffset);
  return formattedDate;
};
