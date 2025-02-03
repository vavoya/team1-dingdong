
import {
    PageWrapper, PageHeader, PageMain, BusSelection, HomeSchool, BusState, BusReservation
} from "@/pages/Home/styles.ts"
import BusSelectionSvgA from "@/pages/Home/component/BusSelectionSvgA";
import BusSelectionSvgB from "@/pages/Home/component/BusSelectionSvgB";
import BellSvg from "@/pages/Home/component/BellSvg";
import UserSvg from "@/pages/Home/component/UserSvg";
import UniversitySvg from "@/pages/Home/component/UniversitySvg";
import HomeSvg from "@/pages/Home/component/HomeSvg";
import ArrowRightSvg from "@/pages/Home/component/ArrowRightSvg";
import BusSvg from "@/pages/Home/component/BusSvg";



export default function Page() {


    return (
        <PageWrapper>
            <PageHeader.Wrapper>
                <PageHeader.Title>
                    DingDong
                </PageHeader.Title>
                <PageHeader.NavList>
                    <li>
                        <PageHeader.NavButton>
                            <BellSvg />
                        </PageHeader.NavButton>
                    </li>
                    <li>
                        <PageHeader.NavButton>
                            <UserSvg />
                        </PageHeader.NavButton>
                    </li>
                </PageHeader.NavList>
            </PageHeader.Wrapper>
            <PageMain>
                <BusSelection.Wrapper>
                    <BusSelection.LeftButton>
                        <BusSelection.Content>
                            <BusSelection.Info>
                                <BusSelection.Title>
                                    버스 예약
                                </BusSelection.Title>
                                <BusSelection.Detail>
                                    집 앞까지 오는 버스
                                </BusSelection.Detail>
                            </BusSelection.Info>
                            <BusSelection.SvgContainer>
                                <BusSelectionSvgA />
                            </BusSelection.SvgContainer>
                        </BusSelection.Content>
                    </BusSelection.LeftButton>
                    <BusSelection.RightButton>
                        <BusSelection.Content>
                            <BusSelection.Info>
                                <BusSelection.Title>
                                    함께 타기
                                </BusSelection.Title>
                                <BusSelection.Detail>
                                    출발이 확정된 버스
                                </BusSelection.Detail>
                            </BusSelection.Info>
                            <BusSelection.SvgContainer>
                                <BusSelectionSvgB />
                            </BusSelection.SvgContainer>
                        </BusSelection.Content>
                    </BusSelection.RightButton>
                </BusSelection.Wrapper>
                <HomeSchool.Wrapper>
                    <HomeSchool.Content>
                        <HomeSchool.Row>
                            <HomeSvg />
                            <HomeSchool.Text>
                                집 위치
                            </HomeSchool.Text>
                            <HomeSchool.Button>
                                <ArrowRightSvg />
                            </HomeSchool.Button>
                        </HomeSchool.Row>
                        <HomeSchool.Title>
                            우리집
                        </HomeSchool.Title>
                    </HomeSchool.Content>
                    <HomeSchool.Divider />
                    <HomeSchool.Content>
                        <HomeSchool.Row>
                            <UniversitySvg />
                            <HomeSchool.Text>
                                학교
                            </HomeSchool.Text>
                        </HomeSchool.Row>
                        <HomeSchool.Title>
                            서울대학교
                        </HomeSchool.Title>
                    </HomeSchool.Content>
                </HomeSchool.Wrapper>
                <BusState.Wrapper>
                    <BusState.Header>
                        <BusState.HeaderLeftSection>
                            <BusState.HeaderTitle>
                                예매
                            </BusState.HeaderTitle>
                            <BusState.HeaderTitle>
                                0
                            </BusState.HeaderTitle>
                        </BusState.HeaderLeftSection>
                        <BusState.HeaderRightSection>
                            <BusState.HeaderInfoText>
                                전체보기
                            </BusState.HeaderInfoText>
                            <BusState.HeaderActionButton>
                                <ArrowRightSvg />
                            </BusState.HeaderActionButton>
                        </BusState.HeaderRightSection>
                    </BusState.Header>
                    <BusState.CardList>
                        <BusState.Card>
                            <BusState.CardHeader>
                                <BusState.CardInfo>
                                    <BusState.CardTIme>
                                        오늘 12:00
                                    </BusState.CardTIme>
                                    <BusState.CardLocation>
                                        학동역 탑승
                                    </BusState.CardLocation>
                                </BusState.CardInfo>
                                <BusState.CardState>
                                    <BusState.CardStateText>
                                        배차 대기
                                    </BusState.CardStateText>
                                </BusState.CardState>
                            </BusState.CardHeader>
                            <BusState.CardBusInfo>
                                <BusSvg />
                                <BusState.CardBusNumber>
                                    버스01
                                </BusState.CardBusNumber>
                                <BusState.ArrivalTime>
                                    4분 후 도착
                                </BusState.ArrivalTime>
                            </BusState.CardBusInfo>
                            <BusState.CardDestination>
                                <BusState.CardDestinationText>
                                    13:00 학교 도착
                                </BusState.CardDestinationText>
                                <BusState.Divider />
                                <BusState.CardDestinationText>
                                    45분 소요
                                </BusState.CardDestinationText>
                            </BusState.CardDestination>
                            <BusState.CardAction>
                                <BusState.CardActionText>
                                    실시간 버스 위치 확인
                                </BusState.CardActionText>
                                <ArrowRightSvg />
                            </BusState.CardAction>
                        </BusState.Card>
                        <BusState.Card>
                            <BusState.CardHeader>
                                <BusState.CardInfo>
                                    <BusState.CardTIme>
                                        01.22(수)
                                    </BusState.CardTIme>
                                    <BusState.CardLocation>
                                        우리집 탑승
                                    </BusState.CardLocation>
                                </BusState.CardInfo>
                                <BusState.CardState>
                                    <BusState.CardStateText>
                                        배차 대기
                                    </BusState.CardStateText>
                                </BusState.CardState>
                            </BusState.CardHeader>
                            <BusState.CardDestination>
                                <BusState.CardDestinationText>
                                    13:00 학교 도착
                                </BusState.CardDestinationText>
                            </BusState.CardDestination>
                        </BusState.Card>
                    </BusState.CardList>
                    <BusReservation.Wrapper>
                        <BusReservation.TextBox>
                            <BusReservation.Title>
                                등하교 버스를 예매해볼까요?
                            </BusReservation.Title>
                            <BusReservation.Detail>
                                아직 예매 내역이 없어요!
                            </BusReservation.Detail>
                        </BusReservation.TextBox>
                        <BusReservation.ReserveButton>
                            <BusReservation.ReserveButtonText>
                                예매하러 가기
                            </BusReservation.ReserveButtonText>
                        </BusReservation.ReserveButton>
                    </BusReservation.Wrapper>
                </BusState.Wrapper>
            </PageMain>
        </PageWrapper>
    );
}


