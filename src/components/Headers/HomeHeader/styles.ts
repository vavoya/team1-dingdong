import styled from "styled-components";
import {colors} from "@/styles/colors.ts";

export const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin: 0 20px;
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