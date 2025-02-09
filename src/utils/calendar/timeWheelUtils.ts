import { CommuteType } from "@/pages/BusBooking/types/commuteType";
import { parseTime } from "./calendarUtils";
import { selectedDateType } from "@/pages/BusBooking/CustomRouteBooking/types/selectedDateType";

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

export const isBookingTimeAvailable = (
  selectedDateInfo: Date,
  commuteType: CommuteType
) => {
  const now = new Date();
  const TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS = 48 * 60 * 60 + 5 * 60;
  const TWO_DAYS_TO_SECONDS = 48 * 60 * 60;

  const minDate = new Date(
    now.getTime() + TWO_DAYS_AND_FIVE_MINUTES_TO_SECONDS * 1000
  );
  const maxDate = new Date(now.getTime() + TWO_DAYS_TO_SECONDS * 1000);

  maxDate.setMonth(minDate.getMonth() + 2); // 2개월 후

  // 버스 운영시간
  const busOperatingHours = {
    등교: { start: 8, end: 18 }, // 오전 8시 ~ 오후 6시
    하교: { start: 11, end: 21 }, // 오전 11시 ~ 오후 9시
  };

  const commuteHours = busOperatingHours[commuteType];

  if (
    selectedDateInfo < minDate ||
    selectedDateInfo > maxDate ||
    selectedDateInfo.getHours() < commuteHours.start ||
    selectedDateInfo.getHours() >= commuteHours.end
  ) {
    // 가능한 시간 중 가장 빠른 시간, 늦은 시간 계산
    let validMinTime = new Date(minDate);
    // minDate가 버스 시작 시간보다 빠르면 버스 시작 시간으로 설정
    validMinTime.setHours(
      Math.max(commuteHours.start, validMinTime.getHours()),
      0,
      0,
      0
    );

    let validMaxTime = new Date(maxDate);
    // maxDate가 버스 종료 시간보다 늦으면 버스 종료 시간으로 설정
    validMaxTime.setHours(
      Math.min(commuteHours.end - 1, validMaxTime.getHours()),
      59,
      59,
      999
    );

    // 시간의 차이를 비교해서 가장 가까운 가능한 시간을 반환
    if (selectedDateInfo < minDate) {
      return validMinTime.getHours(); // 가장 빠른 시간 반환
    } else if (selectedDateInfo > maxDate) {
      return validMaxTime.getHours(); // 가장 늦은 시간 반환
    }
    return false;
  }

  return true;
};

// 범위를 벗어나는 시간 셋팅 관련 유틸

export const parseAndCreateTime = (
  selectedDate: selectedDateType,
  amPm: string,
  hour: string,
  minute: string
) => {
  const { hour: parsedHour, minute: parsedMinute } = parseTime({
    amPm,
    hour,
    minute,
  });
  return new Date(
    selectedDate.year,
    selectedDate.month - 1,
    selectedDate.day,
    parsedHour,
    parsedMinute
  );
};

export const handleTimeAvailability = (
  newTime: Date,
  commuteType: CommuteType
) => {
  const availableTimeOrBoolean = isBookingTimeAvailable(newTime, commuteType);

  if (typeof availableTimeOrBoolean === "boolean") {
    return !availableTimeOrBoolean
      ? { reset: true, hour: commuteType === "등교" ? 8 : 11 }
      : null;
  } else {
    const morningOrNoon = availableTimeOrBoolean >= 12 ? 1 : 0;
    return { reset: true, hour: availableTimeOrBoolean, morningOrNoon };
  }
};

export const updateScrollPosition = (
  reset: boolean,
  morningOrNoon: number,
  hour: number,
  timeWheelRef: React.RefObject<any>
) => {
  if (reset) {
    // 오전 또는 오후, 시간, 00시로 셋팅.
    timeWheelRef.current?.resetScrollPosition(morningOrNoon, hour, 0);
  }
};
