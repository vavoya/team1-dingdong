import { CommuteType } from "../types/commuteType";
import { Time } from "./types";

export const timeScheduleActions = {
  setSingleTime: (year: number, month: number, day: number, time: Time) => ({
    type: "SET_SINGLE_TIME" as const,
    payload: { year, month, day, time },
  }),

  removeSingleTime: (year: number, month: number, day: number) => ({
    type: "REMOVE_SINGLE_TIME" as const,
    payload: { year, month, day },
  }),

  setAIRecommendations: (
    year: number,
    month: number,
    recommendations: string[] // ISO 형식의 날짜 배열
  ) => ({
    type: "SET_AI_RECOMMENDATIONS" as const,
    payload: { year, month, recommendations },
  }),

  clearAIRecommendations: (year: number, month: number) => ({
    type: "CLEAR_AI_RECOMMENDATIONS" as const,
    payload: { year, month },
  }),
  // 다른 액션들

  setRepeatingDays: (
    year: number,
    month: number,
    day: number,
    time: Time,
    commuteType: CommuteType
  ) => ({
    type: "SET_REPEATING_DAYS" as const,
    payload: { year, month, day, time, commuteType },
  }),

  clearAll: () => ({
    type: "CLEAR_ALL" as const,
  }),
};
