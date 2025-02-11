import React, { ChangeEvent, useState } from "react";
import {
  Container,
  Header,
  CloseButton,
  Title,
  TitleWrapper,
  ProfileIcon,
  FormGroup,
  Label,
  Required,
  Input,
  CompleteButton,
} from "./styles";

const UserInfoSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    addressDetail: "",
    contact: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Title>회원가입</Title>
          <ProfileIcon>J</ProfileIcon>
        </TitleWrapper>
        <CloseButton>×</CloseButton>
      </Header>

      <FormGroup>
        <Label>
          이름 <Required>*</Required>
        </Label>
        <Input
          name="name"
          placeholder="이름을 입력해주세요"
          value={formData.name}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          주소 <Required>*</Required>
        </Label>
        <Input
          name="address"
          placeholder="주소를 입력해주세요"
          value={formData.address}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          주소 상세 <Required>*</Required>
        </Label>
        <Input
          name="addressDetail"
          placeholder="주소 상세을 설정해주세요"
          value={formData.addressDetail}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>
          연락처 <Required>*</Required>
        </Label>
        <Input
          name="contact"
          placeholder="연락처를 입력해주세요"
          value={formData.contact}
          onChange={handleChange}
        />
      </FormGroup>

      <CompleteButton>완료</CompleteButton>
    </Container>
  );
};

export default UserInfoSignup;
