import { ChangeEvent, useEffect, useRef, useState } from "react";
import { NameGuideText } from "./styles";
import CustomFormWrapper from "../../Components/FormWrapper";
import CustomInput from "../../Components/Input";
import { NextButtonWrapper } from "../SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNUP_TEXT } from "@/constants/signupTexts";

import { useDaumPostcodePopup } from "react-daum-postcode";
import { SCRIPT_URLS } from "@/constants/daumPostCode";
import {
  isValidNameFormat,
  isValidPhoneNumber,
  phoneNumberFormat,
} from "@/utils/signUp/userInfoFormatValidation";
import { usePostUserInfo } from "@/hooks/SignUp/useSignUp";
import {
  GeoLocationType,
  useGeoLocationAddress,
} from "../../hooks/useAddressToCoordinate";

import useKakaoLoader from "@/hooks/useKakaoLoader/useKakaoLoader";

// 예시 타입들

export default function UserInfoSignup() {
  // 브라우저 콘솔에서
  useKakaoLoader();

  const location = useLocation();

  const userInfoFromPreviousStep = useRef<{
    email: string;
    password: string;
    schoolId: number;
  }>({ email: "", password: "", schoolId: 1 });

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    addressNickname: "",
    phoneNumber: "",
  });
  const [homeGeoLocation, setHomeGeoLocation] =
    useState<GeoLocationType | null>(null);

  useEffect(() => {
    // 직접 링크 접속시, 데이터가 없다면 다시 이동.
    // if (!location.state) {
    //   navigate("/signup");
    //   return;
    // }

    userInfoFromPreviousStep.current = location.state;
  }, []);

  const [nameFormatError, setNameFormatError] = useState(false);
  const { postUserInfoMutation } = usePostUserInfo();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const converted = phoneNumberFormat(value);
      setFormData((prev) => ({
        ...prev,
        [name]: converted,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const open = useDaumPostcodePopup(SCRIPT_URLS.daumPostCode);

  const handleComplete = (data: any) => {
    let fullAddress = data.roadAddress;

    setFormData((prev) => ({
      ...prev,
      ["address"]: fullAddress,
    }));
  };

  useGeoLocationAddress(formData.address, setHomeGeoLocation);

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  console.log(formData);

  useEffect(() => {
    setNameFormatError(!isValidNameFormat(formData.name));
  }, [formData.name]);

  const submitButtonActive =
    isValidNameFormat(formData.name) &&
    formData.address.length > 0 &&
    formData.addressNickname.length > 0 &&
    isValidPhoneNumber(formData.phoneNumber);

  console.log(userInfoFromPreviousStep.current, formData, "회원정보~");
  const submitUserInfoHandler = () => {
    if (!homeGeoLocation) return;
    const splitAddress = formData.address.split(" ").slice(-2).join(" ");
    const finalUserInfo = {
      email: userInfoFromPreviousStep.current.email,
      password: userInfoFromPreviousStep.current.password,
      name: formData.name,
      home: {
        houseLatitude: homeGeoLocation.latitude,
        houseLongitude: homeGeoLocation.longitude,
        houseRoadNameAddress: splitAddress,
      },
      schoolId: userInfoFromPreviousStep.current.schoolId,
    };
    console.log(finalUserInfo);
    postUserInfoMutation(finalUserInfo, {
      onSuccess: () => {
        navigate("/home");
      },
      onError: () => {
        // 에러 핸들링. 회원 가입 실패 에러 모달
      },
    });
  };
  return (
    <>
      <CustomFormWrapper>
        <CustomInput
          hasError={nameFormatError && formData.name.length > 0}
          name="name"
          label="이름"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해주세요"
          maxLength={8}
        />

        <NameGuideText $hasError={nameFormatError && formData.name.length > 0}>
          {SIGNUP_TEXT.nameGuideText}
        </NameGuideText>

        <CustomInput
          name="address"
          onClick={handleClick}
          label="주소"
          value={formData.address}
          onChange={handleChange}
          placeholder="주소를 입력해주세요"
        />

        <CustomInput
          name="addressNickname"
          label="주소 별칭"
          value={formData.addressNickname}
          onChange={handleChange}
          placeholder="주소 별칭을 설정해주세요"
        />
        <CustomInput
          name="phoneNumber"
          label="연락처"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="연락처를 입력해주세요"
          maxLength={13}
        />
      </CustomFormWrapper>
      <NextButtonWrapper>
        <SolidButton
          text="완료"
          onClick={submitUserInfoHandler}
          active={submitButtonActive}
        />
      </NextButtonWrapper>{" "}
    </>
  );
}
