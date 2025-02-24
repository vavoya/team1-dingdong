import ResetStyle from "@/styles/ResetStyle.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";
import "@/webPushNotification/settingFCM.ts";
import { lazy, Suspense, useRef } from "react";
import LoadingModal from "@/components/Loading";
import { PullToRefreshContainer } from "./components/PullToRefresh/PullToRefresh.tsx";

// `RouterProvider` 자체를 동적 import
const LazyRouterProvider = lazy(async () => {
  const [{ RouterProvider }, { router }] = await Promise.all([
    import("react-router-dom"),
    import("@/route"),
  ]);
  return {
    default: () => <RouterProvider router={router} />,
  };
});

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  return (
    <PullToRefreshContainer el={appRef}>
      <div ref={appRef}>
        <ResetStyle />
        <GlobalStyle />
        <Suspense fallback={<LoadingModal text={"페이지 불러오는 중"} />}>
          <LazyRouterProvider />
        </Suspense>
      </div>
    </PullToRefreshContainer>
  );
}

export default App;
