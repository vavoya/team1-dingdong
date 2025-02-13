import {
  Arrow,
  Banner,
  CardContainer,
  Content,
  EmptyCircle,
  HighlightText,
  StationInfo,
  StationName,
  Time,
} from "./styles";
import ChevronRightIcon from "@/components/designSystem/Icons/ChevronRightIcon";
import { colors } from "@/styles/colors";
import { Body1SemiBold, Body2SemiBold } from "@/styles/typography";

interface TicketCardProps {
  isRead?: boolean;
  cardType?: "confirmed" | "failed" | "welcome";
  departureStation?: string;
  arrivalStation?: string;
  departureTime?: string;
  arrivalTime?: string;
  hoursUntilDeparture?: number;
  bookingDate?: number;
  refundAmount?: number;
}

export default function TicketCard({
  isRead,
  cardType = "confirmed",
  departureStation,
  arrivalStation,
  departureTime,
  arrivalTime,
  hoursUntilDeparture,
  bookingDate,
}: TicketCardProps) {
  return (
    <CardContainer>
      <EmptyCircle
        $isRead={isRead}
        $direction="right"
        $cardType={cardType}
      ></EmptyCircle>
      <Banner $cardType={cardType}>
        {cardType === "confirmed" ? (
          <>
            <HighlightText>{hoursUntilDeparture}시간 후</HighlightText>
            <Body1SemiBold>에 타야해요!</Body1SemiBold>
          </>
        ) : (
          <>
            <Body2SemiBold>{bookingDate}일 예정내역 </Body2SemiBold>
          </>
        )}
      </Banner>
      <Content>
        <StationInfo>
          <StationName>{departureStation}</StationName>

          {cardType === "failed" ? (
            <Time>-</Time>
          ) : (
            <Time>{departureTime} 탑승</Time>
          )}
        </StationInfo>
        <ChevronRightIcon size={32} fill={colors.gray30} />
        <StationInfo>
          <StationName>{arrivalStation}</StationName>
          <Time>{arrivalTime} 하차</Time>
        </StationInfo>
      </Content>
      <EmptyCircle
        $isRead={isRead}
        $direction="left"
        $cardType={cardType}
      ></EmptyCircle>
    </CardContainer>
  );
}
