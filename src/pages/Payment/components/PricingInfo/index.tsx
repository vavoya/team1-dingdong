import {
    InfoLine, InfoLineDivider, InfoText, InfoTextBold,
    InfoTitle,
    InfoTitleBox,
    TItle,
    Wrapper
} from "@/pages/Payment/components/PricingInfo/styles.ts";


export default function PricingInfo() {
    return (
        <Wrapper>
            <TItle>요금 정보</TItle>
            <InfoLine>
                <InfoTitleBox>
                    <InfoTitle>금액</InfoTitle>
                    <InfoTitle>|</InfoTitle>
                    <InfoTitle>1회</InfoTitle>
                </InfoTitleBox>
                <InfoText>1,000원</InfoText>
            </InfoLine>
            <InfoLine>
                <InfoTitle>딩동머니 잔액</InfoTitle>
                <InfoText>10,000원</InfoText>
            </InfoLine>
            <InfoLineDivider />
            <InfoLine>
                <InfoTitle>최종 결제 금액</InfoTitle>
                <InfoTextBold>1,000원</InfoTextBold>
            </InfoLine>
        </Wrapper>
    );
}