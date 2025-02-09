import ExitHeader from "@/components/Headers/ExitHeader";
import { useReducer, useState } from "react";
import CommuteSwitcher from "./components/CommuteSwitcher";
import InfoIcon from "@/components/designSystem/Icons/InfoIcon";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import CalendarView from "./components/CalendarView";
import {
  BottomContainer,
  ButtonTitle,
  ConfirmButtonWrapper,
  CountViewBox,
  DetailText,
  InfoTextBox,
  ScheduleCount,
  Title,
  TotalEditableViewButton,
} from "./styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { CommuteType, OverlayBottomModalType } from "../types/commuteType";

import TimeViewBottomModal from "./components/TimeViewBottomModal";
import { timeScheduleReducer } from "../store/reducer";

export default function CustomRouteBooking() {
  // 예매 나가기 모달 상태관리

  const [selectedTimeSchedule, dispatch] = useReducer(timeScheduleReducer, {});

  const [exitConfimModalOpen, setExitConfimModalOpen] = useState(false);

  const exitButtonHandler = () => {
    setExitConfimModalOpen(true);
  };
  const [commuteType, setCommuteType] = useState<CommuteType>("등교");
  const [overlayBottomModalType, setOverlayBottomModalType] =
    useState<OverlayBottomModalType>("editable");

  const [timeViewModalOpen, setTimeViewModalOpen] = useState(false);
  return (
    <>
      <ExitHeader text="버스예매" onClick={exitButtonHandler} />
      {/* 출퇴근 스위치역할 뷰.  */}
      <CommuteSwitcher
        commuteType={commuteType}
        setCommuteType={setCommuteType}
        dispatch={dispatch}
        selectedTimeSchedule={selectedTimeSchedule}
      />
      <Title>일자를 선택해 시각을 설정해주세요</Title>
      <CalendarView
        commuteType={commuteType}
        dispatch={dispatch}
        selectedTimeSchedule={selectedTimeSchedule}
      />

      <BottomContainer>
        <InfoTextBox>
          <InfoIcon />
          <DetailText>탑승권은 2일 전까지 예매 가능해요.</DetailText>
        </InfoTextBox>

        <TotalEditableViewButton>
          <ButtonTitle>선택한 일정</ButtonTitle>
          <CountViewBox
            onClick={() => {
              setTimeViewModalOpen(true);
              setOverlayBottomModalType("editable");
            }}>
            <ScheduleCount>-</ScheduleCount>
            <ChevronRightIcon />
          </CountViewBox>
        </TotalEditableViewButton>

        <TimeViewBottomModal
          isEditablTimeViewModalOpen={timeViewModalOpen}
          setIsEditablTimeViewModalOpen={setTimeViewModalOpen}
          commuteType={commuteType}
          modalType={overlayBottomModalType}
        />

        <ConfirmButtonWrapper>
          <SolidButton
            onClick={() => {
              setOverlayBottomModalType("lastStep");
              setTimeViewModalOpen(true);
            }}
            text="선택 일정 최종 확인하기"
          />
        </ConfirmButtonWrapper>
      </BottomContainer>
    </>
  );
}
