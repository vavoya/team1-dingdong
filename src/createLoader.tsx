import {FetchQueryOptions} from "@tanstack/react-query";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import LoadingModal, {mountModal, unmountModal} from "@/components/Loading";
import {isAxiosError} from "axios";
import Modal from "@/components/Modal";
import {queryClient} from "@/main.tsx";

export function createLoader(queries: FetchQueryOptions[] = []) {
    async function loader({ request, params }: LoaderFunctionArgs) {
        if (params){}
        const previousUrl = window.location.pathname;
        const currentUrl = new URL(request.url).pathname; // 현재 URL 가져오기

        // 모달 컨테이너 렌더링
        const { root, modalContainer } = mountModal();

        // 여기서 라우팅 처리
        try {
            // 실행할 로드 함수가 없으면
            if (queries.length === 0) {
                return null;
            }

            // 로딩 모달 렌더링
            root.render(<LoadingModal text={"페이지 불러오는 중"} />);

            /*
                  const errorPromise = new Promise((_, reject) =>
                      setTimeout(() => reject(new Error("🚨 5초 후 에러 발생!")), 5000)
                  );
                  await errorPromise

                   */

            const response = await Promise.all(
                queries.map((query) =>
                    queryClient.fetchQuery({
                        ...query,
                    })
                )
            );
            // fetch 성공 후
            unmountModal(root, modalContainer);
            return response;
        } catch (error) {
            // 인증 에러
            if (isAxiosError(error) && error.response?.status) {
                const status = error.response.status;

                switch (status) {
                    case 401:
                        console.warn("🔐 401 Unauthorized: 인증 필요");
                        break;
                    case 403:
                        console.warn("⛔ 403 Forbidden: 접근 불가");
                        break;
                    case 404:
                        console.warn("🔍 404 Not Found: 리소스 없음");
                        break;
                    case 500:
                        console.warn("🔥 500 Internal Server Error: 서버 오류");
                        break;
                    default:
                        console.warn("⚠️ 기타 HTTP 오류:", status);
                }
            }


            // fetch 에러
            if (previousUrl && previousUrl !== currentUrl) {
                // 이전 URL이 있고, 현재 URL과 다르면 이전 페이지로 리디렉트
                root.render(
                    <Modal
                        title={["오류 발생!", "페이지 불러오기에 실패했습니다."]}
                text={["잠시 후 다시 시도해 주세요."]}
                isError={true}
                leftButton={{
                    text: "확인",
                        onClick: () => unmountModal(root, modalContainer),
                }}
                />
            );

                return redirect(previousUrl);
            } else {
                root.render(
                    <Modal
                        title={["오류 발생!", "페이지 불러오기에 실패했습니다."]}
                text={["잠시 후 다시 시도해 주세요."]}
                isError={true}
                leftButton={{
                    text: "새로고침",
                        onClick: () => {
                        window.location.reload();
                    },
                }}
                />
            );
                throw new Response("로드 중 에러 발생", { status: 500 });
            }
        }
    }

    return loader;
}