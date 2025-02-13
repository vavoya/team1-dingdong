import { NotificationProps } from "../../model/notificationCardType";
import { Subtitle, Time, Title, TitleType, Wrapper } from "./styles";

import { formatDate } from "@/utils/notification/dateFormatter";
import NotificationContent from "./NotificationContent";
import NotificationIcon from "./NotificationIcon";

interface NotificationCardProps {
  notificationData: NotificationProps;
}

export default function NotificationCard({
  notificationData,
}: NotificationCardProps) {
  return (
    <Wrapper>
      <Subtitle>
        <Title>
          <NotificationIcon type={notificationData.type} />
          <TitleType>{notificationData.title}</TitleType>
        </Title>
        <Time>{formatDate(notificationData.time)}</Time>
      </Subtitle>
      <NotificationContent notificationData={notificationData} />
    </Wrapper>
  );
}
