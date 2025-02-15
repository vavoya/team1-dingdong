import { useEffect } from "react";
import {
  HomePinContainer,
  HomePinMark,
  HomePinTitle,
  MapWrapper,
} from "./styles";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader.ts";

import PinIcon from "@/components/designSystem/Icons/PinIcon";
import { colors } from "@/styles/colors";
import HomeIcon from "@/components/designSystem/Icons/HomeIcon";

import { useAddress } from "../../hooks/useCoodinateToAddress";
import { usePinDrag } from "../../hooks/usePinDrag";
import { DragPin } from "../DragPin";

interface SetLocationHomeMapProps {
  userHomeCoordinate: {
    lat: number;
    lng: number;
  };
  setStationInfo: React.Dispatch<
    React.SetStateAction<{ latitude: number; longitude: number }>
  >; // 역 정보 변경.
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>; // 핀을 움직여서, 바텀 시트를 보여준다.
  setRoadAddress: React.Dispatch<React.SetStateAction<string | null>>; // 도로명 주소 변경.
}

export default function SetLocationHomeMap({
  setStationInfo,
  userHomeCoordinate,
  setShowBottomSheet,
  setRoadAddress,
}: SetLocationHomeMapProps) {
  useKakaoLoader();

  // 탑승지와 집 위치 초기에 동일하게 설정.
  const { pinPosition, mapRef, onMouseDown, onMouseUp } = usePinDrag({
    initialPosition: userHomeCoordinate,
    onPositionChange: () => setShowBottomSheet(true),
  });

  useAddress(pinPosition, setRoadAddress);

  useEffect(() => {
    setStationInfo({ latitude: pinPosition.lat, longitude: pinPosition.lng });
  }, [pinPosition, setStationInfo]);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);
    return () => document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseUp]);

  return (
    <MapWrapper>
      <Map
        center={userHomeCoordinate}
        style={{ width: "100%", height: "100%" }}
        level={6}
        onCreate={(map) => {
          mapRef.current = map;
        }}
      >
        <CustomOverlayMap position={pinPosition} yAnchor={1}>
          <DragPin onMouseDown={onMouseDown} />
        </CustomOverlayMap>

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
