import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { PasswordGuidText } from "./styles";
import CustomInput from "../../Components/Input";
import CustomFormWrapper from "../../Components/FormWrapper";
import { NextButtonWrapper } from "../SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useLocation, useNavigate } from "react-router-dom";
import { SIGNUP_TEXT } from "@/constants/signupTexts";
import { isValidatePassword } from "@/utils/signUp/passwordValidation";
import { colors } from "@/styles/colors";

interface PasswordGuideTextType {
  passwordGuideText: string;
  color: string;
}
export default function PasswordSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = useRef();
  useEffect(() => {
    if (!location.state) {
      navigate("/signup");
      return;
    }
    userEmail.current = location.state.email;
  }, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [passwordGuideText, setPasswordGuideText] =
    useState<PasswordGuideTextType>({
      passwordGuideText: SIGNUP_TEXT.passwordGuideText,
      color: colors.gray50,
    });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (password.length <= 0) return;
    if (isValidatePassword(password)) {
      setPasswordGuideText({
        passwordGuideText: SIGNUP_TEXT.passwordGuideText,
        color: colors.gray50,
      });
    } else
      setPasswordGuideText({
        passwordGuideText: SIGNUP_TEXT.passwordFormatWrongText,
        color: colors.red,
      });
  }, [password]);

  useEffect(() => {
    if (isValidatePassword(password) && password === confirmPassword) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [password, confirmPassword]);
  return (
    <>
      <CustomFormWrapper>
        <CustomInput
          hasError={
            passwordGuideText.passwordGuideText ===
              SIGNUP_TEXT.passwordFormatWrongText && password.length > 0
          }
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="8자 이상의 비밀번호"
        />

        <PasswordGuidText $textColor={passwordGuideText.color}>
          {passwordGuideText.passwordGuideText}
        </PasswordGuidText>

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
          active={buttonActive}
          text="다음"
          onClick={() =>
            navigate("/signup/user-info", {
              state: { email: userEmail.current, password },
            })
          }
        />
      </NextButtonWrapper>
    </>
  );
}
