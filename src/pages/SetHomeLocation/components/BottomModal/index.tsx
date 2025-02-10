import SolidButton from "@/components/designSystem/Button/SolidButton";
import {
  Address,
  InputBox,
  InputTitle,
  LocationInputContainer,
  BottomModal,
  Star,
  Warning,
} from "./styles";
import { useEffect, useState } from "react";
import { nicknameValidator } from "@/utils/validator/isValidNickname";
// import { useHomeLocation } from "@/hooks/setHomeLocation/useHomeLocation";

interface setLocationBottomModalProps {
  roadAddress: string | null;
  showBottomSheet: boolean;
}
export default function SetLocationBottomModal({
  roadAddress,
  showBottomSheet,
}: setLocationBottomModalProps) {
  //   const { homeLocationInfo, putHomeLocationMutation } = useHomeLocation();
  //   const [addressNickname, setAddressNickname] = useState(
  //     homeLocationInfo.data?.data.addressNickname
  //   );
  const [addressNickname, setAddressNickname] = useState("우리집");
  const [isNicknameValid, setIsNicknameValid] = useState(
    nicknameValidator(addressNickname)
  ); // 유효성 검사 함수돌리기.

  const [isSetLocationDone, setIsSetLocationDone] = useState(
    isNicknameValid && roadAddress !== null
  );

  console.log(roadAddress, isNicknameValid, roadAddress !== null);
  useEffect(() => {
    setIsNicknameValid(nicknameValidator(addressNickname));
    setIsSetLocationDone(
      nicknameValidator(addressNickname) && roadAddress !== null
    );
  }, [addressNickname, roadAddress]);

  console.log(isSetLocationDone, "???");

  const setLocationSubmit = () => {
    // putHomeLocationMutation({
    //   location: roadAddress!,
    //   nickname: addressNickname,
    // });
    // 주소 설정 완료 토스트 메시지.
  };
  return (
    <BottomModal showBottomSheet={showBottomSheet}>
      <LocationInputContainer>
        <InputTitle>
          주소 별칭 <Star>*</Star>
        </InputTitle>
        <InputBox
          type="text"
          onChange={(e) => setAddressNickname(e.target.value)}
          value={addressNickname}
        />
      </LocationInputContainer>
      <Address>
        {roadAddress && isNicknameValid ? (
          roadAddress
        ) : isNicknameValid ? (
          <Warning>유효하지 않은 주소 입니다</Warning>
        ) : (
          <Warning>한 자 이상 입력, 특수문자나 이모티콘은 불가합니다.</Warning>
        )}
      </Address>
      <SolidButton
        onClick={setLocationSubmit}
        active={isSetLocationDone}
        text="설정하기"
      />
    </BottomModal>
  );
}
