import PopHeader from "@/components/Headers/PopHeader";
import { NotificationCardWrapper, NotificationLimit } from "./styles";
// import { useLoaderData } from "react-router-dom";
import NotificationCard from "./Components/NotificationCard";
import { NotificationProps } from "./model/notificationCardType";

export default function Notification() {
  //   const data = useLoaderData();

  const notificationData: NotificationProps[] = [
    {
      type: "departure" as const,
      time: "2025-02-13T07:57:00Z",
      title: "탑승 안내",
      afterHour: 2,
      departurePoint: "학동역",
      destination: "서울대학교",
      departureTime: "12:00",
      arrivalTime: "13:00",
      isRead: false,
    },
    {
      type: "confirmed" as const,
      time: "2025-02-14T07:57:00Z",
      title: "배차 확정 안내",
      afterHour: 48,
      departurePoint: "학동역",
      destination: "서울대학교",
      departureTime: "12:00",
      arrivalTime: "13:00",
      isRead: true,
    },
    {
      type: "failed" as const,
      time: "2025-02-15T07:57:00Z",
      title: "배차 실패 입금",
      bookingDate: 11,
      departurePoint: "우리집",
      destination: "서울대학교",
      departureTime: "12:00",
      arrivalTime: "13:00",
      refundAmount: 20000,
      isRead: true,
    },
    {
      type: "welcome" as const,
      title: "환영해요!",
      time: "2025-02-15T07:57:00Z",
    },
  ];
  return (
    <>
      <PopHeader text="알림"></PopHeader>
      <NotificationCardWrapper>
        {notificationData.map((v) => (
          <NotificationCard notificationData={v} />
        ))}
      </NotificationCardWrapper>
      <NotificationLimit>30일 동안의 알림만 저장됩니다.</NotificationLimit>
    </>
  );
}
