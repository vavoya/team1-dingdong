import React, { ChangeEvent, useState } from "react";
import { NameGuideText } from "./styles";
import CustomFormWrapper from "../../Components/FormWrapper";
import CustomInput from "../../Components/Input";
import { NextButtonWrapper } from "../SchoolAuth/styles";
import SolidButton from "@/components/designSystem/Button/SolidButton";
import { useNavigate } from "react-router-dom";
import { SIGNUP_TEXT } from "@/constants/signupTexts";

const UserInfoSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    addressNickname: "",
    contact: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  return (
    <>
      <CustomFormWrapper>
        <CustomInput
          label="이름"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해주세요"
        />

        <NameGuideText>{SIGNUP_TEXT.nameGuideText}</NameGuideText>

        <CustomInput
          label="주소"
          value={formData.address}
          onChange={handleChange}
          placeholder="주소를 입력해주세요"
        />

        <CustomInput
          label="주소 별칭"
          value={formData.addressNickname}
          onChange={handleChange}
          placeholder="주소 별칭을 설정해주세요"
        />
        <CustomInput
          label="연락처"
          value={formData.address}
          onChange={handleChange}
          placeholder="연락처를 입력해주세요"
        />
      </CustomFormWrapper>
      <NextButtonWrapper>
        <SolidButton text="완료" onClick={() => navigate("/home")} />
      </NextButtonWrapper>{" "}
    </>
  );
};

export default UserInfoSignup;
