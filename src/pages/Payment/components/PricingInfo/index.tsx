import {
    InfoLine, InfoLineDivider, InfoText, InfoTextBold,
    InfoTitle,
    InfoTitleBox,
    Title,
    Wrapper
} from "@/pages/Payment/components/PricingInfo/styles.ts";


export default function PricingInfo() {
    return (
        <Wrapper>
            <Title>요금 정보</Title>
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