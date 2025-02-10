import { useEffect, useRef } from "react";
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

interface SetLocationHomeMapProps {
  userHomeCoordinate: {
    lat: number;
    lng: number;
  };
  setShowBottomSheet: React.Dispatch<React.SetStateAction<boolean>>; // 핀을 움직여서, 바텀 시트를 보여준다.
}

export default function BusSelectMap({
  userHomeCoordinate,
  setShowBottomSheet,
}: SetLocationHomeMapProps) {
  useKakaoLoader();

  const mapRef = useRef<kakao.maps.Map>();
  return (
    <MapWrapper>
      <Map
        center={userHomeCoordinate}
        style={{ width: "100%", height: "100%" }}
        level={6}
        onCreate={(map) => {
          mapRef.current = map;
        }}>
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
