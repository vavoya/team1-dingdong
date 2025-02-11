import { colors } from "@/styles/colors";
import { Body1SemiBold } from "@/styles/typography";
import styled from "styled-components";

export const LoginHome = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(180deg, #fff 54.33%, #ffedb5 100%);
  `,

  Title: styled.h1`
    font-size: 32px;
    font-weight: bold;
    color: #1e1e1e;
    margin-bottom: 8px;
  `,

  SubTitle: styled.p`
    font-size: 16px;
    color: #4a4a4a;
    margin-bottom: 32px;
  `,

  IconWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  `,

  ButtonWrapper: styled.div`
    width: 100%;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  LoginButton: styled(Body1SemiBold).attrs({ as: "button" })`
    width: 100%;
    padding: 12px;
    background-color: ${colors.orange900};
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  `,

  SignUpButton: styled.button`
    color: ${colors.gray800};
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 162.5% */
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
  `,

  FooterText: styled.p`
    font-size: 12px;
    color: #777;
    margin-top: 20px;
  `,
};
