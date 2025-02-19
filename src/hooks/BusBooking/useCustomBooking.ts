import { getTimeTableRecommendationTime } from "@/api/BusBooking/customBusBooking";

import { useQuery } from "@tanstack/react-query";

export const useGetTimeTableRecommendation = () => {
  const data = useQuery({
    queryKey: ["TimeTableRecommendation"],
    queryFn: () => getTimeTableRecommendationTime(),
  });

  return {
    data,
  };
};
