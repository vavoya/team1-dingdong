import { TimeSchedule, Time } from "./types";

export const timeScheduleSelectors = {
  getTimeForDate: (
    // 해당 날짜의 시간 값 들고오기.
    state: TimeSchedule,
    year: number,
    month: number,
    day: number
  ): Time | undefined => {
    return state[year]?.[month]?.[day];
  },

  hasScheduledTime: (
    // 해당 날짜에 시간이 있는지 확인
    state: TimeSchedule,
    year: number,
    month: number,
    day: number
  ): boolean => {
    return !!state[year]?.[month]?.[day];
  },
  // 해당 달의 스케줄, 들고오기
  getMonthSchedule: (state: TimeSchedule, year: number, month: number) => {
    return state[year]?.[month] || {};
  },
};
