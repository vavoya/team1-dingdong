import React, { useEffect, useReducer, useRef, useState } from "react";
import * as S from "./styles";
import ChevronLeftIcon from "@/components/designSystem/Icons/ChevronLeftIcon";
import { colors } from "@/styles/colors";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import AIRecommendationButton from "@/components/Button/AIRecommendationButton";
import useCalendar from "@/pages/BusBooking/hooks/useCalendar";
import { getDaysInMonth, isDateDisabled } from "@/utils/calendar/calendarUtils";
import * as constant from "@/constants/calendarConstants";

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

  const months = useRef([
    getDaysInMonth(currentDate.year, currentDate.month),
    getDaysInMonth(currentDate.year, currentDate.month + 1),
    getDaysInMonth(currentDate.year, currentDate.month + 2),
  ]);

  const parentRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const newScreenWidth =
      screenWidth <= constant.MAX_MOBILE_WIDTH
        ? screenWidth
        : constant.LAYOUT_WIDTH;

    const dayButtonWidth =
      (newScreenWidth -
        constant.TOTAL_LEFT_RIGHT_PADDING -
        constant.TOTAL_CALENDAR_COLUMN_GAP) /
      constant.WEEKDAYS_COUNT;

    setButtonWidth(dayButtonWidth);
  }, []);

  const [currentMonth, setCurrentMonth] = useState(0);
  return (
    <S.CalendarWrapper ref={parentRef}>
      <S.CalendarHeader>
        <S.MonthNavigator>
          <S.IconWrapper
            onClick={() => {
              if (currentMonth === 0) return;
              setCurrentMonth(currentMonth - 1);
              goToPreviousMonth();
            }}>
            <ChevronLeftIcon size={24} fill={colors.gray50} />
          </S.IconWrapper>

          <S.CurrentMonth>{formatMonth()}</S.CurrentMonth>
          <S.IconWrapper
            onClick={() => {
              if (currentMonth === 2) return;
              goToNextMonth();
              setCurrentMonth(currentMonth + 1);
            }}>
            <ChevronRightIcon size={24} fill={colors.gray50} />
          </S.IconWrapper>
        </S.MonthNavigator>
        <AIRecommendationButton active={AIBtnToggle} onClick={AIBtnHandler} />
      </S.CalendarHeader>

      <S.DateHeader>
        {WEEKDAYS.map((weekday) => (
          <S.Weekday key={weekday}>{weekday}</S.Weekday>
        ))}
      </S.DateHeader>

      <S.GridWrapper index={currentMonth}>
        {months.current.map((array: (string | number)[], index) => (
          <S.GridContainer key={index} visible={currentMonth === index}>
            {array.map((day: number | string, dayIndex) => {
              if (typeof day === "number") {
                const date = new Date(
                  currentDate.year,
                  currentDate.month,
                  +day
                );
                const disabledDate = isDateDisabled(date);
                return (
                  <S.DayButton
                    $width={buttonWidth}
                    disabled={disabledDate}
                    key={`${day}-${dayIndex}`}
                    isHighlighted={day === 26}>
                    {day}
                  </S.DayButton>
                );
              } else {
                return (
                  <S.DayButton
                    $width={buttonWidth}
                    key={`${day}-${dayIndex}`}
                    isHighlighted={false}>
                    {day}
                  </S.DayButton>
                );
              }
            })}
          </S.GridContainer>
        ))}
      </S.GridWrapper>
    </S.CalendarWrapper>
  );
}
