import styled from "styled-components";

export const PageWrapper = styled.div`
  height: 100%;
  background-color: white;
  padding: 0px 20px;
  width: 100%; // 반응형.
  position: relative;
  @media (min-width: 441px) {
    width: 375px; /* 화면 너비가 440px을 넘으면 375px로 고정 */
  }
`;
