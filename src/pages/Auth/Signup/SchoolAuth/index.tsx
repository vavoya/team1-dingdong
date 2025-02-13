import { useState, ChangeEvent, useEffect } from "react";
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
import {
  usePostUserSchoolEmail,
  usePostUserVerificationCode,
} from "@/hooks/SignUp/useSignUp";
import { useTimer } from "@/hooks/SignUp/useTimer";
import { isValidEmailFormat } from "@/utils/login/emailValidation";

export default function SchoolAuthSignUp() {
  const [email, setEmail] = useState("");
  const [emailFormatHasError, setEmailFormatHasError] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sendEmailButtonClicked, setSendEmailButtonClicked] = useState(false);
  const [nextButtonActive, setNextButtonActive] = useState(false);

  const [emailErrorText, setEmailErrorText] = useState("");
  const [hasErrorEmail, setHasErrorEmail] = useState(false && email.length > 0);

  const [verificationCodeErrorText, setVerificationCodeErrorText] =
    useState("");
  const [hasErrorCode, setHasErrorCode] = useState(
    false && verificationCode.length > 0
  );

  const navigate = useNavigate();

  const { formattedTime, isExpired } = useTimer(5); // 인증코드 타이머.

  const { postUserSchoolEmailMutation } = usePostUserSchoolEmail();
  const { postUserVerificationCodeMutation } = usePostUserVerificationCode();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const certifiedEmail = () => {
    setEmailErrorText("");
    setHasErrorEmail(false);
  };
  const notCertifiedEmail = () => {
    setEmailErrorText("제휴 대학이 아닙니다");
    setHasErrorEmail(true);
    setTimeout(() => {
      setEmailErrorText(""); // emailFormatError와 겹치기 피하기.
    }, 3000);
  };
  const clickedEmailSendButton = () => {
    setSendEmailButtonClicked(true);
    postUserSchoolEmailMutation(email, {
      onSuccess: () => {
        certifiedEmail();
      },
      onError: () => {
        notCertifiedEmail();
      },
    });
  };

  const checkVerificationCodeHandler = () => {
    postUserVerificationCodeMutation(verificationCode, {
      onSuccess: () => {
        setVerificationCodeErrorText("");
        setHasErrorCode(false);
        navigate("password", {
          state: {
            email,
          },
        });
      },
      onError: () => {
        setVerificationCodeErrorText("올바른 인증 코드가 아닙니다.");
        setHasErrorCode(true);
      },
    });
  };
  useEffect(() => {
    if (
      email.length > 0 &&
      verificationCode.length > 0 &&
      sendEmailButtonClicked
    ) {
      setNextButtonActive(true);
    } else setNextButtonActive(false);
  }, [email, verificationCode, sendEmailButtonClicked]);

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
            학교 이메일 <Star>*</Star>
          </Label>
          <EmailInputWrapper>
            <EmailInput
              $hasError={hasErrorEmail}
              value={email}
              onChange={handleEmailChange}
            />
            <VerifyButton
              disabled={emailFormatHasError}
              $active={!emailFormatHasError && email.length > 0}
              onClick={clickedEmailSendButton}
            >
              전송
            </VerifyButton>
          </EmailInputWrapper>
          {emailFormatHasError && (
            <VerificationTimeText $hasError={emailFormatHasError}>
              올바른 이메일 형식이 아닙니다.
            </VerificationTimeText>
          )}
          {!hasErrorEmail && sendEmailButtonClicked && !isExpired ? (
            <VerificationTimeText $hasError={hasErrorEmail}>
              인증 코드 유효 시간: {formattedTime}
            </VerificationTimeText>
          ) : (
            <>
              <VerificationTimeText $hasError={hasErrorEmail}>
                {emailErrorText}
              </VerificationTimeText>
            </>
          )}
        </EmailFormWrapper>

        <CustomInput
          hasError={hasErrorCode}
          label="인증 코드를 입력해주세요"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="6자리 코드"
        />

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
