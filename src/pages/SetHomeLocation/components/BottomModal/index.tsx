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
import { usePutStationLocation } from "@/hooks/setHomeLocation/useHomeLocation";
import { useLoaderData } from "react-router-dom";
import { LocationInfo } from "../../page";
import useToast from "@/hooks/useToast";

interface setLocationBottomModalProps {
  stationInfo: LocationInfo;
  roadAddress: string | null;
  showBottomSheet: boolean;
}
export default function SetLocationBottomModal({
  roadAddress,
  showBottomSheet,
}: setLocationBottomModalProps) {
  const setToast = useToast("-500px");

  const [houseAndStationInfo] = useLoaderData();
  const { houseInfo, stationInfo } = houseAndStationInfo;

  const { putHomeLocationMutation } = usePutStationLocation();

  const [addressNickname, setAddressNickname] = useState(
    stationInfo ? stationInfo.name : ""
  );
  const [isNicknameValid, setIsNicknameValid] = useState(
    nicknameValidator(addressNickname)
  ); // 유효성 검사 함수돌리기.

  const [isSetLocationDone, setIsSetLocationDone] = useState(
    isNicknameValid && roadAddress !== null
  );

  useEffect(() => {
    setIsNicknameValid(nicknameValidator(addressNickname));
    setIsSetLocationDone(
      nicknameValidator(addressNickname) && roadAddress !== null
    );
  }, [addressNickname, roadAddress]);

  const setLocationSubmit = () => {
    putHomeLocationMutation(
      {
        stationRoadAddressName: roadAddress!,
        latitude: stationInfo.latitude,
        longitude: stationInfo.longitude,
        stationName: addressNickname,
      },
      {
        onSuccess: () => {
          setToast("주소 설정이 완료되었습니다.");
        },
        onError: () => {
          setToast("!!주소 설정에 실패했습니다.");
        },
      }
    );

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
