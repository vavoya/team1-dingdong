type DateObject = {
  year: number;
  month: number;
  day: number;
};

type TimeObject = {
  hour: number;
  minute: number;
};

export const convertToISOStringArray = (
  dateObj: DateObject,
  timeObj: TimeObject
): string[] => {
  const { year, month, day } = dateObj;
  const { hour, minute } = timeObj;

  // Date 객체는 월이 0부터 시작.
  const date = new Date(year, month - 1, day, hour, minute, 0);

  const ISOString = date.toISOString();

  return [ISOString];
};
