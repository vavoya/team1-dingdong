import { useEffect, useRef, useState } from "react";
import {
  HomePinContainer,
  HomePinMark,
  HomePinTitle,
  MapWrapper,
} from "./styles";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader";
import PinIcon from "@/components/designSystem/Icons/PinIcon";
import { colors } from "@/styles/colors";
import HomeIcon from "@/components/designSystem/Icons/HomeIcon";
import { useAddress } from "../../hooks/useCoodinateToAddress";
import { DragPin } from "../DragPin";

interface SetLocationHomeMapProps {
  userHomeCoordinate: {
    lat: number;
    lng: number;
  };
  setStationInfo: React.Dispatch<
    React.SetStateAction<{ latitude: number; longitude: number }>
  >;
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setRoadAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SetLocationHomeMap({
  setStationInfo,
  userHomeCoordinate,
  setShowBottomSheet,
  setRoadAddress,
}: SetLocationHomeMapProps) {
  useKakaoLoader();
  const mapRef = useRef<kakao.maps.Map>();
  const [centerPosition, setCenterPosition] = useState(userHomeCoordinate);

  useAddress(centerPosition, setRoadAddress);

  // 지도 중심 좌표가 변경될 때 호출되는 함수
  const handleCenterChanged = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const newPosition = {
      lat: center.getLat(),
      lng: center.getLng(),
    };

    setCenterPosition(newPosition);
    setStationInfo({
      latitude: newPosition.lat,
      longitude: newPosition.lng,
    });
    setShowBottomSheet(true);
  };

  return (
    <MapWrapper>
      <Map
        center={userHomeCoordinate}
        style={{ width: "100%", height: "100%" }}
        level={4}
        onCreate={(map) => {
          mapRef.current = map;
          kakao.maps.event.addListener(
            map,
            "center_changed",
            handleCenterChanged
          );
        }}
      >
        {/* 중앙 고정 핀 */}
        <DragPin />

        {/* 집 위치 마커 */}
        <CustomOverlayMap position={userHomeCoordinate}>
          <HomePinContainer>
            <HomePinMark>
              <HomePinTitle>
                <HomeIcon fill={colors.white} />
              </HomePinTitle>
            </HomePinMark>
            <PinIcon stroke={colors.orange900} />
          </HomePinContainer>
        </CustomOverlayMap>
      </Map>
    </MapWrapper>
  );
}
