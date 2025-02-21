import {LoaderFunctionArgs} from "react-router-dom";
import {queryClient} from "@/main.tsx";
import {users_me, users_reservations} from "@/api/query/users";
import handleError from "@/route/loader/handleError.ts";
import {INIT_PAGE, INIT_PAGE_SIZE} from "@/env.ts";
import removeReservationCache from "@/api/queryCacheRemove/reservations/removeReservationCache.ts";


export default async function loader({ request, params }: LoaderFunctionArgs) {

    if (request && params) {}

    try {
        // 첫 방문에만 초기화
        // 이거 안하면 revalidate 할 때 마다 초기화됨
        if (window.location.pathname !== '/reservations') {
            // ALL은 배차 확정이 들어가 있으니 매번 초기화
            removeReservationCache('ALL')
            // 배차 확정은 최신이 필요하니 매번 초기화
            removeReservationCache('ALLOCATED')
        }

        const response = await Promise.all([
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    pageSize: INIT_PAGE_SIZE,
                    category: "ALL",
                    sort: "LATEST",
                }
            )),
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    category: "ALLOCATED",
                    sort: "OLDEST",
                }
            )),
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    pageSize: INIT_PAGE_SIZE,
                    category: "PENDING",
                    sort: "OLDEST",
                }
            )),
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    pageSize: INIT_PAGE_SIZE,
                    category: "FAIL_ALLOCATED",
                    sort: "OLDEST",
                }
            )),
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    pageSize: INIT_PAGE_SIZE,
                    category: "ENDED",
                    sort: "OLDEST",
                }
            )),
            queryClient.ensureQueryData(users_reservations(
                {
                    page: INIT_PAGE,
                    pageSize: INIT_PAGE_SIZE,
                    category: "CANCELED",
                    sort: "OLDEST",
                }
            )),
            queryClient.ensureQueryData(users_me())
        ])

        return [...response];

    } catch (error) {
        return handleError(error);
    }
}
