import { useState } from "react";

import ExitHeader from "@/components/Headers/ExitHeader";
import BusSelectMap from "./components/MapWrapper";
import BusSelectBottomModal from "./components/BottomModal";
import ArrowRightIcon from "@/components/designSystem/Icons/FixedRouteBusBooking/ArrowRightIcon";
import {
  Arrival,
  BusTicketInfo,
  Departure,
  HeaderText,
  RouteMarkHeader,
} from "./styles";

export default function FixedRouteBookingSelectBus() {
  const [showBottomSheet, setShowBottomSheet] = useState(true);

  const initHomePosition = {
    lat: 37.514219, // 학동역 위도
    lng: 127.031694, // 학동역 경도
  };

  const [selectedBusCardId, setSelectedBusCardId] = useState(0);
  const busTicketInfo = "02.22(수) 13:00 출발";
  return (
    <>
      <ExitHeader text="함께 타기" />
      <RouteMarkHeader>
        <HeaderText>
          <Departure>집</Departure>
          <ArrowRightIcon />
          <Arrival>학교</Arrival>
        </HeaderText>
        <BusTicketInfo>{busTicketInfo}</BusTicketInfo>
      </RouteMarkHeader>
      <BusSelectMap
        userHomeCoordinate={initHomePosition}
        setShowBottomSheet={setShowBottomSheet}
      />
      <BusSelectBottomModal
        selectedBusCardId={selectedBusCardId}
        setSelectedBusCardId={setSelectedBusCardId}
        showBottomSheet={showBottomSheet}
      />
    </>
  );
}
