// 예시: loader 함수 (fixedRouteBookingLoader.ts)

import {
  getAvailableBusInfoArray,
  getBusPath,
} from "@/api/BusBooking/fixedBusBooking";

export const fixedRouteBookingLoader = async () => {
  console.log("✅ loader 실행됨!");
  // sessionStorage에서 예약 정보 추출
  const bookingInfoStr = sessionStorage.getItem("/fixed-bus-booking");
  if (!bookingInfoStr) {
    throw new Error("예약 정보가 없습니다.");
  }
  const { direction, timeSchedule } = JSON.parse(bookingInfoStr);

  // 첫 번째 GET 요청: 전체 버스 정보 가져오기
  const busInfoResponse = await getAvailableBusInfoArray(
    direction,
    timeSchedule
  );
  console.log(busInfoResponse);
  const busInfoArray = busInfoResponse.data?.result;

  if (!busInfoArray || busInfoArray.length === 0) {
    throw new Error("버스 정보가 없습니다.");
  }

  // 예시로 첫 번째 버스의 busScheduleId 사용
  const busScheduleId = busInfoArray[0].busScheduleId;

  // 두 번째 GET 요청: 선택된 버스 경로 가져오기
  const busPathResponse = await getBusPath(busScheduleId);

  const busPath = busPathResponse.points;

  return { busInfoArray, busPath, direction, timeSchedule };
};
