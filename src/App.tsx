// 라이브러리
import {RouterProvider} from "react-router-dom";
// 전역 상태
import ResetStyle from "@/styles/ResetStyle.ts";
import GlobalStyle from "./styles/GlobalStyle.ts";
import {router} from "@/main.tsx";


function App() {
  return (
      <>
        <ResetStyle />
        <GlobalStyle />
        <RouterProvider router={router} />
      </>
  )

}

export default App;
