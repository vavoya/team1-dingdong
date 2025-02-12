import {
  getHomeLocationAndNickname,
  updateHomeLocationAndNickname,
} from "@/api/setHomeLocation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface HomeLocationInfo {
  location: string;
  nickname: string;
}

export const useGetHomeLocation = () => {
  const homeLocationInfo = useQuery({
    queryKey: ["setHomeLocation"],
    queryFn: getHomeLocationAndNickname,
  });

  return {
    homeLocationInfo,
  };
};

export const usePutHomeLocation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: putHomeLocationMutation } = useMutation({
    mutationFn: (data: HomeLocationInfo) => {
      return updateHomeLocationAndNickname(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["setHomeLocation"],
      });
    },
  });
  return { putHomeLocationMutation };
};
