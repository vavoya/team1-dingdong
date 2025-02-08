import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Section, TimePickerContainer } from "./styles";
import TimePicker from "./TimePicker";
import {
  TIME_WHEEL_INIT_HOUR,
  TIME_WHEEL_ITEM_BOX_HEIGHT,
} from "@/constants/timeWheelLayout";
interface TimeWheelProps {
  initialHour?: number; // 초기 설정 시간. 8시 부터.
}
export interface TimeWheelHandle {
  getSelectedTime: () => { amPm: string; hour: string; minute: string };
}

export default forwardRef(function TimeWheel(
  { initialHour = TIME_WHEEL_INIT_HOUR }: TimeWheelProps,
  ref: React.ForwardedRef<TimeWheelHandle>
) {
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedAmPm, setSelectedAmPm] = useState("");

  const hours = [...Array(12)].map((_, i) => i.toString().padStart(2, "0"));
  const minutes = ["00", "30"];
  const amPm = ["오전", "오후"];

  const extendedHours = [...hours, ...hours, ...hours];

  const midScrollPosition = hours.length * TIME_WHEEL_ITEM_BOX_HEIGHT; // 중앙에 위치하도록 설정

  const isStartHourSet = useRef(true); // 초기 시간 값 설정을 위한 상태 값.

  useImperativeHandle(ref, () => ({
    getSelectedTime: () => ({
      amPm: selectedAmPm,
      hour: selectedHour,
      minute: selectedMinute,
    }),
  }));

  const handleAmPmScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    // 무한 스크롤 적용 조건 (항목이 3개 이상일 때)
    const index = Math.round(container.scrollTop / TIME_WHEEL_ITEM_BOX_HEIGHT);
    setSelectedAmPm(amPm[index] || "00");
  };

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    // 무한 스크롤 적용 조건 (항목이 3개 이상일 때)
    if (hours.length > 2) {
      if (container.scrollTop <= TIME_WHEEL_ITEM_BOX_HEIGHT) {
        // 스크롤이 맨 위로 갔을 때 다시 중간 위치로.
        container.scrollTop = midScrollPosition;
      } else if (
        // 스크롤이 맨 아래로 갔을 때 다시 중간 위치로
        container.scrollTop >=
        TIME_WHEEL_ITEM_BOX_HEIGHT * (extendedHours.length - hours.length)
      ) {
        container.scrollTop = midScrollPosition;
      }
    }

    if (isStartHourSet.current) {
      container.scrollTop = initialHour * TIME_WHEEL_ITEM_BOX_HEIGHT;
      isStartHourSet.current = false;
    }

    const index =
      Math.round(container.scrollTop / TIME_WHEEL_ITEM_BOX_HEIGHT) %
      hours.length;

    setSelectedHour(hours[index]);
  };

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    const index = Math.round(container.scrollTop / 46);
    setSelectedMinute(minutes[index]);
  };

  return (
    <Section>
      <TimePickerContainer>
        <TimePicker
          itemWidth={100}
          time={amPm}
          handleTimeScroll={handleAmPmScroll}
          selectedTime={selectedAmPm}
        />
        <TimePicker
          time={extendedHours}
          handleTimeScroll={handleHourScroll}
          selectedTime={selectedHour}
        />
        <TimePicker
          time={minutes}
          handleTimeScroll={handleMinuteScroll}
          selectedTime={selectedMinute}
        />
      </TimePickerContainer>
    </Section>
  );
});
