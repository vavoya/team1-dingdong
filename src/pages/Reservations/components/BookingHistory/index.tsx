import FilterButton from "@/pages/Reservations/components/FilterButton";
import BusIcon from "@/components/designSystem/Icons/Home/BusIcon.tsx";
import BookingActionButton from "@/pages/Reservations/components/BookingActionButton";
import {
    ArrivedAt,
    BusNumber, DateText, Divide,
    FilterPanel,
    FilterScroll, HistoryItem, HistoryList, HistoryScroll, InfoBox,
    SortIndicator, SortText, Status, StatusInfo, TripDivide, TripInfo, TripText,
    Wrapper
} from "@/pages/Reservations/components/BookingHistory/styles.ts";
import {Fragment, useState} from "react";


export default function BookingHistory() {
    const FILTER_TEXT_LIST = [
        "전체",
        "배차 완료",
        "배차 대기",
        "이용 완료",
        "예매 취소"
    ]
    const [filterState, setFilterState] = useState<number>(0)
    const temp: ItemProps[] = [
        {
            status: 1,
            date: '1월 15일 수요일',
            tripLocation: '인천 국제 공항',
            tripTime: '서울대학교 13:00 도착',
            busNumber: '버스 01',
            arrivedAt: '100시간 후 도착'
        },
        {
            status: 0,
            date: '1월 15일 수요일',
            tripLocation: '부산역',
            tripTime: '서울대학교 13:00 도착'
        },
        {
            status: 0,
            date: '1월 15일 수요일',
            tripLocation: '부산역',
            tripTime: '서울대학교 13:00 도착'
        },
        {
            status: 0,
            date: '1월 15일 수요일',
            tripLocation: '부산역',
            tripTime: '서울대학교 13:00 도착'
        },
        {
            status: 0,
            date: '1월 15일 수요일',
            tripLocation: '부산역',
            tripTime: '서울대학교 13:00 도착'
        }
    ]

    return (
        <Wrapper>
            <FilterPanel>
                <FilterScroll>
                    {
                        FILTER_TEXT_LIST.map((item, index) => (
                            <li key={index}>
                                <FilterButton text={item} isActive={filterState === index} onClick={() => setFilterState(index)}/>
                            </li>
                        ))
                    }
                </FilterScroll>
            </FilterPanel>
            <SortIndicator>
                <SortText>
                    날짜 순
                </SortText>
            </SortIndicator>
            <HistoryScroll>
                <HistoryList>
                    {
                        temp.map((item, index) => {
                            if (index === temp.length - 1) {
                                return (
                                    <Item
                                        key={index}
                                        status={item.status}
                                        date={item.date}
                                        tripLocation={item.tripLocation}
                                        tripTime={item.tripTime}
                                        busNumber={item.busNumber}
                                        arrivedAt={item.arrivedAt}
                                    />
                                );
                            } else {
                                return (
                                    <Fragment key={index}>
                                        <Item
                                            status={item.status}
                                            date={item.date}
                                            tripLocation={item.tripLocation}
                                            tripTime={item.tripTime}
                                            busNumber={item.busNumber}
                                            arrivedAt={item.arrivedAt}
                                        />
                                        <Divide />
                                    </Fragment>
                                );
                            }
                        })
                    }
                </HistoryList>
            </HistoryScroll>
        </Wrapper>
    )
}

{/* 여기에만 종속적인 모듈 */}
interface ItemProps {
    status: number
    date: string;
    tripLocation: string;
    tripTime: string;
    busNumber?: string;
    arrivedAt?: string;
}
function Item({status, date, tripLocation, tripTime, busNumber, arrivedAt}: ItemProps) {
    return (
        <HistoryItem>
            <InfoBox>
                <DateText>
                    {date}
                </DateText>
                <TripInfo>
                    <TripText>
                        {tripLocation}
                    </TripText>
                    <TripDivide/>
                    <TripText>
                        {tripTime}
                    </TripText>
                </TripInfo>
                <StatusInfo>
                    {
                        status === 0 ?
                            <Status>배차 대기</Status>:
                            <>
                                <BusIcon/>
                                <BusNumber>
                                    {busNumber}
                                </BusNumber>
                                <ArrivedAt>
                                    {arrivedAt}
                                </ArrivedAt>
                            </>
                    }
                </StatusInfo>
            </InfoBox>
            <BookingActionButton disabled={status !== 0}/>
        </HistoryItem>
    )
}