import { getAddressFromCoords } from "@/utils/geoLocation/coordinateToAddress";
import { useEffect } from "react";
// 좌표에서 주소로 바꿔주고 렌더링을 합니다.
export const useAddress = (
  position: { lat: number; lng: number },
  setRoadAddress: React.Dispatch<React.SetStateAction<string | null>>
) => {
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddressFromCoords(position.lat, position.lng);
        setRoadAddress(address);
      } catch (error) {
        console.error(error);
        setRoadAddress(null);
      }
    };

    fetchAddress();
  }, [position, setRoadAddress]);
};
