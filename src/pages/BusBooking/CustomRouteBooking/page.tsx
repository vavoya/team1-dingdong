import ExitHeader from "@/components/Headers/ExitHeader";
import { useState } from "react";
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
import ConfirmButton from "@/components/designSystem/Button/ConfirmButton";

export default function CustomRouteBooking() {
  // 예매 나가기 모달 상태관리
  const [exitConfimModalOpen, setExitConfimModalOpen] = useState(false);
  const exitButtonHandler = () => {
    setExitConfimModalOpen(true);
  };

  return (
    <>
      <ExitHeader text="버스예매" onClick={exitButtonHandler} />
      {/* 출퇴근 스위치역할 뷰.  */}
      <CommuteSwitcher />

      <Title>일자를 선택해 시각을 설정해주세요</Title>
      <CalendarView />

      <BottomContainer>
        <InfoTextBox>
          <InfoIcon />
          <DetailText>탑승권은 2일 전까지 예매 가능해요.</DetailText>
        </InfoTextBox>

        <TotalEditableViewButton>
          <ButtonTitle>선택한 일정</ButtonTitle>
          <CountViewBox>
            <ScheduleCount>-</ScheduleCount>
            <ChevronRightIcon />
          </CountViewBox>
        </TotalEditableViewButton>

        <ConfirmButtonWrapper>
          <ConfirmButton text="선택 일정 최종 확인하기" />
        </ConfirmButtonWrapper>
      </BottomContainer>
    </>
  );
}
