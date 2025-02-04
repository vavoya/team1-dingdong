// 스타일
import {
    Content,
    Detail,
    Info,
    LeftButton, RightButton,
    SvgContainer,
    Title,
    Wrapper
} from "@/pages/Home/component/BusSelection/styles.ts";
// 컴포넌트
import BusSelectionIconA from "@/components/designSystem/Icons/Home/BusSelectionIconA.tsx";
import BusSelectionIconB from "@/components/designSystem/Icons/Home/BusSelectionIconB.tsx";


export default function BusSelection() {


    return (
        <Wrapper>
            <LeftButton>
                <Content>
                    <Info>
                        <Title>
                            버스 예약
                        </Title>
                        <Detail>
                            집 앞까지 오는 버스
                        </Detail>
                    </Info>
                    <SvgContainer>
                        <BusSelectionIconA/>
                    </SvgContainer>
                </Content>
            </LeftButton>
            <RightButton>
                <Content>
                    <Info>
                        <Title>
                            함께 타기
                        </Title>
                        <Detail>
                            출발이 확정된 버스
                        </Detail>
                    </Info>
                    <SvgContainer>
                        <BusSelectionIconB/>
                    </SvgContainer>
                </Content>
            </RightButton>
        </Wrapper>
    );
}