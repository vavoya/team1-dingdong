import { getAIRecommendationTime } from "@/api/BusBooking/customBusBooking";
import {
  getAvailableBusInfoArray,
  getBusRouteCoordinates,
} from "@/api/BusBooking/fixedBusBooking";
import { CommuteType } from "@/pages/BusBooking/types/commuteType";

import { useQuery } from "@tanstack/react-query";

export const useGetAvailableBusInfo = (
  commuteType: CommuteType,
  year: number,
  month: number,
  day: number
) => {
  const data = useQuery({
    queryKey: ["fixedRouteBooking", year, month, day],
    queryFn: () => getAvailableBusInfoArray(commuteType, year, month, day),
  });

  return {
    data,
  };
};

export const useGetBusRouteCoordinates = (busId: number) => {
  const data = useQuery({
    queryKey: ["fixedRouteBusCoordinates", busId],
    queryFn: () => getBusRouteCoordinates(busId),
  });

  return {
    data,
  };
};
