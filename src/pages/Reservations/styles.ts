import styled from "styled-components";
import {
    Body1SemiBold,
} from "@/styles/typography.ts";
import {colors} from "@/styles/colors.ts";


export const PageWrapper = styled.div`
    max-width: 440px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const PageHeader = {
    Wrapper: styled.header`
        padding: 0 20px;
        height: 60px;
        display: flex;
        align-items: center;
    `,
    ActionButton: styled.button`
        width: 38px;
        height: 38px;
    `,
    Title: styled(Body1SemiBold)`
        color: ${colors.gray100};
        font-family: Pretendard,serif;
        font-style: normal;
    `
}

export const PageMain = styled.main`
    display: flex;
    flex-direction: column;
    min-height: 0;
`