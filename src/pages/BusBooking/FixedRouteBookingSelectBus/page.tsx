import { useEffect, useMemo, useRef, useState } from "react";

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
import LocateMeButton from "@/pages/BusTracker/components/LocateMeButton";
import useCurrentLocation from "@/hooks/useCurrentLoaction/useCurrentLocation";
import {
  useGetAvailableBusInfo,
  useGetBusPath,
} from "@/hooks/BusBooking/useFixedBooking";
import { useLoaderData } from "react-router-dom";
import { ISOStringToDateDayFormat } from "@/utils/fixedBusBooking/ISOStringToDateDay";

const BUS_INFO_ARRAY = [
  // 임시 값.
  {
    busScheduleId: 1,
    busStop: {
      name: "학동역",
      time: "2025-02-15T03:00:00Z",
      longitude: 127.0316881,
      latitude: 37.514298092, // 위도
    },
    busInfo: {
      name: "01",
      reservedSeat: 12,
      totalSeat: 15,
    },
  },
  {
    busScheduleId: 2,
    busStop: {
      name: "신사역",
      time: "2025-02-15T04:30:00Z",
      longitude: 127.02059,
      latitude: 37.5165612,
    },
    busInfo: {
      name: "42",
      reservedSeat: 10,
      totalSeat: 15,
    },
  },
];

const BUS_PATH = [
  [
    {
      lat: 37.514298092, //학동역
      lng: 127.0316881,
    },
    {
      lat: 37.50583, // 고터역
      lng: 127.00444,
    },
    { lat: 37.4770008, lng: 126.9816814 }, // 사당역

    {
      lat: 37.4602, //서울대
      lng: 126.9517,
    },
  ],
  [
    {
      lat: 37.5165612, //신사역
      lng: 127.02059,
    },
    {
      lat: 37.50583, // 고터역
      lng: 127.00444,
    },
    { lat: 37.4770008, lng: 126.9816814 }, // 사당역
    {
      lat: 37.4602, //서울대
      lng: 126.9517,
    },
  ],
];

export default function FixedRouteBookingSelectBus() {
  const userLocation = useCurrentLocation();

  const { schoolLatitude, schoolLongitude } = useLoaderData()[0]; // 집...(즉 탑승지)

  const { stationInfo: originalUserStation } = useLoaderData()[1]; // 집...(즉 탑승지)

  // const schoolLocation = { latitue: 37.4602, longitude: 126.9517 }; // 임시 값. 서울대

  const { direction, timeSchedule } = JSON.parse(
    sessionStorage.getItem("/fixed-bus-booking")!
  ); // 이전 예약 정보.
  const commuteType = direction === "TO_SCHOOL" ? "등교" : "하교";

  // 버스 정보 불러오기.
  const busInfo = useGetAvailableBusInfo(direction, timeSchedule);
  const busInfoArray =
    busInfo.data?.data.result.length > 0
      ? busInfo.data?.data.result
      : BUS_INFO_ARRAY;

  const [selectedBusCardIndex, setSelectedBusCardIndex] = useState(0); // 첫번째 버스의 id넣기.
  const [mapCenterLocation, setMapCenterLocation] = useState({
    // 지도의 초기 위치
    center: {
      lat: busInfoArray[selectedBusCardIndex].busStop.latitude, //학동역
      lng: busInfoArray[selectedBusCardIndex].busStop.longitude,
    },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  const [busStopName, setBusStopName] = useState(
    busInfoArray[selectedBusCardIndex].busStop.name
  ); // 버스 카드를 누르면서 바뀌는 승차지,하차지 이름.

  const mapJitter = useRef<number>(0.00000001);

  const [startPoint, setStartPoint] = useState({
    lat: originalUserStation.latitude as number,
    lng: originalUserStation.longitude as number,
  });
  const [endPoint, setEndPoint] = useState({
    lat: schoolLatitude,
    lng: schoolLongitude,
  });

  const userBusStop = {
    // 유저 승차지 또는 하자치 위치
    lat: busInfoArray[selectedBusCardIndex].busStop.latitude,
    lng: busInfoArray[selectedBusCardIndex].busStop.longitude,
  };

  useEffect(() => {
    // 현재 버스카드 id를 가지고 값을 fetch한다.
    // ex) startPoint, endPoint, busPath, 승차지, 하차지 이름 3가지 받기.
    setMapCenterLocation({ center: { ...userBusStop }, isPanto: false });
  }, [selectedBusCardIndex]);

 

  const selectedBusPath = useGetBusPath(
    busInfoArray[selectedBusCardIndex].busScheduleId
  );
  

  const selectedBusPathPoints =
    selectedBusPath.data?.data?.points.length > 0
      ? selectedBusPath.data?.data.points
      : BUS_PATH[selectedBusCardIndex];

  const [busPathPoints, setBusPathPoints] = useState(selectedBusPathPoints);

  useEffect(() => {
    setBusPathPoints(selectedBusPathPoints);
  }, [selectedBusPath.data]);

  const clientDataList = useMemo(
    () =>
      // lattitude, longitude 변수 => lat, lng 카카오 맵에 맞게 변환.
      busPathPoints.map(
        ({ latitude, longitude }: { latitude: number; longitude: number }) => ({
          lat: latitude,
          lng: longitude,
        })
      ),
    [busPathPoints] // serverDataList가 변경될 때만 다시 계산
  );

  const locationToMarkOnMap = {
    startPoint: clientDataList[0],
    endPoint: clientDataList[clientDataList.length - 1],
    busPath: clientDataList,
    userBusStop,
  };

  useEffect(() => {
    setBusPathPoints(selectedBusPathPoints);
    setBusStopName(busInfoArray[selectedBusCardIndex].busStop.name);
  }, [selectedBusCardIndex]);

  useEffect(() => {
    setStartPoint(busPathPoints[0]);
    setEndPoint(busPathPoints[busPathPoints.length - 1]);
  }, [busPathPoints]);

  return (
    <>
      <ExitHeader text="함께 타기" />
      <RouteMarkHeader>
        <HeaderText>
          <Departure>{commuteType === "등교" ? "집" : "학교"}</Departure>
          <ArrowRightIcon />
          <Arrival>{commuteType === "등교" ? "학교" : "집"}</Arrival>
        </HeaderText>
        <BusTicketInfo>
          {ISOStringToDateDayFormat(timeSchedule)}
          {commuteType === "등교" ? "도착" : "출발"}
        </BusTicketInfo>
      </RouteMarkHeader>
      <BusSelectMap
        commuteType={commuteType}
        mapCenterLocation={mapCenterLocation}
        locationToMarkOnMap={locationToMarkOnMap}
        locationName={busStopName}
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
          busPathPoints={busPathPoints}
          busInfoArray={busInfoArray}
          selectedBusCardIndex={selectedBusCardIndex}
          setSelectedBusCardIndex={setSelectedBusCardIndex}
        />
      </BusSelectSection>
    </>
  );
}
