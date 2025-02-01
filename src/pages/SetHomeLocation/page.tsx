import SetLocationHomeHeader from "./components/Header";
import SetLocationHomeMap from "./components/MapWrapper";
import SetLocationBottomModal from "./components/BottomModal";
import { useState } from "react";
// import { useHomeLocation } from "@/hooks/setHomeLocation/useHomeLocation";
export default function SetHomeLocation() {
  // api 요청 후, 온보딩에서 지정한 주소를 지도 center위치로,
  // 별칭 string과 도로명 주소를 props로 전달한다.

  //  위도 + 별칭 + 도로명 주소

  //   const { homeLocationInfo, putHomeLocationMutation } = useHomeLocation();
  //   const [roadAddress, setRoadAddress] = useState<string | null>(
  //     homeLocationInfo.data?.data.address
  //   );
  const [roadAddress, setRoadAddress] = useState<string | null>(
    "서울 강남구 논현로 131길 7"
  );

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  //   const initHomePosition = homeLocationInfo.data?.data.position;
  const initHomePosition = {
    lat: 37.514219, // 학동역 위도
    lng: 127.031694, // 학동역 경도
  };
  return (
    <>
      <SetLocationHomeHeader />
      <SetLocationHomeMap
        userHomeCoordinate={initHomePosition}
        setRoadAddress={setRoadAddress}
        setShowBottomSheet={setShowBottomSheet}
      />
      <SetLocationBottomModal
        roadAddress={roadAddress}
        showBottomSheet={showBottomSheet}
      />
    </>
  );
}
