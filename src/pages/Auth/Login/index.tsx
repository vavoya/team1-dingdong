import PopHeader from "@/components/Headers/PopHeader";
import {
  Container,
  Title,
  InputLabel,
  StyledInput,
  SubmitButton,
} from "./styles";

const Login = () => {
  return (
    <Container>
      <PopHeader text="" />

      <Title>로그인</Title>

      <InputLabel>학교 이메일</InputLabel>
      <StyledInput type="email" placeholder="이메일을 입력해주세요" />

      <InputLabel>비밀번호</InputLabel>
      <StyledInput type="password" placeholder="비밀번호를 입력해주세요" />

      <SubmitButton>다음</SubmitButton>
    </Container>
  );
};

export default Login;
