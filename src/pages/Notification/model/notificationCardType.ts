type BaseNotification = {
  time: string;
  title: string;
  departurePoint?: string;
  destination?: string;
  departureTime?: string;
  arrivalTime?: string;
  isRead?: boolean;
};

type DepartureNotification = BaseNotification & {
  type: "departure";
  afterHour: number;
};

type ConfirmedNotification = BaseNotification & {
  type: "confirmed";
  afterHour: number;
};

type FailedNotification = BaseNotification & {
  type: "failed";
  bookingDate: number;
  refundAmount: number;
};

type WelcomeNotification = BaseNotification & {
  type: "welcome";
};

export type NotificationProps =
  | WelcomeNotification
  | DepartureNotification
  | ConfirmedNotification
  | FailedNotification;
