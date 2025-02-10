import { axiosInstance } from "@/api";

export async function getAIRecommendationTime(year: number, month: number) {
  try {
    const { data } = await axiosInstance.get(
      `/api/users/reservations/recommendtaions?status=go&year=${year}&month=${month}`
    );
    return data;
  } catch (err: any) {
    console.error("AI 추천 적용 GET 요청 실패:", err);
    throw new Error(err);
  }
}
