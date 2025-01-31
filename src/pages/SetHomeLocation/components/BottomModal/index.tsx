import ConfirmButton from "@/components/designSystem/Button/ConfirmButton";
import {
  Address,
  InputBox,
  InputTitle,
  LocationInputContainer,
  BottomModal,
} from "./styles";

export default function SetLocationBottomModal() {
  return (
    <BottomModal>
      <LocationInputContainer>
        <InputTitle>주소 별칭</InputTitle>
        <InputBox type="text" value={"우리집"} />
        <Address>서울 강남구 논현로 131길 7</Address>
      </LocationInputContainer>
      <ConfirmButton text="설정하기" />
    </BottomModal>
  );
}
