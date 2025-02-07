import BottomOverlayModal from "@/pages/BusBooking/Components/BottomOverlayModal";
import {
  CommuteType,
  OverlayBottomModalType,
} from "@/pages/BusBooking/types/commuteType";
import { useState } from "react";
import * as S from "./styles";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import CancelButton from "@/components/designSystem/Button/OutlineButton";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "react-router-dom";

interface TimeViewBottomModalProps {
  commuteType: CommuteType;
  isEditablTimeViewModalOpen: boolean;
  setIsEditablTimeViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: OverlayBottomModalType;
}

const tempData = [
  ["2월 26일 수요일", "11:00"],
  ["2월 26일 수요일", "11:00"],
  ["2월 26일 수요일", "11:00"],
  ["2월 26일 수요일", "11:00"],
];
export default function TimeViewBottomModal({
  commuteType,
  isEditablTimeViewModalOpen,
  setIsEditablTimeViewModalOpen,
  modalType,
}: TimeViewBottomModalProps) {
  const editIconHandler = () => {
    setIsEditablTimeViewModalOpen(false);
    // 해당 시간에 해당하는 모달 open.
  };

  const navigate = useNavigate();
  return (
    <BottomOverlayModal
      isOpen={isEditablTimeViewModalOpen}
      onClose={() => setIsEditablTimeViewModalOpen(false)}>
      <S.ModalHeader>
        선택한 일정 <S.SelectedCount>5</S.SelectedCount>
      </S.ModalHeader>

      <S.SelectedScheduleWrapper>
        <S.SubHeader>
          <S.DateTitle>날짜</S.DateTitle>
          <S.ArrivalTime>
            {commuteType === "등교" ? "학교 도착 시각" : "집으로 출발 시각"}
          </S.ArrivalTime>
        </S.SubHeader>
        {tempData.map(([dateInfo, time]) => (
          <S.ScheduleBox>
            <S.DateInfo>{dateInfo}</S.DateInfo>
            <S.TimeInfo>
              <S.Time>{time}</S.Time>
              {modalType === "editable" && (
                <S.EditIconWrapper onClick={editIconHandler}>
                  <ChevronRightIcon size={20} />
                </S.EditIconWrapper>
              )}
            </S.TimeInfo>
          </S.ScheduleBox>
        ))}
      </S.SelectedScheduleWrapper>

      {modalType === "lastStep" && (
        <S.ButtonBox>
          <CancelButton
            text="이전"
            onClick={() => setIsEditablTimeViewModalOpen(false)}
          />
          <SolidButton
            text="선택하기"
            onClick={() => navigate("/payment/reservation")}
          />
        </S.ButtonBox>
      )}
    </BottomOverlayModal>
  );
}
