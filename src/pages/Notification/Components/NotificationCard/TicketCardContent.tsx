import { FC } from "react";
import TicketCard from "../TicketCard";

interface TicketCardContentProps {
  isRead?: boolean;
  departureStation?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  hoursUntilDeparture?: number;
  bookingDate?: number;
  refundAmount?: number;
  cardType?: "failed";
}

export default function TicketCardContent(props: TicketCardContentProps) {
  return <TicketCard {...props} />;
}
