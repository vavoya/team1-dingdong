import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #ff8a3d;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 0;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Required = styled.span`
  color: #ff0000;
  margin-left: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #666;
  }

  &::placeholder {
    color: #999;
  }
`;

export const CompleteButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #cccccc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;

  &:hover {
    background-color: #bbbbbb;
  }
`;
