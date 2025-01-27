import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* CSS 변수 정의 */
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #333;
    --background-color: #f5f5f5;
    --font-family: 'Roboto', sans-serif;
    --max-width: 1200px;
  }

  /* 기본적인 전역 스타일 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: var(--font-family);
    background-color: var(--background-color);
    color: var(--text-color);
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
    color: var(--primary-color);
    transition: all 0.3s ease-in-out;
  }

  a:hover {
    color: var(--secondary-color);
  }

  /* 기본 버튼 스타일 */
  button {
    font-family: inherit;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--primary-color);
    color: white;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--secondary-color);
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
