import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  font-display: swap;
  src:
    local('Pretendard Bold'),
    url('/src/assets/fonts/Pretendard-Bold.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  font-display: swap;
  src:
    local('Pretendard SemiBold'),
    url('/src/assets/fonts/Pretendard-SemiBold.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  font-display: swap;
  src:
    local('Pretendard Medium'),
    url('/src/assets/fonts/Pretendard-Medium.subset.woff2') format('woff2');
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  font-display: swap;
  src:
    local('Pretendard Regular'),
    url('/src/assets/fonts/Pretendard-Regular.subset.woff2') format('woff2');
}
  /* CSS 변수 정의 */
  #root {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  /* 기본적인 전역 스타일 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family:'Pretendard', sans-serif;
    background-color: ${colors.gray10};
    line-height: 1.6;
    font-size: 16px;
  }

  /* 폰트 스타일 */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    line-height: 1.2;
    color: var(--primary-color);
  }

  /* 링크 기본 스타일 */
  a {
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  

  /* 기본 버튼 스타일 */
  button {
    font-family: inherit;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    color: white;
    transition: background-color 0.3s ease;
  }



  /* 컨테이너 레이아웃 설정 */
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 20px;
  }

  /* 스크롤바 커스텀 스타일 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }

  /* 미디어 쿼리 예제 */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
