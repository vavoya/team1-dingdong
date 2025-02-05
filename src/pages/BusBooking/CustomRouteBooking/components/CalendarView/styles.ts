import styled from "styled-components";
import { colors } from "@/styles/colors";
import { Detail1Regular, Heading2SemiBold } from "@/styles/typography";

// export const Wrapper = styled.div``;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;
export const CalendarHeader = styled.div`
  display: flex;
  padding: 11px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const MonthNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CurrentMonth = styled(Heading2SemiBold)`
  color: ${colors.gray100};
`;

export const DateHeader = styled.div`
  display: flex;
  height: 20px;
  padding: 0px 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: ${colors.gray70};
`;

export const Weekday = styled(Detail1Regular)`
  color: ${colors.gray70};
  text-align: center;
`;

interface DayProps {
  isToday?: boolean;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

export const CalendarWrapper = styled.div`
  width: 100%;
  padding-bottom: 200px; // 하단 wrapper height 크기만큼
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 7px;
  grid-column-gap: 4.5px;
`;

export const WeekDay = styled.div`
  text-align: center;
  font-size: 0.875rem;
  padding: 8px 0;
`;

export const Day = styled.div<DayProps>`
  text-align: center;
  padding: 8px 0;
  position: relative;
  cursor: pointer;
  color: ${(props) =>
    props.isHighlighted ? colors.orange900 : colors.gray100};
  background-color: ${(props) =>
    props.isHighlighted ? colors.orange50 : "transparent"};
`;
