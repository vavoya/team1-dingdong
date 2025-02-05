import React, { useReducer, useRef, useState } from "react";
import {
  CalendarHeader,
  CalendarWrapper,
  CurrentMonth,
  DateHeader,
  DayButton,
  GridContainer,
  IconWrapper,
  MonthNavigator,
  Weekday,
} from "./styles";
import ChevronLeftIcon from "@/components/designSystem/Icons/ChevronLeftIcon";
import { colors } from "@/styles/colors";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import AIRecommendationButton from "@/components/Button/AIRecommendationButton";
import useCalendar from "@/pages/BusBooking/hooks/useCalendar";
import { getDaysInMonth, isDateDisabled } from "@/utils/calendar/calendarUtils";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar() {
  // 현재 보고 있는 년도와 월을 상태로 관리

  // 오늘 시각으로부터 48시간 뒤~ 2개월 동안만 뷰가 나오도록.

  const { currentDate, goToNextMonth, goToPreviousMonth } = useCalendar();

  const [AIBtnToggle, setAIBtnToggle] = useState(false);

  const AIBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAIBtnToggle((prev) => !prev);
  };

  // 월 이름 포맷팅
  const formatMonth = () => {
    return `${currentDate.month + 1}월`;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <MonthNavigator>
          <IconWrapper onClick={goToPreviousMonth}>
            <ChevronLeftIcon size={24} fill={colors.gray50} />
          </IconWrapper>

          <CurrentMonth>{formatMonth()}</CurrentMonth>
          <IconWrapper onClick={goToNextMonth}>
            <ChevronRightIcon size={24} fill={colors.gray50} />
          </IconWrapper>
        </MonthNavigator>
        <AIRecommendationButton active={AIBtnToggle} onClick={AIBtnHandler} />
      </CalendarHeader>

      <DateHeader>
        {WEEKDAYS.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
      </DateHeader>

      <GridContainer>
        {getDaysInMonth(currentDate.year, currentDate.month).map(
          (day: number | string) => {
            if (typeof day === "number") {
              const date = new Date(currentDate.year, currentDate.month, +day);
              const disabledDate = isDateDisabled(date);
              return (
                <DayButton
                  disabled={disabledDate}
                  key={day}
                  isHighlighted={day === 26}>
                  {day}
                </DayButton>
              );
            } else {
              return (
                <DayButton key={day} isHighlighted={false}>
                  {day}
                </DayButton>
              );
            }
          }
        )}
      </GridContainer>
    </CalendarWrapper>
  );
}
