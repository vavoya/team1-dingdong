import { colors } from "@/styles/colors";
import styled from "styled-components";

export const ButtonContainer = styled.button<{
  active: boolean;
  clicked: boolean;
}>`
  background-color: ${(props) =>
    props.active ? colors.orange900 : colors.gray40};

  background-color: ${(props) => props.clicked && colors.orangeHover};

  &:hover {
    background-color: ${colors.orangeHover};
  }
  color: ${colors.white};
  width: auto;
  display: flex;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
`;
