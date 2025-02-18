import SetLocationHomeMap from "./components/MapWrapper";
import SetLocationBottomModal from "./components/BottomModal";
import { useState } from "react";
import PopHeader from "@/components/Headers/PopHeader";
import { useLoaderData } from "react-router-dom";
import { getAddressFromCoords } from "@/utils/geoLocation/coordinateToAddress";
import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader";
// import { useHomeLocation } from "@/hooks/setHomeLocation/useHomeLocation";

export interface LocationInfo {
  latitude: number;
  longitude: number;
}
export default function SetHomeLocation() {
  useKakaoLoader();
  // api 요청 후, 온보딩에서 지정한 주소를 지도 center위치로,
  // 별칭 string과 도로명 주소를 props로 전달한다.

  //  위도 + 별칭 + 도로명 주소

  //   const { homeLocationInfo, putHomeLocationMutation } = useHomeLocation();
  //   const [roadAddress, setRoadAddress] = useState<string | null>(
  //     homeLocationInfo.data?.data.address
  //   );

  const [houseAndStationInfo] = useLoaderData();
  console.log(houseAndStationInfo, "houseAndStationInfo");
  const { houseInfo, stationInfo: stationInfoServer } = houseAndStationInfo;

  const [roadAddress, setRoadAddress] = useState<string | null>("");
  const [stationInfo, setStationInfo] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  // const initHomePosition = {
  //   lat: stationInfoServer.latitude,
  //   lng: stationInfoServer.longitude,
  // };
  const initHomePosition = {
    lat: houseInfo.latitude,
    lng: houseInfo.longitude,
  };

  return (
    <>
      <PopHeader text="탑승지 위치 설정" />
      <SetLocationHomeMap
        userHomeCoordinate={initHomePosition}
        setStationInfo={setStationInfo}
        setRoadAddress={setRoadAddress}
        setShowBottomSheet={setShowBottomSheet}
      />
      <SetLocationBottomModal
        stationInfo={stationInfo}
        roadAddress={roadAddress}
        showBottomSheet={showBottomSheet}
      />
    </>
  );
}
