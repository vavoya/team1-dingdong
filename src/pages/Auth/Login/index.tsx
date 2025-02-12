import PopHeader from "@/components/Headers/PopHeader";

import CustomFormWrapper from "../Components/FormWrapper";
import { NextButtonWrapper } from "../Signup/SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Components/Input";
import { PageTitle, TitleName } from "./styles";
import { ChangeEvent, useEffect, useState } from "react";
import { isValidEmailFormat } from "@/utils/login/emailValidation";
import { colors } from "@/styles/colors";
import { useLogin } from "@/hooks/Login/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { postLoginMutation } = useLogin();

  const [email, setEmail] = useState("");
  const [emailFormatHasError, setEmailFormatHasError] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    if (email.length === 0 || isValidEmailFormat(email)) {
      setEmailFormatHasError(false);
      return;
    }
    setEmailFormatHasError(true);
  }, [email]);

  const loginHandler = () => {
    const loginFormData = { email, password };
    postLoginMutation(loginFormData, {
      onSuccess: () => {
        navigate("/home");
      },
      onError: () => {
        // 에러 발생.
      },
    });
  };
  return (
    <>
      <PopHeader text="" />
      <PageTitle>
        <TitleName>로그인</TitleName>
      </PageTitle>
      <CustomFormWrapper>
        <CustomInput
          hasError={emailFormatHasError}
          label="학교 이메일"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요"
        />
        {emailFormatHasError ? (
          <div style={{ color: colors.red, marginTop: "-20px" }}>
            올바른 이메일 형식이 아닙니다.
          </div>
        ) : (
          <div
            style={{
              color: "transparent",
              marginTop: "-20px",
            }}>
            올바른 이메일 형식이 아닙니다.
          </div>
        )}

        <CustomInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요"
        />
      </CustomFormWrapper>

      <NextButtonWrapper>
        <SolidButton text="다음" onClick={loginHandler} />
      </NextButtonWrapper>
    </>
  );
};

export default Login;
