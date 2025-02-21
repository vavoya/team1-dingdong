import {queryClient} from "@/main.tsx";
import {users_reservations, users_reservations_interface} from "@/api/query/users";
import {INIT_PAGE, INIT_PAGE_SIZE} from "@/env.ts";
import {FilterType, ReservationsRecord} from "@/pages/Reservations/components/BookingHistory";
import {RevalidationState} from "react-router-dom";
import removeReservationCache from "@/api/queryCacheRemove/reservations/removeReservationCache.ts";


export async function deleteItem (deletedReservationId: number, reservationsObj: ReservationsRecord, filterType: FilterType, revalidate: () => Promise<void>, state: RevalidationState): Promise<void> {
    if (state === 'loading') return ;

    const page = (reservationsObj[filterType].page.number + 1) * reservationsObj[filterType].page.size

    // 다음 페이지 아이템 1개 가져오기
    // 요청 보내기전에 혹시모를 캐시 삭제
    queryClient.removeQueries({
        queryKey: ['/api/users/reservations', {
            page: page,
            pageSize: 1,
            category: filterType,
            sort: filterType === 'ALL' ? 'LATEST' : "OLDEST",
        }],
    })
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
                        ...(lastContent == null ? [] : [lastContent])
                    ],
                    page: oldData.reservationInfos.page
                }
            }

            return newData
        }
    )

    // 예매 취소 캐시 제거
    removeReservationCache('CANCELED')
    removeReservationCache('PENDING')
    removeReservationCache('ALL')
    removeReservationCache('HOME')

    // 배차 대기는 쿼리 데이터를 직접 수정해서 필요 없을 듯

    // loader 다시 실행해서 무효환 된 데이터들 다시 받아오기
    await revalidate()

}