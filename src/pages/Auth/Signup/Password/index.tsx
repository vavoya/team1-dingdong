import React, { useState, ChangeEvent } from "react";
import { PasswordGuidText } from "./styles";
import CustomInput from "../../Components/Input";
import CustomFormWrapper from "../../Components/FormWrapper";
import { NextButtonWrapper } from "../SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "react-router-dom";
import { SIGNUP_TEXT } from "@/constants/signupTexts";

export default function PasswordSignup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const navigate = useNavigate();
  return (
    <>
      <CustomFormWrapper>
        <CustomInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8자 이상의 비밀번호"
        />

        <PasswordGuidText>{SIGNUP_TEXT.passwardGuideText}</PasswordGuidText>

        <CustomInput
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="8자 이상의 비밀번호"
        />
      </CustomFormWrapper>

      <NextButtonWrapper>
        <SolidButton
          text="다음"
          onClick={() => navigate("/signup/user-info")}
        />
      </NextButtonWrapper>
    </>
  );
}
