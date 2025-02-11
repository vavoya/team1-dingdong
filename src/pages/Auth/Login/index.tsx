import PopHeader from "@/components/Headers/PopHeader";

import CustomFormWrapper from "../Components/FormWrapper";
import { NextButtonWrapper } from "../Signup/SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "@/lib/customNav";
import CustomInput from "../Components/Input";
import { PageTitle, TitleName } from "./styles";
import { ChangeEvent, useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <PopHeader text="" />
      <PageTitle>
        <TitleName>로그인</TitleName>
      </PageTitle>
      <CustomFormWrapper>
        <CustomInput
          label="학교 이메일"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력해주세요"
        />

        <CustomInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력해주세요"
        />
      </CustomFormWrapper>

      <NextButtonWrapper>
        <SolidButton text="다음" onClick={() => navigate({ href: "/home" })} />
      </NextButtonWrapper>
    </>
  );
};

export default Login;
