import React, { useState, ChangeEvent } from "react";
import {
  Container,
  Header,
  CloseButton,
  Title,
  FormGroup,
  Label,
  Required,
  PasswordInput,
  ValidationText,
  NextButton,
} from "./styles";

export default function PasswordSignup() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>회원가입</Title>
        <CloseButton>×</CloseButton>
      </Header>

      <FormGroup>
        <Label>
          비밀번호 <Required>*</Required>
        </Label>
        <PasswordInput
          type="password"
          placeholder="8자 이상의 비밀번호"
          value={password}
          onChange={handlePasswordChange}
        />
        <ValidationText>
          최소 8자 이상, 최대 20자 이하,
          <br />
          영문 대문자, 소문자, 숫자, 특수문자 포함
        </ValidationText>
      </FormGroup>

      <FormGroup>
        <Label>
          비밀번호 확인 <Required>*</Required>
        </Label>
        <PasswordInput
          type="password"
          placeholder="8자 이상의 비밀번호"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </FormGroup>

      <NextButton>다음</NextButton>
    </Container>
  );
}
