import {
  getHomeLocationAndStation,
  updateStationLocationAndNickname,
} from "@/api/setHomeLocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface StationLocationInfo {
  // location: string;
  // nickname: string;

  houseLatitude: number; // double
  houseLongitude: number; // double
  stationLatitude: number; // double
  stationLongitude: number; // double
  stationName: "우리집"; // string
}

export const useGetHomeLocation = () => {
  const { data } = useQuery({
    queryKey: ["houseInfo"],
    queryFn: getHomeLocationAndStation,
  });

  return {
    data,
  };
};

export const usePutStationLocation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: putHomeLocationMutation } = useMutation({
    mutationFn: (data: StationLocationInfo) => {
      return updateStationLocationAndNickname(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["setHomeLocation"],
      });
    },
  });
  return { putHomeLocationMutation };
};
