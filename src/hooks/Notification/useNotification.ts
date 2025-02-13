import { getNotification } from "@/api/Notification/notification";
import { useQuery } from "react-query";

export const notificationLoader = {
  queryKey: ["notification"],
  queryFn: () => getNotification(),
};
