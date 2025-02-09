// 스타일
import {
    CardList,
    Header,
    HeaderActionButton,
    HeaderInfoText,
    HeaderLeftSection,
    HeaderRightSection,
    HeaderTitle,
    Wrapper
} from "@/pages/Home/component/BusState/styles.ts";
// 컴포넌트
import ArrowRightIcon from "@/components/designSystem/Icons/Home/ArrowRightIcon.tsx";
import BusReservation from "@/pages/Home/component/BusReservation";
import BusStateCard from "@/pages/Home/component/BusStateCard";

interface BusStateProps {
    type?: number;
}
export default function BusState({type = 0}: BusStateProps) {


    return (
        <Wrapper>
            <Header>
                <HeaderLeftSection>
                    <HeaderTitle>
                        예매
                    </HeaderTitle>
                    <HeaderTitle>
                        0
                    </HeaderTitle>
                </HeaderLeftSection>
                <HeaderRightSection>
                    <HeaderInfoText>
                        전체보기
                    </HeaderInfoText>
                    <HeaderActionButton>
                        <ArrowRightIcon/>
                    </HeaderActionButton>
                </HeaderRightSection>
            </Header>
            {
                type === 0 ?
                    <CardList>
                        <BusStateCard />
                        <BusStateCard type={1} />
                    </CardList>:
                    <BusReservation />
            }
        </Wrapper>
    );
}


