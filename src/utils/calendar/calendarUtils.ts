export function getDaysInMonth(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days: (number | "")[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push("");
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return days;
}
// true면 비활성화
export function isDateDisabled(date: Date) {
  const now = new Date();
  // 현재와 같은 시각으로 48시간 후 부터 이므로, 현재 시각과 맞추기.
  // 일반 Date는 오전 12시로 맞춰져있어서, 최소 가능한 일자가 비활성화 되는 문제가 생길 수 있음.
  date.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  const minDate = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48시간 후
  const maxDate = new Date(now);
  maxDate.setMonth(now.getMonth() + 2); // 2개월 후

  return date < minDate || date > maxDate;
}
