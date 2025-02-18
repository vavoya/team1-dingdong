// 시간표 데이터에 맞게 각 해당하는 월의 요일에 시간을 ISO 문자열(한국시간) 배열을 반환합니다.

import { CommuteType } from "@/pages/BusBooking/types/commuteType";
import { isDateDisabled } from "../calendar/calendarUtils";

type HourMinute = {
  dayIndex: number; // 1: 월 , 2: 화, 3: 수, 4: 목, 5: 금
  hour: number; //24시간제.
  minute: number;
};
export type ServerRecommendationDataType = {
  monStartTime: string | null;
  monEndTime: string | null;
  tueStartTime: string | null;
  tueEndTime: string | null;
  wedStartTime: string | null;
  wedEndTime: string | null;
  thuStartTime: string | null;
  thuEndTime: string | null;
  friStartTime: string | null;
  friEndTime: string | null;
};
let toSchoolArray: HourMinute[];
let toHomeArray: HourMinute[];

export const convertTimeTableByCommuteType = (
  TimeTableRecommendationArray: ServerRecommendationDataType
) => {
  if (!TimeTableRecommendationArray) return;
  const TO_SCHOOL: HourMinute[] = [];
  const TO_HOME: HourMinute[] = [];

  Object.entries(TimeTableRecommendationArray).forEach(([key, value]) => {
    if (!value) return; // null 체크

    // 시간 문자열을 시와 분으로 분리
    const [hour, minute] = value.split(":").map(Number);

    // 요일 확인 (mon: 1, tue: 2, ...)
    const dayMap: { [key: string]: number } = {
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
    };
    const day = dayMap[key.substring(0, 3)];

    // Start/End 구분하여 적절한 배열에 추가
    const hourMinute: HourMinute = {
      dayIndex: day,
      hour,
      minute,
    };

    if (key.includes("Start")) {
      TO_SCHOOL.push(hourMinute);
    } else {
      TO_HOME.push(hourMinute);
    }
  });

  toSchoolArray = TO_SCHOOL;
  toHomeArray = TO_HOME;
};
// TO_SCHOOL: [
//     { dayIndex: 1, hour: 8, minute: 0 },
//     { dayIndex: 2, hour: 8, minute: 30 },
//     { dayIndex: 4, hour: 9, minute: 0 },
//     { dayIndex: 5, hour: 9, minute: 30 }
//   ],
//   TO_HOME: [
//     { dayIndex: 1, hour: 16, minute: 0 },
//     { dayIndex: 2, hour: 16, minute: 30 },
//     { dayIndex: 4, hour: 17, minute: 0 },
//     { dayIndex: 5, hour: 17, minute: 30 }
//   ]

// 한국 시간 고려
const createDateWithTime = (hour: number, minute: number, date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(hour + 9, minute, 0); // ISO 문자열로 바뀔때 -9시간이 되어서 +9를 합니다.
  return newDate.toISOString().split(".")[0];
};

export const timeTableRecommendationDatesByMonth = (
  currentMonth: number,
  commuteType: CommuteType
) => {
  const currentYear = new Date().getFullYear();

  const targetTimes = commuteType === "등교" ? toSchoolArray : toHomeArray;

  return Array.from(
    { length: new Date(currentYear, currentMonth + 1, 0).getDate() },
    (_, i) => new Date(currentYear, currentMonth, i + 1)
  )
    .filter((date) =>
      targetTimes.some(
        (time: HourMinute) =>
          time.dayIndex === date.getDay() && !isDateDisabled(date, commuteType)
      )
    )
    .map((date) => {
      const { hour, minute } = targetTimes.find(
        (time: HourMinute) => time.dayIndex === date.getDay()
      )!;
      return createDateWithTime(hour, minute, date);
    });
};
