import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Header,
  CloseButton,
  Title,
  FormGroup,
  Label,
  Required,
  EmailInputWrapper,
  EmailInput,
  VerifyButton,
  VerificationTimeText,
  VerificationCodeInput,
  VerificationGuideText,
  NextButton,
} from "./styles";

const SignupVerification: React.FC = () => {
  const [email, setEmail] = useState("abcd1234@snu.ac.kr");
  const [verificationCode, setVerificationCode] = useState("123456");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>회원가입</Title>
        <CloseButton>×</CloseButton>
      </Header>

      <FormGroup>
        <Label>
          학교 이메일 <Required>*</Required>
        </Label>
        <EmailInputWrapper>
          <EmailInput value={email} onChange={handleEmailChange} />
          <VerifyButton>전송</VerifyButton>
        </EmailInputWrapper>
        <VerificationTimeText>
          인증 코드 유효 시간: 1분 34초
        </VerificationTimeText>
      </FormGroup>

      <FormGroup>
        <VerificationGuideText>인증 코드를 입력해주세요</VerificationGuideText>
        <VerificationCodeInput
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          maxLength={6}
        />
      </FormGroup>

      <NextButton>다음</NextButton>
    </Container>
  );
};

export default SignupVerification;
