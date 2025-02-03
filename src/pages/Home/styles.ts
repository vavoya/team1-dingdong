import styled from "styled-components";
import { colors } from "@/styles/colors.ts";
import { radius } from "@/styles/radius.ts";
import {
    Body1Medium,
    Body1SemiBold,
    Body2Medium, Body2Regular, Body2SemiBold, Detail1Medium, Detail1Regular,
    Heading1Bold,
    Heading2Bold,
    Heading2SemiBold
} from "@/styles/typography.ts";
import { CTAButtonA } from "@/styles/buttons.ts";

export const PageWrapper = styled.div`
    max-width: 440px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${colors.gray20 || "#F3F3F6"};
`;

export const PageHeader = {
    Wrapper: styled.header`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        margin: 0 20px;
    `,
    Title: styled.h1`
        font-family: Happiness-Sans-Title, sans-serif;
        color: ${colors.gray50};
        font-size: 20px;
    `,
    NavList: styled.ul`
        display: flex;
    `,
    NavButton: styled.button`
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    `
};

export const PageMain = styled.main`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

// 객체를 생성할 때 as const를 사용하여 타입을 보장합니다
export const BusSelection = (() => {
    const ButtonWrapper = styled.button`
        display: flex;
        justify-content: center;
        height: 200px;
        flex: 1;
        padding: 20px;
        flex-shrink: 0;
        border-radius: ${radius.medium}px;
    `;

    return {
        Wrapper: styled.section`
            display: flex;
            margin: 0 20px;
            justify-content: space-between;
            gap: 10px;
        `,
        LeftButton: styled(ButtonWrapper)`
            background: linear-gradient(204deg, ${colors.orange200} 5.11%, ${colors.orange500} 93.09%);
        `,
        RightButton: styled(ButtonWrapper)`
            background: linear-gradient(157deg, #DDEFFF 25.41%, #AFD5FF 95.5%);
        `,
        Content: styled.div`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            height: 100%;
        `,
        Info: styled.div`
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        `,
        Title: styled(Heading1Bold)`
            font-family: Pretendard, serif;
            font-style: normal;
        `,
        Detail: styled(Body2Medium)`
            font-family: Pretendard, serif;
            font-style: normal;
            color: ${colors.gray70};
            text-align: left;
        `,
        SvgContainer: styled.div`
            max-width: 122px;
            align-items: center;
            svg {
                width: 100%;
            }
        `
    };
})();

export const HomeSchool = {
    Wrapper: styled.section`
        margin: 0 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        border-radius: ${radius.medium || 12}px;
        background: ${colors.gray0 || "#FFF"};
    `,
    Content: styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        width: 100%;
    `,
    Row: styled.div`
        display: flex;
        height: 24px;
        align-items: center;
        gap: 4px;
    `,
    Text: styled(Body2Medium)`
        color: ${colors.gray70};
        text-align: center;
        font-style: normal;
    `,
    Button: styled.button`
        display: flex;
        width: 14px;
        height: 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `,
    Title: styled(Heading2SemiBold)`
        color: ${colors.gray100};
        text-align: center;
        font-family: Pretendard, serif;
        font-style: normal;
    `,
    Divider: styled.div`
        width: 0px;
        height: 52px;
        border: solid 0.5px #F3F3F6;
    `
};

export const BusState = {
    Wrapper: styled.section`
        width: 100%;
        display: flex;
        flex-direction: column;
        background: ${colors.gray0};
    `,
    Header: styled.header`
        display: flex;
        padding: 24px 20px 10px 20px;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
    `,
    HeaderLeftSection: styled.div`
        display: flex;
        align-items: center;
        gap: 4px;
    `,
    HeaderTitle: styled.span`
        color: ${colors.gray100};
        font-family: Pretendard, serif;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 150%;
    `,
    HeaderRightSection: styled.div`
        display: flex;
        align-items: center;
        gap: 4px;
    `,
    HeaderInfoText: styled.span`
        color: ${colors.gray70};
        font-family: Pretendard, serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
    `,
    HeaderActionButton: styled.button`
        display: flex;
        width: 14px;
        height: 24px;
        justify-content: center;
        align-items: center;
        gap: 10px;
    `,
    CardList: styled.ul`
        display: flex;
        padding: 0 20px;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        align-self: stretch;
    `,
    Card: styled.li`
        display: flex;
        padding: 20px;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;

        border-radius: ${radius.medium}px;
        border: 1px solid ${colors.gray30};
        background: ${colors.gray0};
    `,
    CardHeader: styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    `,
    CardInfo: styled.div`
        display: flex;
        gap: 8px;
    `,
    CardTIme: styled(Heading2Bold)`
        color: ${colors.gray100};
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    CardLocation: styled(Body1Medium)`
        color: ${colors.gray100};
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    CardState: styled.div`
        display: flex;
        height: 28px;
        padding: 10px 8px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 4px;
        background: ${colors.gray20};
    `,
    CardStateText: styled(Detail1Medium)`
        color: ${colors.gray70};
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    CardBusInfo: styled.div`
        display: flex;
        gap: 4px;
        margin-bottom: 4px;
        align-items: center;
    `,
    CardBusNumber: styled(Body2SemiBold)`
        color: #0080FF;
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    ArrivalTime: styled(Body2Medium)`
        color: #FF1E00;
        text-align: right;
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    CardDestination: styled.div`
        display: flex;
        gap: 8px;
    `,
    CardDestinationText: styled(Body2Regular)`
        color: ${colors.gray70};
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    Divider: styled.div`
        width: 0px;
        height: 14px;
        border: solid 0.5px ${colors.gray30};
    `,
    CardAction: styled.button`
        margin-top: 10px;
        display: flex;
        padding: 10px 0px;
        justify-content: center;
        align-items: center;
        gap: 4px;
        align-self: stretch;

        border-radius: 8px;
        border: 1px solid ${colors.gray30};
        background: ${colors.gray0}
    `,
    CardActionText: styled(Detail1Regular)`
        color: ${colors.gray100};
        font-family: Pretendard,serif;
        font-style: normal;
    `
};

export const BusReservation = {
    Wrapper: styled.div`
        display: flex;
        padding: 12px 20px 20px 20px;
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        align-self: stretch;
    `,
    TextBox: styled.div`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    `,
    Title: styled(Heading2SemiBold)`
        color: ${colors.gray100};
        font-family: Pretendard, serif;
        font-style: normal;
    `,
    Detail: styled(Body2Medium)`
        color: ${colors.gray70};
        font-family: Pretendard, serif;
        font-style: normal;
    `,
    ReserveButton: styled(CTAButtonA)``,
    ReserveButtonText: styled(Body1SemiBold)`
        color: ${colors.gray0};
        font-family: Pretendard, serif;
        font-style: normal;
    `
};
