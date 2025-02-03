import styled from "styled-components";
import {
    Body1SemiBold,
    Body2Medium,
    Body2Regular,
    Body2SemiBold,
    Detail1Regular
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

export const BookingHistory = {
    Wrapper: styled.section`
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 0px;
        height: 100%;
    `,
    FilterPanel: styled.div`
        position: relative;
        padding: 20px 0;
        width: 100%;
        min-width: 0px;
        overflow: scroll;
        white-space: nowrap; /* 자식 요소들이 줄바꿈되지 않도록 설정 */
        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari에서 스크롤바 숨기기 */
        }
        /* 좌우 20px씩 페이드 효과 */
        mask-image: linear-gradient(to right, rgba(255, 255, 255, 0), white 20px, white calc(100% - 20px), rgba(255, 255, 255, 0));
    `,
    FilterScroll: styled.ul`
        padding: 0 20px;
        width: fit-content;
        display: flex;
        gap: 8px;
    `,
    FilterButton: styled.button.withConfig({
        shouldForwardProp: (prop) => prop !== "isActive"
    })<{isActive: boolean}>`
        display: flex;
        padding: 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 99px;
        
        ${({ isActive }) => isActive ? 
                `border: 1px solid ${colors.orange900}; background-color: ${colors.orange100};` : 
                `border: 1px solid ${colors.gray30};`}
    `,
    FilterText: styled(Body2Regular).withConfig({
        shouldForwardProp: (prop) => prop !== "isActive"
    })<{isActive: boolean}>`
        color: ${({isActive}) => isActive ? colors.orange900 : colors.gray100};

        /* Body 2/Regular */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    SortIndicator: styled.div`
        padding: 0 20px 3px;
        text-align: right;
    `,
    SortText: styled(Body2Regular)`
        color: ${colors.gray70};

        /* Body 2/Regular */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    HistoryScroll: styled.div`
        min-height: 0;
        overflow: scroll;

        mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), white 20px, white calc(100% - 20px), rgba(255, 255, 255, 0));
    `,
    HistoryList: styled.ul`
        display: flex;
        padding: 20px;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    `,
    HistoryItem: styled.li`
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    `,
    InfoBox: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;
    `,
    DateText: styled(Body2Regular)`
        color: ${colors.gray70};

        /* Body 2/Regular */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    TripInfo: styled.div`
        display: flex;
        align-items: center;
        gap: 6px;
    `,
    TripText: styled(Body2Medium)`
        color: ${colors.gray100};

        /* Body 2/Medium */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    TripDivide: styled.div`
        width: 0;
        height: 14px;
        border: 0.5px solid ${colors.gray30};
    `,
    StatusInfo: styled.div`
        display: flex;
        gap: 4px;
        align-items: center;
    `,
    BusNumber: styled(Body2SemiBold)`
        color: #0080FF;

        /* Body 2/Semibold */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    Status: styled(Detail1Regular)`
        color: ${colors.gray70};

        /* Detail 1/Regular */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    ArrivedAt: styled(Body2Regular)`
        color: #FF1E00;

        /* Body 2/Medium */
        font-family: Pretendard,serif;
        font-style: normal;
    `,
    Divide: styled.div`
        width: 100%;
        height: 0;
        border: 0.5px solid ${colors.gray20};
    `,
}