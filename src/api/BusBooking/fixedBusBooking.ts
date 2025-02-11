import { axiosInstance } from "@/api";
import { CommuteType } from "@/pages/BusBooking/types/commuteType";

export async function getAvailableBusInfoArray(
  commuteType: CommuteType,
  year: number,
  month: number,
  day: number
) {
  try {
    const { data } = await axiosInstance.get(
      `/api/availableBus?status=${
        commuteType === "등교" ? "school" : "home"
      }&year=${year}&month=${month}&day=${day}`
    );
    return data;
  } catch (err: any) {
    console.error("배차 확정된 버스 카드 정보 get 실패", err);
    throw new Error(err);
  }
}

export async function getBusRouteCoordinates(busId: number) {
  try {
    const { data } = await axiosInstance.get(
      `/api/availableBus?busId=${busId}`
    );
    return data;
  } catch (err: any) {
    console.error("해당 버스에 대한 경로 좌표 get 실패", err);
    throw new Error(err);
  }
}
