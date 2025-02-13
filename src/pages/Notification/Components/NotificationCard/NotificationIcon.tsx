// components/NotificationCard/NotificationIcon.tsx
import { NotificationProps } from "../../model/notificationCardType";

import { colors } from "@/styles/colors";
import BellIcon from "@/components/designSystem/Icons/Home/BellIcon";
import BusIcon from "@/components/designSystem/Icons/Home/BusIcon";
import BusFailIcon from "@/components/designSystem/Icons/Notification/BusFailIcon";
import SmileIcon from "@/components/designSystem/Icons/Notification/SmileIcon";

interface NotificationIconProps {
  type: NotificationProps["type"];
}

export default function NotificationIcon({ type }: NotificationIconProps) {
  const iconMap = {
    departure: <BellIcon />,
    confirmed: <BusIcon fill={colors.gray90} width={15} height={18} />,
    failed: <BusFailIcon />,
    welcome: <SmileIcon />,
  };

  return iconMap[type] || null;
}
