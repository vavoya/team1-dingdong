import styled from "styled-components";
import {colors} from "@/styles/colors.ts";

export const Wrapper = styled.header`
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    height: 60px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    background: ${colors.gray20};
`

export const NavList = styled.ul`
    display: flex;
`

export const NavButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h1`
    font-family: Happiness-Sans-Title, sans-serif;
    color: ${colors.gray50};
    font-size: 20px;
`