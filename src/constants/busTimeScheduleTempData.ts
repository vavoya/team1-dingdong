const today = new Date();
today.setHours(11, 0, 0, 0); // 오늘 오전 11시로 설정

const tomorrow = new Date(today); // 오늘 날짜 복사
tomorrow.setDate(today.getDate() + 1);

export const TEMP_DATE = [
  today.toISOString(),
  new Date(today.setHours(11, 30)).toISOString(),
  new Date(today.setHours(12, 0)).toISOString(),
  new Date(today.setHours(13, 30)).toISOString(),
  new Date(today.setHours(14, 0)).toISOString(),
  new Date(today.setHours(15, 30)).toISOString(),
  new Date(today.setHours(16, 0)).toISOString(),
  new Date(today.setHours(17, 30)).toISOString(),
  new Date(tomorrow.setHours(12, 0)).toISOString(),
  new Date(tomorrow.setHours(13, 0)).toISOString(),
  new Date(tomorrow.setHours(14, 0)).toISOString(),
];
