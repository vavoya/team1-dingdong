import { axiosInstance } from "@/api";

export async function getTimeTableRecommendationTime() {
  try {
    const { data } = await axiosInstance.get("/api/users/timetable");
    return data;
  } catch (err: any) {
    console.error("시간표 추천 적용 GET 요청 실패:", err);
    throw new Error(err);
  }
}
