// 미들웨어
import { LoaderFunctionArgs } from "react-router-dom";
import LoadingModal, { mountModal } from "@/components/Loading";
import Modal from "@/components/Modal";
import { axiosInstance } from "@/api";
import axios from "axios";
import { ReactNode } from "react";

export let middlewarePromise: null | Promise<any> = null;

export async function middleware({ request, params }: LoaderFunctionArgs) {
  // 미들웨어에서 에러가 발생 안하면 resol 호출
  // 하위 loader의 실행을 pending 하기 위한 코드
  let resolve2: (value: any) => void = () => null;
  middlewarePromise = new Promise((resolve, _) => {
    resolve2 = resolve;
  });
  if (params) {
  }
  const currentUrl = new URL(request.url).pathname; // 현재 URL 가져오기

  // 로그인 여부 확인 모달은 2초 이후 나타나게
  const { render, unmountModal } = mountModal();
  const loadingTimeout = setTimeout(() => {
    render(<LoadingModal text={"사용자 확인 중"} />);
  }, 2000);

  try {
    await axiosInstance.get("/api/users/me");
    clearTimeout(loadingTimeout); // 요청이 완료되면 로딩 타이머 제거
    render(<></>);
  } catch (error) {
    clearTimeout(loadingTimeout);
    handleError(error, currentUrl, render);
  }

  switch (currentUrl) {
    case "/payment/purchase":
      // 이전 페이지에서 현재 페이지로 넘겨주는 값이 없다.
      if (sessionStorage.getItem("/fixed-bus-select-bus") == null) {
        renderErrorModal2(
          render,
          "예매할 버스를 선택해주세요",
          "결제를 진행하려면 먼저 원하는 버스를 선택해야 합니다.",
          {
            text: "버스 선택 페이지로 이동",
            onClick: () => navigateTo("/fixed-bus-select-bus"),
          }
        );
      }
      break;
    case "/payment/reservation":
      if (sessionStorage.getItem("/custom-bus-booking") == null) {
        renderErrorModal2(
          render,
          "예매할 버스를 선택해주세요",
          "결제를 진행하려면 먼저 원하는 버스를 선택해야 합니다.",
          {
            text: "버스 선택 페이지로 이동",
            onClick: () => navigateTo("/custom-bus-booking"),
          }
        );
      }
      break;
    case "/fixed-bus-select-bus":
      if (sessionStorage.getItem("/fixed-bus-booking") == null) {
        renderErrorModal2(
          render,
          "탑승 시간을 선택해주세요",
          "탑승 시간을 선택하면 이용 가능한 버스 목록을 확인할 수 있습니다.",
          {
            text: "탑승 시간 선택하러 가기",
            onClick: () => navigateTo("/fixed-bus-booking"),
          }
        );
      }
      break;
  }

  unmountModal();
  resolve2("1");
}

/**
 * 리액트 라우터가 감지하는 url 이동
 */
function navigateTo(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/**
 * 새로고침
 */
function reload() {
  window.location.reload();
}

/**
 * 에러 모달을 렌더링하는 함수
 */
function renderErrorModal(
  render: (modal: ReactNode) => void,
  title: string,
  text: string
) {
  render(
    <Modal
      title={[title]}
      text={[text]}
      isError={true}
      leftButton={{ text: "새로고침", onClick: reload }}
    />
  );
  throw new Error("에러");
}
function renderErrorModal2(
  render: (modal: ReactNode) => void,
  title: string,
  text: string,
  button: { text: string; onClick: () => void }
) {
  render(
    <Modal
      title={[title]}
      text={[text]}
      isError={true}
      leftButton={{ text: button.text, onClick: button.onClick }}
    />
  );
  throw new Error("에러");
}

/**
 * Axios 에러를 처리하는 함수
 */
function handleAxiosError(
  error: any,
  currentUrl: string,
  render: (modal: ReactNode) => void
) {
  const status = error.response?.status;

  if (status) {
    if (currentUrl.startsWith("/login") || currentUrl.startsWith("/signup")) {
      // 로그인된 상태에서 로그인 페이지 접근 → 홈으로 리디렉션
      if (status !== 401) {
        navigateTo("/home");
      }
    } else {
      // 로그인되지 않은 상태에서 보호된 페이지 접근 → 로그인 페이지로 이동
      if (status === 401 && currentUrl.startsWith("/")) return;
      if (status === 401) {
        renderErrorModal2(
          render,
          "로그인이 필요한 서비스",
          "로그인 페이지로 이동하겠습니다.",
          {
            text: "확인",
            onClick: () => navigateTo("/login"),
          }
        );
      }
    }
  } else {
    renderErrorModal(
      render,
      "서버 응답이 없음",
      "서버에서 응답을 받을 수 없습니다."
    );
  }
}

/**
 * 에러를 처리하고 적절한 모달을 렌더링하는 함수
 */
function handleError(
  error: unknown,
  currentUrl: string,
  render: (modal: ReactNode) => void
) {
  if (axios.isAxiosError(error)) {
    handleAxiosError(error, currentUrl, render);
  } else if (error instanceof TypeError) {
    renderErrorModal(
      render,
      "네트워크 문제 또는 API 오류",
      "네트워크 문제로 요청을 처리할 수 없습니다."
    );
  } else if (error instanceof Error) {
    renderErrorModal(
      render,
      "일반적인 오류 발생",
      "알 수 없는 오류가 발생했습니다."
    );
  } else {
    renderErrorModal(
      render,
      "알 수 없는 오류 발생",
      "예기치 않은 문제가 발생했습니다."
    );
  }
}
