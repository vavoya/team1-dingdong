import { colors } from "@/styles/colors";
import { Heading2SemiBold } from "@/styles/typography";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
`;

export const Title = styled(Heading2SemiBold)`
  display: flex;
  width: 375px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  gap: 10px;
  color: ${colors.gray100};
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
`;

export const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

export const SubmitButton = styled.button`
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;
  width: 100%;

  &:hover {
    background-color: #bbbbbb;
  }
`;
export const ButtonContainer = styled.div``;
