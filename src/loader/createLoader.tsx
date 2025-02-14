import { FetchQueryOptions } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import LoadingModal, { mountModal } from "@/components/Loading";
import { AxiosResponse, isAxiosError } from "axios";
import Modal from "@/components/Modal";
import { queryClient } from "@/main.tsx";
import { middlewarePromise } from "@/middleware.tsx";
import {ReactNode} from "react";

type CallbackF = () => FetchQueryOptions[];
type CallbackF2 = () => (() => Promise<AxiosResponse<any, any>>)[];

/**
 * 특정 HTTP 에러 상태에 대한 모달을 렌더링하는 함수
 */
function handleErrorModal(render: (component: ReactNode) => void, message: string[]) {
    render(
        <Modal
            title={message}
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
}

/**
 * React Query Loader 생성 함수
 *
 * @param callbackF - React Query 객체 배열 반환 함수
 * @param callbackF2 - Axios 요청을 포함한 async 함수 배열 반환 함수 (옵션)
 */
export function createLoader(callbackF: CallbackF, callbackF2?: CallbackF2) {
    return async function loader({ request, params }: LoaderFunctionArgs) {
        await middlewarePromise;

        // ts 방지용 (미사용 변수 처리)
        if (request || params) {}

        const queries = callbackF();
        const fetches = (callbackF2 ?? (() => []))(); // 기본값을 `() => []`로 설정

        // 실행할 로드 함수가 없으면
        if (queries.length === 0 && fetches.length === 0) {
            return null;
        }

        // 모달 컨테이너 렌더링
        const { render, unmountModal } = mountModal();

        try {
            // 로딩 모달 렌더링
            render(<LoadingModal text={"페이지 불러오는 중"} />);

            // 서버 요청 실행
            const response = await Promise.all([
                ...queries.map((query) => queryClient.fetchQuery({ ...query })),
                ...fetches.map((fn) => fn()), // 여기서 fetches를 실행
            ]);

            // 성공 시 모달 닫기
            unmountModal();
            return response;
        } catch (error) {

            if (isAxiosError(error) && error.response?.status) {
                const status = error.response.status;

                switch (status) {
                    case 403:
                        handleErrorModal(render, ["⛔ 403 Forbidden:"," 접근 권한이 없습니다."]);
                        break;
                    case 404:
                        handleErrorModal(render, ["🔍 404 Not Found:"," 리소스를 찾을 수 없습니다."]);
                        break;
                    case 500:
                        handleErrorModal(render, ["🔥 500 Internal Server Error:"," 서버 오류 발생."]);
                        break;
                    default:
                        handleErrorModal(render, ["⚠️ 알 수 없는 오류가 발생했습니다."]);
                }
            }

            // 에러를 다시 throw하여 상위에서 핸들링 가능하도록 유지
            throw error;
        }
    };
}
