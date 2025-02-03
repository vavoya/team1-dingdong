import PinIcon from "@/components/designSystem/Icons/PinIcon";
import { PinContainer, PinDescription, PinMark, PinTitle } from "./styles";

interface PinProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Pin = ({ onMouseDown }: PinProps) => (
  <PinContainer onMouseDown={onMouseDown}>
    <PinMark>
      <PinTitle>탑승지</PinTitle>
      <PinDescription>정확한 승하차 위치를 설정해주세요.</PinDescription>
    </PinMark>
    <PinIcon />
  </PinContainer>
);
