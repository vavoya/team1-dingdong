import PopHeader from "@/components/Headers/PopHeader";
import { NotificationCardWrapper, NotificationLimit } from "./styles";
// import { useLoaderData } from "react-router-dom";
import NotificationCard from "./Components/NotificationCard";
import { NotificationCardType } from "./model/notificationCardType";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function Notification() {
  const {
    notifications: { content: notificationArray },
  } = useLoaderData()[0];
  console.log(notificationArray, "요청 받은 알림 내역");

  const navigate = useNavigate();
  const notificationData: NotificationCardType[] = [
    {
      type: "BUS_START",
      timeStamp: "2025-02-13T17:20:57.008352",
      reservationInfo: {
        reservationId: 2,
        startStationName: "학동역 2번길",
        endStationName: "서울대학교",
        startDate: "2025-02-20",
        expectedStartTime: "2025-02-20T10:40:18",
        expectedEndTime: "2025-02-20T12:00:00",
        refundAmount: null,
      },
      read: false,
    },
    {
      type: "ALLOCATION_SUCCESS",
      timeStamp: "2025-02-13T17:20:57.008352",
      reservationInfo: {
        reservationId: 2,
        startStationName: "학동역 2번길",
        endStationName: "서울대학교",
        startDate: "2025-02-20",
        expectedStartTime: "2025-02-20T10:40:18",
        expectedEndTime: "2025-02-20T12:00:00",
        refundAmount: null,
      },
      read: true,
    },
    {
      type: "ALLOCATION_FAILED",
      timeStamp: "2025-02-13T17:20:57.008352",
      reservationInfo: {
        reservationId: 2,
        startStationName: "우리집",
        endStationName: "서울대학교",
        startDate: "2025-02-20",
        expectedStartTime: null,
        expectedEndTime: "2025-02-20T12:00:00",
        refundAmount: 20000,
      },
      read: true,
    },
  ];

  const notificationCardClick = (reservationId: number) => {
    navigate("/reservations", {
      state: { reservationId },
    });
  };
  return (
    <>
      <PopHeader text="알림"></PopHeader>
      <NotificationCardWrapper>
        {notificationData.map((v: NotificationCardType) => (
          <NotificationCard
            notificationData={v}
            onClick={() =>
              notificationCardClick(v.reservationInfo.reservationId)
            }
          />
        ))}
      </NotificationCardWrapper>
      <NotificationLimit>30일 동안의 알림만 저장됩니다.</NotificationLimit>
    </>
  );
}
