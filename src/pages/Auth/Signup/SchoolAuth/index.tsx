import React, { useState, ChangeEvent } from "react";
import {
  Label,
  EmailInputWrapper,
  EmailInput,
  VerifyButton,
  VerificationTimeText,
  NextButtonWrapper,
  EmailFormWrapper,
} from "./styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { Star } from "@/pages/SetHomeLocation/components/BottomModal/styles";
import CustomInput from "../../Components/Input";
import { useNavigate } from "react-router-dom";
import CustomFormWrapper from "../../Components/FormWrapper";

export default function SchoolAuthSignUp() {
  const [email, setEmail] = useState("abcd1234@snu.ac.kr");
  const [verificationCode, setVerificationCode] = useState("123456");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };
  const navigate = useNavigate();

  return (
    <>
      <CustomFormWrapper>
        <EmailFormWrapper>
          <Label>
            학교 이메일 <Star>*</Star>
          </Label>
          <EmailInputWrapper>
            <EmailInput value={email} onChange={handleEmailChange} />
            <VerifyButton>전송</VerifyButton>
          </EmailInputWrapper>
          <VerificationTimeText>
            인증 코드 유효 시간: 1분 34초
          </VerificationTimeText>
        </EmailFormWrapper>

        <CustomInput
          label="인증 코드를 입력해주세요"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="6자리 코드"
        />
      </CustomFormWrapper>

      <NextButtonWrapper>
        <SolidButton text="다음" onClick={() => navigate("password")} />
      </NextButtonWrapper>
    </>
  );
}
