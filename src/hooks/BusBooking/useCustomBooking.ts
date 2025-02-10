import { getAIRecommendationTime } from "@/api/BusBooking/customBusBooking";

import { useQuery } from "@tanstack/react-query";

export const useGetAIRecommendation = (year: number, month: number) => {
  const data = useQuery({
    queryKey: ["AIRecommendation", year, month],
    queryFn: () => getAIRecommendationTime(year, month),
  });

  return {
    data,
  };
};
