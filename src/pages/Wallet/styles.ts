import styled from "styled-components";
import {Body1SemiBold, Body2Medium, Body2Regular, Heading2SemiBold} from "@/styles/typography.ts";
import {colors} from "@/styles/colors.ts";
import {CTAButtonA, CTAButtonB} from "@/styles/buttons.ts";

const DIVFlexColumns = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
`

export const Title = styled(Heading2SemiBold)`
    color: ${colors.gray100};
    margin-top: 10px;
    margin-bottom: 4px;
`

export const SubTitle = styled(Body2Medium)`
    color: ${colors.gray70};
`

export const CardBox = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px 0;
`

export const ButtonBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    padding: 20px 0;
`

export const SendButton = styled(CTAButtonB)`
    flex: 1;
    
`
export const RechargeButton = styled(CTAButtonA)`
    flex: 1;
`

export const ButtonText = styled(Body1SemiBold).withConfig(({shouldForwardProp: prop => prop !== 'color'}))<{color: string}>`
    color: ${({ color }) => color};
`

export const PageDivider = styled.div`
    width: 100%;
    height: 0;
    border: 0.5px solid ${colors.gray30};
`

export const HistoryList = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    padding: 20px 0;
`

export const History = styled.li`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const HistoryStatusBox = styled(DIVFlexColumns)`
    align-items: flex-start;
`
export const HistoryStatus = styled(Body1SemiBold).withConfig({shouldForwardProp: prop => prop !== 'isDeposit'})<{isDeposit: boolean}>`
    color: ${({isDeposit}) => isDeposit ? colors.blue200 : colors.red100};
`

export const HistoryDate = styled(Body2Regular)`
    color: ${colors.gray90}
`

export const HistoryAmountBox = styled(DIVFlexColumns)`
    align-items: flex-end;
`

export const HistoryAmount = styled(Body1SemiBold)`
    color: ${colors.gray90};
`

export const HistoryBalance = styled(Body2Regular)`
    color: ${colors.gray90};
`