import { AlarmText, Description, LinkBox } from "./styles";

import { colors } from "@/styles/colors";

import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import TicketCardContent from "./TicketCardContent";
import { useNavigate } from "react-router-dom";
import {
  NotificationType,
  ReservationInfo,
} from "../../model/notificationCardType";

export interface NotificationContentProps {
  reservationInfo: ReservationInfo;
  type: NotificationType;
  isRead: boolean;
}

export default function NotificationContent({
  reservationInfo,
  type,
  isRead,
}: NotificationContentProps) {
  const {
    reservationId,
    refundAmount,
    startDate,
    startStationName,
    endStationName,
    expectedEndTime,
    expectedStartTime,
  } = reservationInfo;
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
    case "BUS_START":
    case "ALLOCATION_SUCCESS":
      return (
        <TicketCardContent
          reservationInfo={reservationInfo}
          type={type}
          isRead={isRead}
        />
      );
    case "ALLOCATION_FAILED":
      return (
        <>
          {renderFailedContent(refundAmount!)}
          <TicketCardContent
            isRead={isRead}
            type={type}
            reservationInfo={reservationInfo}
          />
        </>
      );
    // case "welcome":
    //   return renderWelcomeContent();
    default:
      return null;
  }
}
