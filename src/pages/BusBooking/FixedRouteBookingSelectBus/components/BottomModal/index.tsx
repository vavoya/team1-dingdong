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

interface BusSelectBottomModalProps {
  selectedBusCardId: number;
  setSelectedBusCardId: React.Dispatch<React.SetStateAction<number>>;
  showBottomSheet: boolean;
}
export default function BusSelectBottomModal({
  selectedBusCardId,
  setSelectedBusCardId,
  showBottomSheet,
}: BusSelectBottomModalProps) {
  const navigate = useNavigate();

  const busSelectionArray = [
    {
      time: "12:00",
      departure: "출발",
      location: "학동역 탑승",
      busNumber: "버스01",
      remainSeat: "5",
      totalPeople: "25",
      //   각 경로 정보가 존재함.
    },
    {
      time: "12:10",
      departure: "출발",
      location: "신사역 탑승",
      busNumber: "버스01",
      remainSeat: "5",
      totalPeople: "25",
    },
    {
      time: "12:10",
      departure: "출발",
      location: "신사역 탑승",
      busNumber: "버스01",
      remainSeat: "5",
      totalPeople: "25",
    },
  ];
  return (
    <BottomModal showBottomSheet={showBottomSheet}>
      <BusCardTitle>
        <Title>탑승할 버스를 선택해주세요</Title>
      </BusCardTitle>

      <BusCardWrapper>
        {busSelectionArray.map((data, i) => (
          <BusSelectionCard
            key={data.departure}
            onClick={() => setSelectedBusCardId(i)}
            $isSelected={selectedBusCardId === i}>
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
