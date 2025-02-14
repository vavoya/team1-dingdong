export type NotificationType =
  | "ALLOCATION_SUCCESS"
  | "ALLOCATION_FAILED"
  | "BUS_START";

export interface ReservationInfo {
  reservationId: number;
  startStationName: string | null; // 배차 실패의 경우 null 가능
  endStationName: string;
  startDate: string; // 2025-02-28 형식
  expectedStartTime: string | null; // ISO date-time
  expectedEndTime: string; // ISO date-time
  refundAmount: number | null; // 환불 금액
}

export interface NotificationCardType {
  type: NotificationType;
  timeStamp: string; // ISO date-time
  reservationInfo: ReservationInfo;
  read: boolean;
}

// type BaseNotification = {
//   time: string;
//   title: string;
//   departurePoint?: string;
//   destination?: string;
//   departureTime?: string;
//   arrivalTime?: string;
//   isRead?: boolean;
// };

// type DepartureNotification = BaseNotification & {
//   type: "departure";
//   afterHour: number;
// };

// type ConfirmedNotification = BaseNotification & {
//   type: "confirmed";
//   afterHour: number;
// };

// type FailedNotification = BaseNotification & {
//   type: "failed";
//   bookingDate: number;
//   refundAmount: number;
// };

// type WelcomeNotification = BaseNotification & {
//   type: "welcome";
// };

// export type NotificationProps =
//   | WelcomeNotification
//   | DepartureNotification
//   | ConfirmedNotification
//   | FailedNotification;

// interface ReservationInfo {
//   reservationId: number;
//   startStationName: string;
//   endStationName: string;
//   startDate: string;
//   expectedStartTime: string;
//   expectedEndTime: string;
// }

// interface NotificationResponse {
//   type: "ALLOCATION_SUCCESS";
//   timeStamp: string;
//   reservationInfo: ReservationInfo;
//   read: boolean;
// }
