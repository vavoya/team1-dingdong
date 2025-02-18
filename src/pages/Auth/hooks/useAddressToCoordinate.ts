import { getCoordsFromAddress } from "@/utils/geoLocation/getCoordinateToAddress";
import { useEffect } from "react";
// 좌표에서 주소로 바꿔주고 렌더링을 합니다.
export type GeoLocationType = {
  latitude: number;
  longitude: number;
};
export const useGeoLocationAddress = (
  roadAddress: string,
  setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocationType | null>>
) => {
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const location = await getCoordsFromAddress(roadAddress);
        setGeoLocation({
          latitude: location?.lat as number,
          longitude: location?.lng as number,
        });
      } catch (error) {
        console.error(error);
        setGeoLocation(null);
      }
    };

    fetchAddress();
  }, [roadAddress, setGeoLocation]);
};
