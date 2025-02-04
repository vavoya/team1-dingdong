// 라이브러리
import { Suspense } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
// 전역 상태
import ResetStyle from "@/styles/ResetStyle.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";
// 레이아웃
import RootLayout from "@/pages/layout";
import PaymentLayout from "@/pages/Payment/layout";
// 페이지
import HomePage from "@/pages/Home/page";
import PaymentPurchasePage from "@/pages/Payment/Purchase/page";
import PaymentReservationPage from "@/pages/Payment/Reservation/page";
import ErrorPage from "@/pages/Error/page";
import SetHomeLocation from "@/pages/SetHomeLocation/page.tsx";
import BusTrackerPage from "@/pages/BusTracker/page.tsx";
import ReservationsPage from "@/pages/Reservations/page.tsx";
import MyPage from "@/pages/MyPage/page.tsx";
// 컴포넌트
import Loading from "@/components/Loading";

function App() {

    return (
        <BrowserRouter>
            {/* 전역 스타일 적용 */}
            <ResetStyle />
            <GlobalStyle />
            {/* React Route */}
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        {/* 홈 */}
                        <Route path="home" element={<HomePage />} />
                        {/* 탑승지 위치 설정 */}
                        <Route path="set-home-location" element={<SetHomeLocation />} />
                        {/* 실시간 버스 위치 */}
                        <Route path="bus-tracker" element={<BusTrackerPage />}/>
                        {/* 예매 내역 */}
                        <Route path="reservations" element={<ReservationsPage />} />
                        {/* 마이 페이지 */}
                        <Route path="my-page" element={<MyPage />} />
                        {/* 결제 페이지 */}
                        <Route path="payment" element={<PaymentLayout />}>
                            {/* 배차 예약 */}
                            <Route path="reservation" element={<PaymentPurchasePage />}/>
                            {/* 확정 예매 */}
                            <Route path="purchase" element={<PaymentReservationPage />}/>
                        </Route>
                        {/* 에러 페이지 */}
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )

}

export default App;
