import { axiosInstance } from "@/api";
import { HomeLocationInfo } from "@/hooks/setHomeLocation/useHomeLocation";
// 변동 예정.
// 주소 값과 별칭
export async function getHomeLocationAndNickname() {
  try {
    return axiosInstance.get("/api/home");
  } catch (err: any) {
    console.error("집 주소 정보 요청 실패:", err);
    throw new Error(err);
  }
}

export async function updateHomeLocationAndNickname(data: HomeLocationInfo) {
  try {
    const contentData = { location: data.location, nickname: data.nickname };
    return axiosInstance.put("/api/home", contentData);
  } catch (err: any) {
    console.error("집 주소 설정 변경 실패:", err);
    throw new Error(err);
  }
}
