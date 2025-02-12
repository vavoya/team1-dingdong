import {Query} from "@tanstack/react-query";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import {createBrowserRouter} from "react-router";

// 페이지
import Layout from "@/pages/layout.tsx";
import Wallet from "@/pages/Wallet/page.tsx";
import Home from "@/pages/Home/page.tsx";
import SetHomeLocation from "@/pages/SetHomeLocation/page.tsx";
import CustomRouteBooking from "@/pages/BusBooking/CustomRouteBooking/page.tsx";
import FixedRouteBookingSelectBus from "@/pages/BusBooking/FixedRouteBookingSelectBus/page.tsx";
import BusTrackerPage from "@/pages/BusTracker/page.tsx";
import FixedRouteBooking from "@/pages/BusBooking/FixedRouteBooking/page.tsx";
import SuccessPage from "@/pages/Payment/Success/page.tsx";
import RechargePage from "@/pages/Wallet/page.tsx";
import TimetableManagementPage from "@/pages/TimetableManagement/page.tsx";
import PaymentPurchasePage from "@/pages/Payment/Purchase/page";
import PaymentReservationPage from "@/pages/Payment/Reservation/page";
import ReservationsPage from "@/pages/Reservations/page.tsx";
import MyPage from "@/pages/MyPage/page.tsx";

// 컴포넌트
import Modal from "@/components/Modal";
import LoadingModal, {mountModal, unmountModal} from "@/components/Loading";
import {queryClient} from "@/main.tsx";
import QueryObj from "@/api/queries";



// 라우터 설정
export let router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        errorElement: <></>,
        children: [
            {
                // 홈
                path: "home",
                Component: Home,
                loader: createLoader(QueryObj['/home']),
            },
            {
                // 탑승지 위치 설정
                path: "set-home-location",
                Component: SetHomeLocation,
            },
            {
                // 버스 예매하기
                path: "custom-bus-booking",
                Component: CustomRouteBooking,
            },
            {
                // 함께 타기 버스 선택하기
                path: "fixed-bus-select-bus",
                Component: FixedRouteBookingSelectBus,
            },
            {
                // 함께 타기 예매하기
                path: "fixed-bus-booking",
                Component: FixedRouteBooking
            },
            {
                // 실시간 버스 위치
                path: "bus-tracker",
                Component: BusTrackerPage
            },
            {
                // 예매 내역
                path: "reservations",
                Component: ReservationsPage
            },
            {
                // 마이 페이지
                path: "my-page",
                Component: MyPage
            },
            {
                // 시간표 관리 페이지
                path: "timetable-management",
                Component: TimetableManagementPage
            },
            {
                path: "payment",
                children: [
                    {
                        // 배차 예약
                        path: "reservation",
                        Component: PaymentReservationPage
                    },
                    {
                        // 확정 예매
                        path: "purchase",
                        Component: PaymentPurchasePage
                    },
                    {
                        // 구매 성공
                        path: "success",
                        Component: SuccessPage
                    }
                ]
            },
            {
                // 충전 페이지
                path: "recharge",
                Component: RechargePage
            },
            {
                path: "wallet",
                Component: Wallet,
            },
        ],
    },
]);


// 헬퍼 함수
function createLoader(queries: Query[]) {

    async function loader({request, params}: LoaderFunctionArgs) {
        const previousUrl = window.location.pathname
        const currentUrl = new URL(request.url).pathname; // 현재 URL 가져오기

        // 모달 컨테이너 렌더링
        const {root, modalContainer} = mountModal()

        // 여기서 미들웨어 처리



        // 여기서 라우팅 처리
        try {
            // 실행할 로드 함수가 없으면
            if (queries.length === 0) {
                return null
            }

            // 로딩 모달 렌더링
            root.render(<LoadingModal text={'페이지 불러오는 중'} />)

            /*
            const errorPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("🚨 5초 후 에러 발생!")), 5000)
            );
            await errorPromise

             */

            const response = await Promise.all(queries.map(query => queryClient.fetchQuery({...query, staleTime: Infinity})))
            // fetch 성공 후 fheld ahekf wprj
            unmountModal(root, modalContainer)
            return response
        }
        catch (error) {
            // fetch 에러
            if (previousUrl && previousUrl !== currentUrl) {
                // 이전 URL이 있고, 현재 URL과 다르면 이전 페이지로 리디렉트
                root.render(
                    <Modal
                        title={["오류 발생!", "페이지 불러오기에 실패했습니다."]}
                        text={["잠시 후 다시 시도해 주세요."]}
                        isError={true}
                        leftButton={{
                            text: '확인',
                            onClick: () => unmountModal(root, modalContainer)
                        }}/>
                )

                return redirect(previousUrl)
            } else {
                root.render(
                    <Modal
                        title={["오류 발생!", "페이지 불러오기에 실패했습니다."]}
                        text={["잠시 후 다시 시도해 주세요."]}
                        isError={true}
                        leftButton={{
                            text: '새로고침',
                            onClick: () => {
                                window.location.reload()
                            }
                        }}/>
                )
                throw new Response("로드 중 에러 발생", { status: 500 });
            }
        }
    }

    return loader
}

// 미들웨어 함수
// 페이지 접근 제어
// 로그인 인증
async function middleware({ request, queries }: { request: Request, queries: Query[] }) {

}