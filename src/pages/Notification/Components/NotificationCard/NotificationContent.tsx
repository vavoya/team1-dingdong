import { FC } from "react";
import { NotificationProps } from "../../model/notificationCardType";
import { AlarmText, Description, LinkBox } from "./styles";

import { colors } from "@/styles/colors";

import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import TicketCardContent from "./TicketCardContent";
import { useNavigate } from "react-router-dom";

interface NotificationContentProps {
  notificationData: NotificationProps;
}

export default function NotificationContent({
  notificationData,
}: NotificationContentProps) {
  const { type, isRead } = notificationData;
  const navigate = useNavigate();

  const renderFailedContent = (refundAmount: number) => (
    <AlarmText>
      <Description>{refundAmount}원이 딩동머니로 자동입금되었어요.</Description>
      <LinkBox onClick={() => navigate("/reservations")}>
        다음 배차를 예매하는 건 어떨까요?
        <ChevronRightIcon size={18} fill={colors.orange900} />
      </LinkBox>
    </AlarmText>
  );

  const renderWelcomeContent = () => (
    <AlarmText>
      <Description>웰컴 포인트로 체험권 2회분이 적립되었어요.</Description>
      <LinkBox onClick={() => navigate("/reservations")}>
        버스를 예매해 볼까요?
        <ChevronRightIcon size={18} fill={colors.orange900} />
      </LinkBox>
    </AlarmText>
  );

  switch (type) {
    case "departure":
    case "confirmed":
      return (
        <TicketCardContent
          isRead={isRead}
          departureStation={notificationData.departurePoint}
          destination={notificationData.destination}
          departureTime={notificationData.departureTime}
          arrivalTime={notificationData.arrivalTime}
          hoursUntilDeparture={notificationData.afterHour}
        />
      );
    case "failed":
      return (
        <>
          {renderFailedContent(notificationData.refundAmount)}
          <TicketCardContent
            isRead={isRead}
            cardType="failed"
            departureStation={notificationData.departurePoint}
            destination={notificationData.destination}
            departureTime={notificationData.departureTime}
            arrivalTime={notificationData.arrivalTime}
            bookingDate={notificationData.bookingDate}
            refundAmount={notificationData.refundAmount}
          />
        </>
      );
    case "welcome":
      return renderWelcomeContent();
    default:
      return null;
  }
}
