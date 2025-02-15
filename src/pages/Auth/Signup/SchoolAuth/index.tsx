import { useState, ChangeEvent, useEffect } from "react";
import {
  Label,
  EmailInputWrapper,
  EmailInput,
  VerifyButton,
  VerificationTimeText,
  NextButtonWrapper,
  EmailFormWrapper,
  SchoolSelectWrapper,
} from "./styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { Star } from "@/pages/SetHomeLocation/components/BottomModal/styles";
import CustomInput from "../../Components/Input";
import { useLoaderData, useNavigate } from "react-router-dom";
import CustomFormWrapper from "../../Components/FormWrapper";

import { isValidEmailFormat } from "@/utils/login/emailValidation";
import Dropdown from "../../Components/Dropdown";

export default function SchoolAuthSignUp() {
  const { schools: schoolList } = useLoaderData()[0];
  console.log(schoolList, "학교 목록");

  const [email, setEmail] = useState("");
  const [emailFormatHasError, setEmailFormatHasError] = useState(false);

  const [nextButtonActive, setNextButtonActive] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState("");
  const [hasErrorEmail, setHasErrorEmail] = useState(false && email.length > 0);

  const [verificationCodeErrorText, setVerificationCodeErrorText] =
    useState("");

  const [selectdSchoolId, setSelectedSchoolId] = useState<number>(0);

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const certifiedEmail = () => {
    setEmailErrorText("");
    setHasErrorEmail(false);
  };

  const checkVerificationCodeHandler = () => {
    setVerificationCodeErrorText("");

    navigate("password", {
      state: {
        email,
        selectdSchoolId,
      },
    });
  };
  useEffect(() => {
    if (isValidEmailFormat(email) && selectdSchoolId > 0) {
      setNextButtonActive(true);
    } else setNextButtonActive(false);
  }, [email, selectdSchoolId]);

  useEffect(() => {
    if (email.length === 0 || isValidEmailFormat(email)) {
      setEmailFormatHasError(false);
      return;
    }
    setEmailFormatHasError(true);
  }, [email]);

  return (
    <>
      <CustomFormWrapper>
        <EmailFormWrapper>
          <Label>
            이메일 <Star>*</Star>
          </Label>
          <EmailInputWrapper>
            <EmailInput
              $hasError={hasErrorEmail}
              value={email}
              onChange={handleEmailChange}
            />
          </EmailInputWrapper>
          {emailFormatHasError && (
            <VerificationTimeText $hasError={emailFormatHasError}>
              올바른 이메일 형식이 아닙니다.
            </VerificationTimeText>
          )}
        </EmailFormWrapper>

        <SchoolSelectWrapper>
          <Label>
            학교를 선택해주세요<Star>*</Star>
          </Label>
          <Dropdown schoolList={schoolList} setSchoolId={setSelectedSchoolId} />
        </SchoolSelectWrapper>

        {/* 인증코드 에러. */}
        {verificationCodeErrorText.length > 0 && (
          <VerificationTimeText $hasError={hasErrorEmail}>
            {verificationCodeErrorText}
          </VerificationTimeText>
        )}
      </CustomFormWrapper>

      <NextButtonWrapper>
        <SolidButton
          text="다음"
          onClick={checkVerificationCodeHandler}
          active={nextButtonActive}
        />
      </NextButtonWrapper>
    </>
  );
}
