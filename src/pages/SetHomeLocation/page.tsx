import { PinContainer, PinTitle, PinDescription, PageWrapper } from "./styles";
import SetLocationHomeHeader from "./components/Header";
import SetLocationHomeMap from "./components/MapWrapper";
import SetLocationBottomModal from "./components/BottomModal";
export default function SetHomeLocation() {
  return (
    <>
      <SetLocationHomeHeader />
      <SetLocationHomeMap />
      <PinBox />
      <SetLocationBottomModal />
    </>
  );
}

function PinBox() {
  return (
    <PinContainer>
      <PinTitle>집</PinTitle>
      <PinDescription>정확한 승하차 위치를 설정해주세요.</PinDescription>
    </PinContainer>
  );
}
