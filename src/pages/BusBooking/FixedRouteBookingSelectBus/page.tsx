import { useEffect, useRef, useState } from "react";

import ExitHeader from "@/components/Headers/ExitHeader";
import BusSelectMap from "./components/MapWrapper";
import BusSelectBottomModal from "./components/BottomModal";
import ArrowRightIcon from "@/components/designSystem/Icons/FixedRouteBusBooking/ArrowRightIcon";
import {
  Arrival,
  BusSelectSection,
  BusTicketInfo,
  Departure,
  HeaderText,
  RouteMarkHeader,
} from "./styles";
import { useLocation } from "react-router-dom";
import { convertInfoToText } from "@/utils/calendar/fixedBusBookingUtils";
import LocateMeButton from "@/pages/BusTracker/components/LocateMeButton";
import useCurrentLocation from "@/hooks/useCurrentLoaction/useCurrentLocation";

export default function FixedRouteBookingSelectBus() {
  const location = useLocation();
  const data = location.state; // A페이지에서 전달받은 데이터
  console.log(data, "바뀐 것");

  const [selectedBusCardId, setSelectedBusCardId] = useState(1); // 첫번째 버스의 id넣기.
  const busTicketInfo = convertInfoToText(
    data.selectedDate,
    data.selectedHourMinute
  );

  const userLocation = useCurrentLocation();

  const [mapCenterLocation, setMapCenterLocation] = useState({
    // 지도의 초기 위치
    center: {
      lat: 37.123, //학동역
      lng: 127.123,
    },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });
  const mapJitter = useRef<number>(0.00000001);

  const startPoint = {
    lat: 37.514219, //학동역
    lng: 127.031746,
  };

  const endPoint = {
    lat: 37.4602, //서울대
    lng: 126.9517,
  };
  const busPath = [
    {
      lat: 37.123, //학동역
      lng: 127.123,
    },
    {
      lat: 37.4602, //서울대
      lng: 126.9517,
    },
  ];
  const userBusStop = {
    // 유저 승차지 또는 하자치 위치
    lat: 37.514219, //학동역
    lng: 127.031746,
  };
  const locationToMarkOnMap = {
    startPoint,
    endPoint,
    busPath,
    userBusStop,
  };
  useEffect(() => {
    // 현재 버스카드 id를 가지고 값을 fetch한다.
    // ex) startPoint, endPoint, busPath, 승차지, 하차지 이름 3가지 받기.
    setMapCenterLocation({ center: { ...startPoint }, isPanto: false });
  }, [selectedBusCardId]);

  const locationName = "학동역"; // 버스 카드를 누르면서 바뀌는 승차지,하차지 이름.
  return (
    <>
      <ExitHeader text="함께 타기" />
      <RouteMarkHeader>
        <HeaderText>
          <Departure>{data.commuteType === "등교" ? "집" : "학교"}</Departure>
          <ArrowRightIcon />
          <Arrival>{data.commuteType === "등교" ? "학교" : "집"}</Arrival>
        </HeaderText>
        <BusTicketInfo>
          {busTicketInfo}
          {data.commuteType === "등교" ? " 도착" : " 출발"}
        </BusTicketInfo>
      </RouteMarkHeader>
      <BusSelectMap
        commuteType={data.commuteType}
        mapCenterLocation={mapCenterLocation}
        locationToMarkOnMap={locationToMarkOnMap}
        locationName={locationName}
      />
      <BusSelectSection>
        <LocateMeButton
          onClick={() => {
            if (userLocation.lat !== -1 || userLocation.lng !== -1) {
              mapJitter.current *= -1;
              setMapCenterLocation({
                center: {
                  lat: userLocation.lat + mapJitter.current,
                  lng: userLocation.lng,
                },
                isPanto: true,
              });
            }
          }}
        />
        <BusSelectBottomModal
          busInfoArray={data.busInfoArray}
          selectedBusCardId={selectedBusCardId}
          setSelectedBusCardId={setSelectedBusCardId}
        />
      </BusSelectSection>
    </>
  );
}
