import { useEffect, useRef } from "react";
import {
  Destination,
  EndPointText,
  HomePinContainer,
  HomePinMark,
  MapWrapper,
} from "./styles";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader.ts";
import PinIcon from "@/components/designSystem/Icons/PinIcon";
import { colors } from "@/styles/colors";
import LocationMarkerIcon from "@/components/designSystem/Icons/FixedRouteBusBooking/LocationMarker";
import EndPointPinMarkIcon from "@/components/designSystem/Icons/FixedRouteBusBooking/EndPointPinMarkIcon";
import useCurrentLocation from "@/hooks/useCurrentLoaction/useCurrentLocation";
import UserOverlay from "@/pages/BusTracker/components/UserOverlay";
import { CommuteType } from "@/pages/BusBooking/types/commuteType";

interface SetLocationHomeMapProps {
  commuteType: CommuteType;
  mapCenterLocation: {
    center: { lat: number; lng: number };
    isPanto: boolean;
  };
  locationToMarkOnMap: {
    startPoint: { lat: number; lng: number };
    endPoint: { lat: number; lng: number };
    userBusStop: { lat: number; lng: number };
  };
  locationName: string;
}

export default function BusSelectMap({
  mapCenterLocation,
  locationName,
  locationToMarkOnMap,
}: SetLocationHomeMapProps) {
  useKakaoLoader();
  const { startPoint, endPoint } = locationToMarkOnMap;
  const userLocation = useCurrentLocation();
  const mapRef = useRef<kakao.maps.Map | null>(null);

  // 📌 **onCreate를 사용해 mapRef 설정**
  const handleMapCreate = (map: kakao.maps.Map) => {
    mapRef.current = map;
    updateMapBounds();
  };

  // 📌 **지도 경계 업데이트 함수**
  const updateMapBounds = () => {
    if (mapRef.current && startPoint && endPoint) {
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(startPoint.lat, startPoint.lng));
      bounds.extend(new kakao.maps.LatLng(endPoint.lat, endPoint.lng));

      setTimeout(() => {
        // 76이나 77.5 같은 미세한 값으로 테스트
        mapRef.current?.setBounds(bounds, 76.8);
      }, 300);
    }
  };

  // 📌 **좌표가 변경될 때마다 setBounds 실행**
  useEffect(() => {
    updateMapBounds();
  }, [startPoint, endPoint]);

  // 📌 **화면 크기가 변경될 때도 setBounds 실행**
  useEffect(() => {
    const handleResize = () => {
      updateMapBounds();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MapWrapper>
      <Map
        id="map"
        center={mapCenterLocation.center}
        style={{ width: "100%", height: "100%" }}
        onCreate={handleMapCreate}>
        <CustomOverlayMap position={locationToMarkOnMap.userBusStop}>
          <HomePinContainer>
            <HomePinMark>
              <LocationMarkerIcon />
              <Destination>{locationName}</Destination>
            </HomePinMark>
            <PinIcon stroke={colors.gray90} />
          </HomePinContainer>
        </CustomOverlayMap>

        <CustomOverlayMap position={locationToMarkOnMap.endPoint}>
          <EndPointText>도착</EndPointText>
          <EndPointPinMarkIcon />
        </CustomOverlayMap>

        <UserOverlay lat={userLocation.lat} lng={userLocation.lng} />
      </Map>
    </MapWrapper>
  );
}
