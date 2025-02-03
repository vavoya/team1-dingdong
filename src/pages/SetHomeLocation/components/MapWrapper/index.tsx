import { useCallback, useEffect, useRef, useState } from "react";
import {
  HomePinContainer,
  HomePinMark,
  HomePinTitle,
  MapWrapper,
  PinContainer,
  PinDescription,
  PinMark,
  PinTitle,
} from "./styles";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader.ts";

import PinIcon from "@/components/designSystem/Icons/PinIcon";
import { getAddressFromCoords } from "@/utils/geoLocation/coordinateToAddress";
import { colors } from "@/styles/colors";

interface SetLocationHomeMapProps {
  userHomeCoordinate: {
    lat: number;
    lng: number;
  };
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>; // 핀을 움직여서, 바텀 시트를 보여준다.
  setRoadAddress: React.Dispatch<React.SetStateAction<string | null>>; // 도로명 주소 변경.
}

export default function SetLocationHomeMap({
  userHomeCoordinate,
  setShowBottomSheet,
  setRoadAddress,
}: SetLocationHomeMapProps) {
  useKakaoLoader();
  const startPoint = useRef({ x: 0, y: 0 });
  const overlayPoint = useRef<kakao.maps.Point>();
  const mapRef = useRef<kakao.maps.Map>();
  const [pinPosition, setPinPosition] = useState(userHomeCoordinate);

  const onPinMove = useCallback((e: MouseEvent) => {
    // 이벤트 버블링 현상이 발생하지 않도록 방지 합니다.
    e.preventDefault();
    const map = mapRef.current;
    if (!map || !overlayPoint.current) return;

    const proj = map.getProjection(); // 지도 객체로 부터 화면픽셀좌표, 지도좌표간 변환을 위한 MapProjection 객체를 얻어옵니다
    const deltaX = startPoint.current.x - e.clientX; // mousedown한 픽셀좌표에서 mousemove한 좌표를 빼서 실제로 마우스가 이동된 픽셀좌표를 구합니다
    const deltaY = startPoint.current.y - e.clientY;
    // mousedown됐을 때의 커스텀 오버레이의 좌표에 실제로 마우스가 이동된 픽셀좌표를 반영합니다
    const newPoint = new kakao.maps.Point(
      overlayPoint.current.x - deltaX,
      overlayPoint.current.y - deltaY
    );
    // 계산된 픽셀 좌표를 지도 컨테이너에 해당하는 지도 좌표로 변경합니다
    const newPos = proj.coordsFromContainerPoint(newPoint);

    // 커스텀 오버레이의 좌표를 설정합니다
    setPinPosition({
      lat: newPos.getLat(),
      lng: newPos.getLng(),
    });
    setShowBottomSheet(true);
  }, []);

  const onMouseUp = useCallback(() => {
    // MouseUp 이벤트 발생시 기존 mousemove 이벤트를 제거 합니다.
    document.removeEventListener("mousemove", onPinMove);
  }, [onPinMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // 이벤트 버블링 현상이 발생하지 않도록 방지 합니다.
      e.preventDefault();

      const map = mapRef.current;
      if (!map) return;
      const proj = map.getProjection();

      kakao.maps.event.preventMap();

      startPoint.current.x = e.clientX;
      startPoint.current.y = e.clientY;

      overlayPoint.current = proj.containerPointFromCoords(
        new kakao.maps.LatLng(pinPosition.lat, pinPosition.lng)
      );

      document.addEventListener("mousemove", onPinMove);
    },
    [onPinMove, pinPosition.lat, pinPosition.lng]
  );

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const address = await getAddressFromCoords(lat, lng);
      setRoadAddress(address);
      return address; // 도로명 주소 반환.
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAddress(pinPosition.lat, pinPosition.lng);
  }, [pinPosition]);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp, onMouseDown]);

  return (
    <MapWrapper>
      <Map // 지도를 표시할 Container
        center={userHomeCoordinate}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={6} // 지도의 확대 레벨 (약 2km)
        onCreate={(map) => {
          mapRef.current = map;
        }}>
        <CustomOverlayMap position={pinPosition} yAnchor={1}>
          <PinContainer onMouseDown={onMouseDown}>
            <PinMark>
              <PinTitle>탑승지</PinTitle>
              <PinDescription>
                정확한 승하차 위치를 설정해주세요.
              </PinDescription>
            </PinMark>
            <PinIcon />
          </PinContainer>
        </CustomOverlayMap>

        <CustomOverlayMap position={userHomeCoordinate}>
          <HomePinContainer>
            <HomePinMark>
              <HomePinTitle>
                {/* 아래 부분은 수정 예정 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none">
                  <path
                    d="M9.63638 2.06361C9.28491 1.71214 8.71506 1.71214 8.36359 2.06361L2.06359 8.36361C1.71212 8.71508 1.71212 9.28493 2.06359 9.6364C2.41506 9.98787 2.98491 9.98787 3.33638 9.6364L3.59999 9.3728V15.3C3.59999 15.7971 4.00293 16.2 4.49999 16.2H6.29999C6.79704 16.2 7.19999 15.7971 7.19999 15.3V13.5C7.19999 13.0029 7.60293 12.6 8.09999 12.6H9.89999C10.397 12.6 10.8 13.0029 10.8 13.5V15.3C10.8 15.7971 11.2029 16.2 11.7 16.2H13.5C13.997 16.2 14.4 15.7971 14.4 15.3V9.3728L14.6636 9.6364C15.0151 9.98787 15.5849 9.98787 15.9364 9.6364C16.2879 9.28493 16.2879 8.71508 15.9364 8.36361L9.63638 2.06361Z"
                    fill={colors.gray90}
                  />
                </svg>
              </HomePinTitle>
            </HomePinMark>
            <PinIcon stroke={colors.orange900} />
          </HomePinContainer>
        </CustomOverlayMap>
      </Map>
    </MapWrapper>
  );
}
