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
import {
  users_me_interface, users_reservations,
    users_reservations_interface
} from "@/api/query/users";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import {queryClient} from "@/main.tsx";
import LoadingCard from "@/pages/Home/component/LoadingCard";
import {INIT_PAGE, INIT_PAGE_SIZE} from "@/env.ts";
import {getBusCardFunction} from "@/pages/Home/utils/getBusCardFunction.tsx";


interface BusStateProps {
    reservations: users_reservations_interface['reservationInfos'],
    busStateRef: React.RefObject<HTMLDivElement>,
    schoolName: users_me_interface['schoolName'],
}

export default function BusState({reservations, busStateRef, schoolName}: BusStateProps) {
    const navigate = useNavigate();
    const [content, setContent] = useState(reservations.content);
    const [isLast, setIsLast] = useState(reservations.page.number >= (reservations.page.totalPages - 1));
    const fetchInfo = useRef({
        pageSize: INIT_PAGE_SIZE,
        page: INIT_PAGE
    })


    const getNextBusState = (errorCallbackF: Function) => {
        queryClient.fetchQuery(users_reservations({
            page: fetchInfo.current.page + 1,
            pageSize: fetchInfo.current.pageSize,
            category: 'HOME',
            sort: 'OLDEST'
        })).then((result) => {
            const newContent = result.reservationInfos.content
            fetchInfo.current.page = result.reservationInfos.page.number
            setIsLast(result.reservationInfos.page.number >= (result.reservationInfos.page.totalPages - 1))
            setContent([...content, ...newContent])
        }).catch((err) => {
            errorCallbackF(err)
        })
    }

    return (
        <Wrapper ref={busStateRef}>
            <Header>
                <HeaderLeftSection>
                    <HeaderTitle>
                        예매
                    </HeaderTitle>
                    <HeaderTitle isZero={reservations.page.totalElements === 0}>
                        {reservations.page.totalElements}
                    </HeaderTitle>
                </HeaderLeftSection>
                <HeaderRightSection>
                    <HeaderInfoText>
                        전체보기
                    </HeaderInfoText>
                    <HeaderActionButton onClick={() => {
                        navigate('/reservations');
                    }}>
                        <ArrowRightIcon/>
                    </HeaderActionButton>
                </HeaderRightSection>
            </Header>
            {
                reservations.page.totalElements === 0 ?
                    <BusReservation/> :
                    <CardList>
                        {
                            content.map((data, key) => {
                                return getBusCardFunction(data.direction, data.reservationStatus)(data, key, schoolName)
                            })
                        }
                        {
                            !isLast ?
                                <LoadingCard getNextBusState={getNextBusState}/> : null

                        }
                    </CardList>
            }
        </Wrapper>
    );
}

