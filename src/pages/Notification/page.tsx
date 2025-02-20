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

  const navigate = useNavigate();

  const notificationCardClick = (reservationId: number) => {
    navigate("/reservations", {
      state: { reservationId },
    });
  };
  const notificationsServerData =
    notificationArray?.length > 0 ? notificationArray : [];
  return (
    <>
      <PopHeader text="알림"></PopHeader>
      <NotificationCardWrapper>
        {notificationsServerData.map((v: NotificationCardType) => (
          <NotificationCard
            $cursorPointer={v?.reservationInfo !== null}
            notificationData={v}
            onClick={() => {
              if (!v?.reservationInfo) {
                return;
              }
              notificationCardClick(v?.reservationInfo?.reservationId);
            }}
          />
        ))}
      </NotificationCardWrapper>
      <NotificationLimit>30일 동안의 알림만 저장됩니다.</NotificationLimit>
    </>
  );
}
