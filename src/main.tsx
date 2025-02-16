// 라이브러리
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

// 페이지
import Layout from "@/pages/layout.tsx";
import Home from "@/pages/Home/page.tsx";
import SetHomeLocation from "@/pages/SetHomeLocation/page.tsx";
import CustomRouteBooking from "@/pages/BusBooking/CustomRouteBooking/page.tsx";
import FixedRouteBookingSelectBus from "@/pages/BusBooking/FixedRouteBookingSelectBus/page.tsx";
import FixedRouteBooking from "@/pages/BusBooking/FixedRouteBooking/page.tsx";
import BusTrackerPage from "@/pages/BusTracker/page.tsx";
import ReservationsPage from "@/pages/Reservations/page.tsx";
import MyPage from "@/pages/MyPage/page.tsx";
import TimetableManagementPage from "@/pages/TimetableManagement/page.tsx";
import PaymentReservationPage from "@/pages/Payment/Reservation/page.tsx";
import PaymentPurchasePage from "@/pages/Payment/Purchase/page.tsx";
import SuccessPage from "@/pages/Payment/Success/page.tsx";
import Wallet from "@/pages/Wallet/page.tsx";
import LoginHomeScreen from "./pages/Auth/LoginHome/index.tsx";
import Login from "./pages/Auth/Login/index.tsx";
import SignupLayout from "./pages/Auth/Signup/page.tsx";
import PasswordSignup from "./pages/Auth/Signup/Password/index.tsx";
import UserInfoSignup from "./pages/Auth/Signup/UserInfo/index.tsx";
import SchoolAuthSignUp from "./pages/Auth/Signup/SchoolAuth/index.tsx";
import Notification from "./pages/Notification/page.tsx";
import { createLoader } from "@/loader/createLoader.tsx";
import {
  users_home_locations,
  users_me,
  users_notifications_checkUnread,
  users_reservations,
} from "@/api/query/users";
import { middleware } from "@/middleware.tsx";

import { notificationLoader } from "./hooks/Notification/useNotification.ts";
import { school } from "./api/query/signUp/index.ts";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <></>,
    loader: middleware,
    shouldRevalidate: () => true,
    children: [
      {
        index: true,
        Component: LoginHomeScreen,
      },
      {
        // 홈
        path: "home",
        Component: Home,
        loader: createLoader(
          () => [
            users_me(),
            users_reservations({
              page: 0,
              category: "HOME",
              sort: "LATEST",
            }),
            users_notifications_checkUnread(),
            users_home_locations(),
          ]
          /*
              () => ([
                  async () => axiosInstance.post('')
              ])

               */
        ),
      },
      {
        path: "notification",
        Component: Notification,

        loader: createLoader(() => [notificationLoader]),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: SignupLayout,
        children: [
          {
            index: true,
            Component: SchoolAuthSignUp,
            loader: createLoader(() => [school()]),
          },
          {
            path: "password",
            Component: PasswordSignup,
          },
          {
            path: "user-info",
            Component: UserInfoSignup,
          },
        ],
      },
      {
        // 탑승지 위치 설정
        path: "set-home-location",
        Component: SetHomeLocation,
        loader: createLoader(() => [users_home_locations()]),
      },
      {
        // 버스 예매하기
        path: "custom-bus-booking",
        Component: CustomRouteBooking,
        loader: createLoader(() => [users_me(), users_home_locations()]),
      },
      {
        // 함께 타기 버스 선택하기
        path: "fixed-bus-select-bus",
        Component: FixedRouteBookingSelectBus,
        loader: createLoader(() => [users_me(), users_home_locations()]),
      },
      {
        // 함께 타기 예매하기
        path: "fixed-bus-booking",
        Component: FixedRouteBooking,
        loader: createLoader(() => [users_me(), users_home_locations()]),
      },
      {
        // 실시간 버스 위치
        path: "bus-tracker",
        Component: BusTrackerPage,
      },
      {
        // 예매 내역
        path: "reservations",
        Component: ReservationsPage,
        loader: createLoader(() => [
          users_reservations({
            page: "0",
            pageSize: "60",
            category: "ALL",
            sort: "LATEST",
          }),
          users_reservations({
            page: "0",
            pageSize: "60",
            category: "ALLOCATED",
            sort: "OLDEST",
          }),
        ]),
      },
      {
        // 마이 페이지
        path: "my-page",
        Component: MyPage,
        loader: createLoader(() => [users_me()]),
      },
      {
        // 시간표 관리 페이지
        path: "timetable-management",
        Component: TimetableManagementPage,
      },
      {
        path: "payment",
        children: [
          {
            // 배차 예약
            path: "reservation",
            Component: PaymentReservationPage,
          },
          {
            // 확정 예매
            path: "purchase",
            Component: PaymentPurchasePage,
          },
          {
            // 구매 성공
            path: "success",
            Component: SuccessPage,
          },
        ],
      },
      {
        // 충전 페이지
        path: "wallet",
        Component: Wallet,
      },
    ],
  },
]);
