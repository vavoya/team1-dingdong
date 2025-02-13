import { getNotification } from "@/api/Notification/notification";

export const notificationLoader = {
  queryKey: ["notification"],
  queryFn: () => getNotification(),
};
