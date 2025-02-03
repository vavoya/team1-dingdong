import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
// 헤더
export const Header = styled.header`
  display: flex;
  margin: 0px -20px;

  height: 60px;
  padding: 0px 20px; // layout 작업시 빼기
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;

  border-bottom: 1px solid ${colors.gray20};
  background-color: ${colors.white};
`;

export const HeaderLeft = styled.div`
  display: flex;

  align-items: center;
  flex: 1 0 0;
`;

export const HeaderTitle = styled.div`
  color: ${colors.gray100};
  ${fonts.body1SemiBold};
  font-style: normal;
`;
