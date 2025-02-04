import {PageHeader, PageMain, PageWrapper} from "@/pages/Reservations/styles.ts";
import CardSlider from "@/pages/Reservations/components/CardSlider";
import BookingHistory from "@/pages/Reservations/components/BookingHistory";
import ArrowLeft2Icon from "@/components/designSystem/Icons/Reservations/ArrowLeft2Icon.tsx";


export default function Page() {
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

    return (
        <PageWrapper>
            <PageHeader.Wrapper>
                <PageHeader.ActionButton>
                    <ArrowLeft2Icon />
                </PageHeader.ActionButton>
                <PageHeader.Title as="h1">
                    예매 내역
                </PageHeader.Title>
            </PageHeader.Wrapper>
            <PageMain>
                {/* 여기 슬라이드 구현 */}
                <CardSlider data={temp} />
                <BookingHistory />
            </PageMain>
        </PageWrapper>
    )
}

