import React, { ChangeEvent, useEffect, useState } from "react";
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

export default function UserInfoSignup() {
  const location = useLocation();
  const { email, password } = location.state; // 이전 단계에서의 이메일
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    addressNickname: "",
    phoneNumber: "",
  });

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
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setFormData((prev) => ({
      ...prev,
      ["address"]: fullAddress,
    }));
  };
  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  console.log(formData);

  useEffect(() => {
    if (!isValidNameFormat(formData.name)) {
      setNameFormatError(true);
    } else {
      setNameFormatError(false);
    }
  }, [formData.name]);

  const submitButtonActive =
    isValidNameFormat(formData.name) &&
    formData.address.length > 0 &&
    formData.addressNickname.length > 0 &&
    isValidPhoneNumber(formData.phoneNumber);

  const submitUserInfoHandler = () => {
    const userInfo = {
      email,
      password,
      ...formData,
    };

    postUserInfoMutation(userInfo, {
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
