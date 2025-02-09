import ExitHeader from "@/components/Headers/ExitHeader";
import { useEffect, useState } from "react";

import SolidButton from "@/components/designSystem/Button/SolidButton";
import { CommuteType } from "../types/commuteType";

import FixedBookingCommuteSwitcher from "./Components/FixedBookingCommuteSwitcher";
import FixedBookingCalendarView from "./Components/FixedBookingCalendarView";
import TimeSelectButtons from "./Components/TimeSelectButtons";
import {
  Info,
  NextButtonContainer,
  ShowSelectedSchedule,
  Subtitle,
} from "./styles";
import { convertInfoToText } from "@/utils/calendar/fixedBusBookingUtils";

export interface SelectedTimeType {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface SelectedDateType {
  year: number;
  month: number;
  day: number;
}

export type timeType = {
  hour: number;
  minute: number;
};

export default function FixedRouteBooking() {
  // 예매 나가기 모달 상태관리

  const [selectedHourMinute, setSelectedHourMinute] = useState<timeType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<SelectedDateType | null>(
    null
  );

  const [commuteType, setCommuteType] = useState<CommuteType>("등교");

  const exitButtonHandler = () => {
    // 모달 오픈. ( 예매를 취소 하시겠어요 ?)
  };

  const [showInfo, setShowInfo] = useState("-");

  // 해당 년도, 월, 일자에 따른 확정된 버스 시간 정보 hooks 호출.
  //   const decidedSchedule = useFixedBusRoute(selectedDate?.year,selectedDate?.month,selectedDate?.day)
  const decidedSchedule = [
    {
      hour: 12,
      minute: 0,
    },
    {
      hour: 12,
      minute: 30,
    },
    {
      hour: 13,
      minute: 0,
    },
    {
      hour: 14,
      minute: 30,
    },
    {
      hour: 15,
      minute: 0,
    },
    {
      hour: 16,
      minute: 0,
    },
    {
      hour: 17,
      minute: 0,
    },
    {
      hour: 18,
      minute: 0,
    },
  ];

  useEffect(() => {
    if (selectedDate && selectedHourMinute) {
      setShowInfo(convertInfoToText(selectedDate, selectedHourMinute));
    }
  }, [selectedDate, selectedHourMinute]);

  return (
    <>
      <ExitHeader text="함께타기" onClick={exitButtonHandler} />
      {/* 출퇴근 스위치역할 뷰.  */}
      <FixedBookingCommuteSwitcher
        commuteType={commuteType}
        setCommuteType={setCommuteType}
      />

      <FixedBookingCalendarView
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        commuteType={commuteType}
      />

      <TimeSelectButtons
        decidedSchedule={decidedSchedule}
        selectedHourMinute={selectedHourMinute}
        setSelectedHourMinute={setSelectedHourMinute}
      />

      <ShowSelectedSchedule>
        <Subtitle>도착 시각</Subtitle>
        <Info>{showInfo}</Info>
      </ShowSelectedSchedule>
      <NextButtonContainer>
        <SolidButton text="다음" />
      </NextButtonContainer>
    </>
  );
}
// 시간 선택 모달은 달력에서 한 번,
// page.tsx에서 한 번.
