import {queryClient} from "@/main.tsx";
import {users_reservations, users_reservations_interface} from "@/api/query/users";
import {INIT_PAGE, INIT_PAGE_SIZE} from "@/env.ts";
import {FilterType, ReservationsRecord} from "@/pages/Reservations/components/BookingHistory";


export async function deleteItem (deletedReservationId: number, reservationsObj: ReservationsRecord, filterType: FilterType){
    const page = (reservationsObj[filterType].page.number + 1) * reservationsObj[filterType].page.size

    // 다음 페이지 아이템 1개 가져오기
    const response = await queryClient.fetchQuery(users_reservations({
        page: page,
        pageSize: 1,
        category: filterType,
        sort: filterType === 'ALL' ? 'LATEST' : "OLDEST",
    }))

    const lastContent = response.reservationInfos.content[0]

    // 아이템 1개 삭제
    queryClient.setQueryData<users_reservations_interface>(
        ['/api/users/reservations', {
            page: INIT_PAGE,
            ...(filterType !== 'ALLOCATED' && { pageSize: INIT_PAGE_SIZE }),
            category: filterType,
            sort: filterType === 'ALL' ? 'LATEST' : "OLDEST",
        }],
        (oldData) => {
            // 심각한 에러, 코딩 에러임
            if (oldData == null) return oldData;

            const newData: users_reservations_interface = {
                reservationInfos: {
                    content: [
                        ...oldData.reservationInfos.content.filter(({reservationId}) => reservationId !== deletedReservationId),
                        lastContent
                    ],
                    page: oldData.reservationInfos.page


                }
            }

            return newData
        }
    )

    // 예매 취소 캐시 무효화?
    await queryClient.invalidateQueries({ queryKey: ['/api/users/reservations', {
        page: INIT_PAGE,
        pageSize: INIT_PAGE_SIZE,
        category: 'CANCELED',
        sort: filterType === 'ALL' ? 'LATEST' : "OLDEST",
    }]});

}