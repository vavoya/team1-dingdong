import styled from "styled-components";
import {colors} from "@/styles/colors.ts";


export const ToastWrapper = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'translateY'
})<{translateY: string}>`
    position: fixed;
    z-index: 1000;
    left: 20px;
    right: 20px;
    bottom: 0;
    transform: ${({ translateY }) => `translateY(${translateY})`};
    transition: transform 0.3s ease-in-out;
    border-radius: 8px;
    background: ${colors.gray90};
    padding: 10px 14px;

    /* Background Blur */
    backdrop-filter: blur(0.75px);
    
    span {
        color: ${colors.gray0};
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 140%; /* 22.4px */
    }
`