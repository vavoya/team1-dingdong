import { Body2Regular } from "@/styles/typography";
import styled from "styled-components";

export const PasswordGuidText = styled(Body2Regular)<{ $textColor: string }>`
  color: ${(props) => props.$textColor};
  margin-top: -10px;
  height: 40px;
`;
