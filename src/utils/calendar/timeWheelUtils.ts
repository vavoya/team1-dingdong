interface TimeInput {
  initHour: number;
  initMinute: number;
}

interface ScrollPosition {
  initAmPmScrollTop: number;
  initHourScrollTop: number;
  initMinuteScrollTop: number;
}
// 24시간제 -> 12시간제 변환 그리고 스크롤 위치에 맞게.
export const convertTimeToScrollPosition = ({
  initHour,
  initMinute,
}: TimeInput): ScrollPosition => {
  // AM/PM 결정 (0: AM, 1: PM)
  const initAmPmScrollTop = initHour >= 12 ? 1 : 0;

  // 12시간제로 변환 (1-12)
  let hour12 = initHour % 12;
  if (hour12 === 0) hour12 = 12;

  // 시간을 인덱스로 변환 (1시=0, 2시=1,~ 12시=11)
  const initHourScrollTop = hour12;

  // 분을 인덱스로 변환 (0분=0, 30분=1)
  const initMinuteScrollTop = initMinute === 0 ? 0 : 1;

  return {
    initAmPmScrollTop,
    initHourScrollTop,
    initMinuteScrollTop,
  };
};
