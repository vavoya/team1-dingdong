import React, { useState } from "react";
import {
  CalendarHeader,
  CalendarWrapper,
  CurrentMonth,
  DateHeader,
  Day,
  GridContainer,
  IconWrapper,
  MonthNavigator,
  Weekday,
} from "./styles";
import ChevronLeftIcon from "@/components/designSystem/Icons/ChevronLeftIcon";
import { colors } from "@/styles/colors";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import AIRecommendationButton from "@/components/Button/AIRecommendationButton";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
export default function Calendar() {
  // 현재 보고 있는 년도와 월을 상태로 관리

  // 오늘 시각으로부터 48시간 뒤~ 2개월 동안만 뷰가 나오도록.

  const [AIBtnToggle, setAIBtnToggle] = useState(false);

  const AIBtnHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAIBtnToggle((prev) => !prev);
  };

  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(), //  (0: 1월, 1: 2월, ...)
    };
  });

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      // 1월에서 이전 달로 가면 작년 12월로
      if (prev.month === 0) {
        return {
          year: prev.year - 1,
          month: 11,
        };
      }
      //  월만 감소
      return {
        year: prev.year,
        month: prev.month - 1,
      };
    });
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      // 12월에서 다음 달로 가면 다음 년도 1월로
      if (prev.month === 11) {
        return {
          year: prev.year + 1,
          month: 0,
        };
      }
      // 그 외의 경우는 단순히 월만 증가
      return {
        year: prev.year,
        month: prev.month + 1,
      };
    });
  };

  // 해당 월의 날짜들을 계산
  const getDaysInMonth = () => {
    const daysInMonth = new Date(
      currentDate.year,
      currentDate.month + 1,
      0
    ).getDate(); // 현재 월의 마지막 날짜

    const firstDayOfMonth = new Date(
      currentDate.year,
      currentDate.month,
      1
    ).getDay(); // 현재 월의 1일의 요일 (0: 일요일, 1: 월요일, ...)

    const days: (number | "")[] = [];

    // 이전 달의 날짜들을 빈칸으로 채움
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push("");
    }

    // 현재 달의 날짜들을 채움
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
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
          <Weekday>{weekday}</Weekday>
        ))}
      </DateHeader>

      <GridContainer>
        {getDaysInMonth().map((day) => (
          <Day key={day} isHighlighted={day === 26}>
            {day}
          </Day>
        ))}
      </GridContainer>
    </CalendarWrapper>
  );
}
