import BottomOverlayModal from "@/pages/BusBooking/Components/BottomOverlayModal";
import { CommuteType } from "@/pages/BusBooking/types/commuteType";
import { useRef, useState } from "react";
import * as S from "./styles";
import CancelButton from "@/components/designSystem/Button/OutlineButton";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import InfoIcon from "@/components/designSystem/Icons/InfoIcon";
import { colors } from "@/styles/colors";
import DayRepeatBoxIcon from "@/components/designSystem/Icons/DayRepeatBoxIcon";
import DayRepeatCheckIcon from "@/components/designSystem/Icons/DayRepeatCheckIcon";

import TimeWheel, { TimeWheelHandle } from "@/components/TimePickerWheel";
import {
  TimeSchedule,
  TimeScheduleAction,
} from "@/pages/BusBooking/store/types";
import { formatDate, parseTime } from "@/utils/calendar/calendarUtils";
import { timeScheduleActions } from "@/pages/BusBooking/store/actions";

interface selectedDateType {
  month: number;
  year: number;
  day: number;
}
interface SelectTimeBottomModalProps {
  selectedDate: selectedDateType; // 모달에서 현재 선택된 시간
  selectedTimeSchedule: TimeSchedule; // 총 반영된 선택된 시간
  dispatch: React.Dispatch<TimeScheduleAction>; // 선택시, 업데이트에 사용할 dispatch
  commuteType: CommuteType;
  isTimeSelectModalOpen: boolean;
  setIsTimeSelectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectTimeBottomModal({
  selectedTimeSchedule,
  dispatch,
  selectedDate,
  commuteType,
  isTimeSelectModalOpen,
  setIsTimeSelectModalOpen,
}: SelectTimeBottomModalProps) {
  const [repeatIconToggle, setRepeatIconToggle] = useState(false);

  const timeWheelRef = useRef<TimeWheelHandle>(null);

  const handleConfirm = () => {
    if (timeWheelRef.current) {
      const selectedTime = timeWheelRef.current.getSelectedTime();
      console.log(
        `${selectedTime.amPm} ${selectedTime.hour}:${selectedTime.minute}`
      );
      dispatch(
        timeScheduleActions.setSingleTime(
          selectedDate.year,
          selectedDate.month + 1,
          selectedDate.day,
          parseTime(selectedTime)
        )
      );
      if (repeatIconToggle) {
        dispatch(
          timeScheduleActions.setRepeatingDays(
            selectedDate.year,
            selectedDate.month + 1,
            selectedDate.day,
            parseTime(selectedTime),
            commuteType
          )
        );
      }
    }
  };

  const handleCancel = () => {
    dispatch(
      timeScheduleActions.removeSingleTime(
        selectedDate.year,
        selectedDate.month + 1,
        selectedDate.day
      )
    );
  };

  return (
    <BottomOverlayModal
      isOpen={isTimeSelectModalOpen}
      onClose={() => {
        setIsTimeSelectModalOpen(false);
      }}>
      <S.ModalHeader>
        {commuteType === "등교"
          ? "도착 시각을 선택해주세요"
          : "출발 시각을 선택해주세요"}
      </S.ModalHeader>
      <S.SubHeader>
        <S.DateTitle>날짜</S.DateTitle>
        <S.ArrivalTime>
          {commuteType === "등교" ? "학교 도착 시각" : "집으로 출발 시각"}
        </S.ArrivalTime>
      </S.SubHeader>

      <S.SelectTimeInfo>
        <S.DateText>{formatDate(selectedDate)}</S.DateText>
        <S.SelectTimeBox>
          <S.DayTime>오전</S.DayTime>
          <S.TimeText>11: 00</S.TimeText>
        </S.SelectTimeBox>
      </S.SelectTimeInfo>
      <S.TimePickerWheel></S.TimePickerWheel>

      <TimeWheel ref={timeWheelRef} />

      <S.DateRepeatSelectBox>
        <S.DateRepeatText>이 시각 요일 반복</S.DateRepeatText>
        <S.CheckBox onClick={() => setRepeatIconToggle((prev) => !prev)}>
          <DayRepeatBoxIcon
            fill={repeatIconToggle ? colors.orange900 : colors.gray40}
          />
          <DayRepeatCheckIcon />
        </S.CheckBox>
      </S.DateRepeatSelectBox>

      <S.DetailInfo>
        <InfoIcon />
        <S.InfoText>
          반복 요일에 시각이 자동 설정되지만,<br></br> 원하는 경우 일자를 선택해
          변경할 수 있어요.
        </S.InfoText>
      </S.DetailInfo>

      <S.ButtonBox>
        <CancelButton
          text="날짜 선택 해제"
          onClick={() => {
            setIsTimeSelectModalOpen(false);
            handleCancel();
          }}
        />
        <SolidButton
          text="선택하기"
          onClick={() => {
            setIsTimeSelectModalOpen(false);
            handleConfirm();
          }}
        />
      </S.ButtonBox>
    </BottomOverlayModal>
  );
}
