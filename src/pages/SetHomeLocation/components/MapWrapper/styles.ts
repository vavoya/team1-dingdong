import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

// 위치
export const MapContainer = styled.div``;
export const MapWrapper = styled.section`
  margin: 0px -20px;
  height: calc(100% - 60px);
`;

export const PinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PinMark = styled.div`
  display: flex;
  width: 190px;
  height: 58px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  border-radius: 8px;
  background-color: ${colors.gray90};
`;

export const PinTitle = styled.div`
  color: ${colors.orange900};
  text-align: center;
  ${fonts.body2SemiBold}
  font-style: normal;
`;
export const PinDescription = styled.div`
  color: ${colors.white};
  text-align: center;
  ${fonts.detail1Regular}
  font-style: normal;
`;
