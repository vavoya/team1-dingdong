import SolidButton from "@/components/designSystem/Button/SolidButton";
import {
  BottomModal,
  BusSelectButtonStepWrapper,
  BusCardTitle,
  Title,
  BusSelectionCard,
  Time,
  TimeValue,
  DepartOrArrival,
  BusInfo,
  LocationText,
  BusNo,
  BusNumber,
  PeopleInfo,
  RemainSeat,
  TotalSeat,
  BusCardWrapper,
} from "./styles";

import OutlineButton from "@/components/designSystem/Button/OutlineButton";
import { useNavigate } from "react-router-dom";
import BusIcon from "@/components/designSystem/Icons/Home/BusIcon";
// import { useGetBusRouteCoordinates } from "@/hooks/BusBooking/useFixedBooking";

interface BusStop {
  name: string;
  time: string; // ISO 날짜 문자열
  longitude: number;
  latitude: number;
}

interface BusInfo {
  name: string;
  reservedSeat: number;
  totalSeat: number;
}

interface RouteInfo {
  busScheduleId: number;
  busStop: BusStop;
  busInfo: BusInfo;
}
type Points = { lat: number; lng: number };
interface BusSelectBottomModalProps {
  busPathPoints: Points[];
  busInfoArray: RouteInfo[];
  selectedBusCardIndex: number;
  setSelectedBusCardIndex: React.Dispatch<React.SetStateAction<number>>;
}
export default function BusSelectBottomModal({
  busPathPoints,
  busInfoArray,
  selectedBusCardIndex,
  setSelectedBusCardIndex,
}: BusSelectBottomModalProps) {
  const navigate = useNavigate();

  const convertISOToHourMinute = (ISODate: string) => {
    const date = new Date(ISODate);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };
  const { direction } = JSON.parse(
    sessionStorage.getItem("/fixed-bus-booking")!
  );
  // 출발, 도착
  const departOrArrival = direction === "TO_SCHOOL" ? "출발" : "도착";
  // 탑승, 하차
  const boardingOrGetOff = direction === "TO_SCHOOL" ? "탑승" : "하차";
  return (
    <BottomModal showBottomSheet={true}>
      <BusCardTitle>
        <Title>탑승할 버스를 선택해주세요</Title>
      </BusCardTitle>

      <BusCardWrapper>
        {busInfoArray.map((schedule, cardIndex) => (
          <BusSelectionCard
            key={schedule.busScheduleId}
            onClick={() => setSelectedBusCardIndex(cardIndex)}
            $isSelected={cardIndex === selectedBusCardIndex}
          >
            <Time>
              <TimeValue>
                {convertISOToHourMinute(schedule.busStop.time)}
              </TimeValue>
              <DepartOrArrival>{departOrArrival}</DepartOrArrival>
            </Time>
            <LocationText>
              {schedule.busStop.name} {boardingOrGetOff}
            </LocationText>

            <BusInfo>
              <BusNo>
                <BusIcon />
                <BusNumber>버스{schedule.busInfo.name}</BusNumber>
              </BusNo>
              <PeopleInfo>
                <RemainSeat>{schedule.busInfo.reservedSeat}</RemainSeat>
                <TotalSeat>/{schedule.busInfo.totalSeat}명</TotalSeat>
              </PeopleInfo>
            </BusInfo>
          </BusSelectionCard>
        ))}
      </BusCardWrapper>
      <BusSelectButtonStepWrapper>
        <OutlineButton text="이전" onClick={() => navigate(-1)} />
        <SolidButton
          text="다음"
          onClick={() => navigate("/payment/purchase")}
        />
      </BusSelectButtonStepWrapper>
    </BottomModal>
  );
}
