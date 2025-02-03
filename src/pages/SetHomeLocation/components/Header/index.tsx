import ArrowLeftIcon from "@/components/designSystem/Icons/ArrowLeftIcon";
import { Header, HeaderLeft, HeaderTitle } from "./styles";
export default function SetLocationHomeHeader() {
  return (
    <Header>
      <HeaderLeft>
        <ArrowLeftIcon />
        <HeaderTitle>탑승지 위치 설정</HeaderTitle>
      </HeaderLeft>
    </Header>
  );
}
