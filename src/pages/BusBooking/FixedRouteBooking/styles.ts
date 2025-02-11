import { colors } from "@/styles/colors";
import styled from "styled-components";

export const ShowSelectedSchedule = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 20px;
  border-top: 1px solid #f3f3f6;
  padding-bottom: 100px;
`;
export const Subtitle = styled.div`
  color: ${colors.gray70};

  font-size: 16px;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;

export const Info = styled.div`
  color: ${colors.gray100};

  font-size: 16px;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;

export const NextButtonContainer = styled.div`
  position: fixed;
  width: inherit;
  bottom: 0;
  background-color: white;
  display: flex;
  padding: 20px;
`;
