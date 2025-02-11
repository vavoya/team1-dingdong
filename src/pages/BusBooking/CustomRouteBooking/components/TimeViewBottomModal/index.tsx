import BottomOverlayModal from "@/pages/BusBooking/Components/BottomOverlayModal";
import {
  CommuteType,
  OverlayBottomModalType,
} from "@/pages/BusBooking/types/commuteType";

import * as S from "./styles";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import CancelButton from "@/components/designSystem/Button/OutlineButton";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "react-router-dom";
import {
  convertIsoToDateObject,
  convertToFormattedTime,
} from "@/utils/calendar/timeViewBottomModalUtil";

import { selectedDateType } from "../../types/selectedDateType";

interface TimeViewBottomModalProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<selectedDateType>>;
  setIsTimeSelectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commuteType: CommuteType;
  isEditablTimeViewModalOpen: boolean;
  setIsEditablTimeViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: OverlayBottomModalType;
  selectedTimeSchduleArray: string[];
}

// const tempData = [
//   ["2월 26일 수요일", "11:00"],
//   ["2월 26일 수요일", "11:00"],
//   ["2월 26일 수요일", "11:00"],
//   ["2월 26일 수요일", "11:00"],
// ];
export default function TimeViewBottomModal({
  setSelectedDate,
  setIsTimeSelectModalOpen,
  commuteType,
  isEditablTimeViewModalOpen,
  setIsEditablTimeViewModalOpen,
  modalType,
  selectedTimeSchduleArray,
}: TimeViewBottomModalProps) {
  const navigate = useNavigate();

  const editIconHandler = (timeScheduleIndex: number) => {
    setSelectedDate(
      convertIsoToDateObject(selectedTimeSchduleArray[timeScheduleIndex])
    );
    setIsTimeSelectModalOpen(true); // 다시 선택 모달 켜기.
    setIsEditablTimeViewModalOpen(false);
    // 해당 시간에 해당하는 모달 open.
  };

  return (
    <BottomOverlayModal
      isOpen={isEditablTimeViewModalOpen}
      onClose={() => {
        setIsEditablTimeViewModalOpen(false);
      }}>
      <S.ModalHeader>
        선택한 일정
        <S.SelectedCount>{selectedTimeSchduleArray.length}</S.SelectedCount>
      </S.ModalHeader>

      <S.SelectedScheduleWrapper>
        <S.SubHeader>
          <S.DateTitle>날짜</S.DateTitle>
          <S.ArrivalTime>
            {commuteType === "등교" ? "학교 도착 시각" : "집으로 출발 시각"}
          </S.ArrivalTime>
        </S.SubHeader>
        {convertToFormattedTime(selectedTimeSchduleArray).map(
          ([dateInfo, time], timeScheduleIndex) => (
            <S.ScheduleBox key={dateInfo}>
              <S.DateInfo>{dateInfo}</S.DateInfo>
              <S.TimeInfo>
                <S.Time>{time.toString().padStart(2, "0")}</S.Time>
                {modalType === "editable" && (
                  <S.EditIconWrapper
                    onClick={() => editIconHandler(timeScheduleIndex)}>
                    <ChevronRightIcon size={20} />
                  </S.EditIconWrapper>
                )}
              </S.TimeInfo>
            </S.ScheduleBox>
          )
        )}
      </S.SelectedScheduleWrapper>

      {modalType === "lastStep" && (
        <S.ButtonBox>
          <CancelButton
            text="이전"
            onClick={() => setIsEditablTimeViewModalOpen(false)}
          />
          <SolidButton
            text="결제하기"
            onClick={() => navigate("/payment/reservation")}
          />
        </S.ButtonBox>
      )}
    </BottomOverlayModal>
  );
}
