import { colors } from "@/styles/colors";
import styled from "styled-components";
// 버튼을 감싸는 container style
export const ButtonContainer = styled.button`
  display: flex;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;

  color: ${colors.gray100};
  border-radius: 4px;
  border: 1px solid ${colors.gray30};
  background-color: ${colors.gray0};
`;
