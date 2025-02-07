import styled from "styled-components";
import { colors } from "@/styles/colors.ts";
import { Body1SemiBold } from "@/styles/typography.ts";

export const Wrapper = styled.div`
  display: flex;
  height: 60px;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

export const NavButton = styled.button`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
`;

export const Title = styled(Body1SemiBold)`
  color: ${colors.gray100};
`;
