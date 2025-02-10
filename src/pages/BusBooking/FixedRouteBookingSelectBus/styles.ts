import styled from "styled-components";

import { colors } from "@/styles/colors";
import { Body1Medium, Body2Medium } from "@/styles/typography";

export const PageWrapper = styled.div``;
export const RouteMarkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray20};
  width: 100%;
`;

export const HeaderText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Departure = styled(Body1Medium)`
  color: ${colors.gray100};
`;

export const Arrival = styled(Body1Medium)`
  color: ${colors.gray100};
`;

export const ArrowRightIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: "→";
    color: ${colors.gray70};
  }
`;

export const BusTicketInfo = styled(Body2Medium)`
  color: ${colors.gray70};
`;
