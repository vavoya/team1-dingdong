import { axiosInstance } from "..";

export const getNotification = async () => {
  try {
    const { data } = await axiosInstance.get("/api/users/notifications");
    return data;
  } catch (e) {
    console.error(e);
  }
};
