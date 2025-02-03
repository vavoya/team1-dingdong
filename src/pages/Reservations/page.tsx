import {BookingHistory, PageHeader, PageMain, PageWrapper} from "@/pages/Reservations/styles.ts";
import {useState} from "react";
import CardSlider from "@/pages/Reservations/components/CardSlider";
import BookingActionButton from "@/pages/Reservations/components/BookingActionButton";
import FilterButton from "@/pages/Reservations/components/FilterButton";
import BusSvg from "@/pages/Home/component/BusSvg";


export default function Page() {
    const [filterState, setFilterState] = useState<number>(0)
    const temp = [
        {
            toUniversity: true,
            date: '0',
            location: '0',
            time: '0',
        },{
            toUniversity: true,
            date: '1',
            location: '1',
            time: '1',
        },
        {
            toUniversity: true,
            date: '2',
            location: '2',
            time: '2',
        },
        {
            toUniversity: true,
            date: '3',
            location: '3',
            time: '3',
        },
    ]

    const FilterTextList = [
        "전체",
        "배차 완료",
        "배차 대기",
        "이용 완료",
        "예매 취소"
    ]





    return (
        <PageWrapper>
            <PageHeader.Wrapper>
                <PageHeader.ActionButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2758 24.7492C15.6241 25.1109 16.1889 25.1109 16.5372 24.7492C16.8855 24.3875 16.8855 23.801 16.5372 23.4393L13.0678 19.8366L26.1638 19.8366C26.6256 19.8366 27 19.4622 27 19.0004C27 18.5386 26.6256 18.1642 26.1638 18.1642L13.0671 18.1642L16.5372 14.5607C16.8855 14.199 16.8855 13.6125 16.5372 13.2508C16.1889 12.8891 15.6241 12.8891 15.2758 13.2508L10.3702 18.3451C10.0219 18.7068 10.0219 19.2932 10.3702 19.6549L15.2758 24.7492Z" fill="#222235"/>
                    </svg>
                </PageHeader.ActionButton>
                <PageHeader.Title as="h1">
                    예매 내역
                </PageHeader.Title>
            </PageHeader.Wrapper>
            <PageMain>
                {/* 여기 슬라이드 구현 */}
                <CardSlider data={temp} />
                <BookingHistory.Wrapper>
                    <BookingHistory.FilterPanel>
                        <BookingHistory.FilterScroll>
                            {
                                FilterTextList.map((item, index) => (
                                    <li key={index}>
                                        <FilterButton text={item} isActive={filterState === index} onClick={() => setFilterState(index)}/>
                                    </li>
                                ))
                            }
                        </BookingHistory.FilterScroll>
                    </BookingHistory.FilterPanel>
                    <BookingHistory.SortIndicator>
                        <BookingHistory.SortText>
                            날짜 순
                        </BookingHistory.SortText>
                    </BookingHistory.SortIndicator>
                    <BookingHistory.HistoryScroll>
                        <BookingHistory.HistoryList>
                            <BookingHistory.HistoryItem>
                                <BookingHistory.InfoBox>
                                    <BookingHistory.DateText>
                                        1월 15일 수요일
                                    </BookingHistory.DateText>
                                    <BookingHistory.TripInfo>
                                        <BookingHistory.TripText>
                                            우리집
                                        </BookingHistory.TripText>
                                    <BookingHistory.TripDivide />
                                        <BookingHistory.TripText>
                                            서울대학교 13:00 도착
                                        </BookingHistory.TripText>
                                    </BookingHistory.TripInfo>
                                    <BookingHistory.StatusInfo>
                                        <BusSvg />
                                        <BookingHistory.BusNumber>
                                            버스 01
                                        </BookingHistory.BusNumber>
                                        <BookingHistory.ArrivedAt>
                                            4분 후 도착
                                        </BookingHistory.ArrivedAt>
                                    </BookingHistory.StatusInfo>
                                </BookingHistory.InfoBox>
                                <BookingActionButton disabled={true}/>
                            </BookingHistory.HistoryItem>
                            <BookingHistory.Divide/>
                            <BookingHistory.HistoryItem>
                                <BookingHistory.InfoBox>
                                    <BookingHistory.DateText>
                                        1월 15일 수요일
                                    </BookingHistory.DateText>
                                    <BookingHistory.TripInfo>
                                        <BookingHistory.TripText>
                                            우리집
                                        </BookingHistory.TripText>
                                        <BookingHistory.TripDivide />
                                        <BookingHistory.TripText>
                                            서울대학교 13:00 도착
                                        </BookingHistory.TripText>
                                    </BookingHistory.TripInfo>
                                    <BookingHistory.StatusInfo>
                                        <BookingHistory.Status>
                                            배차 대기
                                        </BookingHistory.Status>
                                    </BookingHistory.StatusInfo>
                                </BookingHistory.InfoBox>
                                <BookingActionButton />
                            </BookingHistory.HistoryItem>
                            <BookingHistory.Divide/>
                            <BookingHistory.HistoryItem>
                                <BookingHistory.InfoBox>
                                    <BookingHistory.DateText>
                                        1월 15일 수요일
                                    </BookingHistory.DateText>
                                    <BookingHistory.TripInfo>
                                        <BookingHistory.TripText>
                                            우리집
                                        </BookingHistory.TripText>
                                        <BookingHistory.TripDivide />
                                        <BookingHistory.TripText>
                                            서울대학교 13:00 도착
                                        </BookingHistory.TripText>
                                    </BookingHistory.TripInfo>
                                    <BookingHistory.StatusInfo>
                                        <BookingHistory.Status>
                                            배차 대기
                                        </BookingHistory.Status>
                                    </BookingHistory.StatusInfo>
                                </BookingHistory.InfoBox>
                                <BookingActionButton />
                            </BookingHistory.HistoryItem>
                            <BookingHistory.Divide/>
                            <BookingHistory.HistoryItem>
                                <BookingHistory.InfoBox>
                                    <BookingHistory.DateText>
                                        1월 15일 수요일
                                    </BookingHistory.DateText>
                                    <BookingHistory.TripInfo>
                                        <BookingHistory.TripText>
                                            우리집
                                        </BookingHistory.TripText>
                                        <BookingHistory.TripDivide />
                                        <BookingHistory.TripText>
                                            서울대학교 13:00 도착
                                        </BookingHistory.TripText>
                                    </BookingHistory.TripInfo>
                                    <BookingHistory.StatusInfo>
                                        <BookingHistory.Status>
                                            배차 대기
                                        </BookingHistory.Status>
                                    </BookingHistory.StatusInfo>
                                </BookingHistory.InfoBox>
                                <BookingActionButton />
                            </BookingHistory.HistoryItem>
                            <BookingHistory.Divide/>
                            <BookingHistory.HistoryItem>
                                <BookingHistory.InfoBox>
                                    <BookingHistory.DateText>
                                        1월 15일 수요일
                                    </BookingHistory.DateText>
                                    <BookingHistory.TripInfo>
                                        <BookingHistory.TripText>
                                            우리집
                                        </BookingHistory.TripText>
                                        <BookingHistory.TripDivide />
                                        <BookingHistory.TripText>
                                            서울대학교 13:00 도착
                                        </BookingHistory.TripText>
                                    </BookingHistory.TripInfo>
                                    <BookingHistory.StatusInfo>
                                        <BookingHistory.Status>
                                            배차 대기
                                        </BookingHistory.Status>
                                    </BookingHistory.StatusInfo>
                                </BookingHistory.InfoBox>
                                <BookingActionButton />
                            </BookingHistory.HistoryItem>
                        </BookingHistory.HistoryList>
                    </BookingHistory.HistoryScroll>
                </BookingHistory.Wrapper>
            </PageMain>
        </PageWrapper>
    )
}

