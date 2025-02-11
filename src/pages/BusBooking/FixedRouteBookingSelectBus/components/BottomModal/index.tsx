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
type RouteInfo = {
  busId: number;
  time: string;
  departure: string;
  location: string;
  busNumber: string;
  remainSeat: string;
  totalPeople: string;
};

interface BusSelectBottomModalProps {
  busInfoArray: RouteInfo[];
  selectedBusCardId: number;
  setSelectedBusCardId: React.Dispatch<React.SetStateAction<number>>;
}
export default function BusSelectBottomModal({
  busInfoArray,
  selectedBusCardId,
  setSelectedBusCardId,
}: BusSelectBottomModalProps) {
  const navigate = useNavigate();

  return (
    <BottomModal showBottomSheet={true}>
      <BusCardTitle>
        <Title>탑승할 버스를 선택해주세요</Title>
      </BusCardTitle>

      <BusCardWrapper>
        {busInfoArray.map((data) => (
          <BusSelectionCard
            key={data.departure}
            onClick={() => setSelectedBusCardId(data.busId)}
            $isSelected={selectedBusCardId === data.busId}>
            <Time>
              <TimeValue>{data.time}</TimeValue>
              <DepartOrArrival>{data.departure}</DepartOrArrival>
            </Time>
            <LocationText>{data.location}</LocationText>
            <BusInfo>
              <BusNo>
                <BusIcon />
                <BusNumber>{data.busNumber}</BusNumber>
              </BusNo>
              <PeopleInfo>
                <RemainSeat>{data.remainSeat}</RemainSeat>
                <TotalSeat>/{data.totalPeople}명</TotalSeat>
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
