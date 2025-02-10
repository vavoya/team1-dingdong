import {useNavigate as orginUseNavigation} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import QueryObj from "@/api/queries"
import {QueryParams} from "@/lib/customNav/interface.ts";
import LoadingModal from "@/components/Loading";
import {createRoot, Root} from "react-dom/client";
import Modal from "@/components/Modal";

type loadingStateType = 'default' | 'loading' | 'error' | 'success';

interface LinkProps{
    href: string,
    queryParams?: QueryParams,
    children?: React.ReactNode,
}
export default function Link({href, children}: LinkProps) {
    const navigate = orginUseNavigation();
    const queryClient = useQueryClient();
    const [loadingState, setLoadingState] = useState<loadingStateType>('default');

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        e.preventDefault();
        const queryList = QueryObj[href]
        if (queryList.length > 0) {
            setLoadingState('loading');
            Promise
                .all(queryList.map(query => queryClient.fetchQuery(query)))
                .then(() => {
                    navigate(href); // 네비게이션 실행
                })
                .catch(() => {
                    setLoadingState('error');
                });
        }
    }


    return (
        <a href={href} onClick={handleClick}>
            {children}
            {loadingState === 'loading' ?
                <LoadingModal text={'페이지 불러오는 중'} /> : null}
            {loadingState === 'error' ?
                <Modal
                    title={["데이터 로딩 실패"]}
                    text={[
                        "네트워크 문제로 데이터를 불러올 수 없습니다.",
                        "인터넷 연결을 확인하거나, 잠시 후 다시 시도해주세요."
                    ]}
                    isError={true}
                    leftButton={{
                        text: "확인",
                        onClick: () => setLoadingState('default')
                }}/> : null}
        </a>
    )
}


export function useNavigate() {
    const originNavigate = orginUseNavigation();
    const queryClient = useQueryClient();

    const mountModal = () => {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'loading-modal-container';
        document.body.appendChild(modalContainer);

        // React 18의 createRoot를 사용하여 LoadingModal 렌더링
        const root = createRoot(modalContainer);

        return {root, modalContainer}
    }

    const unmountModal = (root: Root, modalContainer: HTMLDivElement) => {
        root.unmount();          // 컴포넌트를 unmount
        modalContainer.remove(); // 컨테이너를 DOM에서 제거
    }

    return ({href}: LinkProps) => {
        const {root, modalContainer} = mountModal();
        root.render(<LoadingModal text={"페이지 불러오는 중"}/>);

        const queryList = QueryObj[href]

        if (queryList?.length > 0) {
            Promise.all(queryList.map(query => queryClient.fetchQuery({...query, staleTime: Infinity})))
                .then(() => {
                    // 모든 쿼리 성공 시 모달을 unmount 및 제거 후 라우팅
                    unmountModal(root, modalContainer);
                    originNavigate(href);    // 네비게이션 실행
                })
                .catch(() => {
                    root.render(
                        <Modal
                            title={["데이터 로딩 실패"]}
                            text={[
                                "네트워크 문제로 데이터를 불러올 수 없습니다.",
                                "인터넷 연결을 확인하거나, 잠시 후 다시 시도해주세요."
                            ]}
                            isError={true}
                            leftButton={{
                                text: "확인",
                                onClick: () => unmountModal(root, modalContainer)
                            }}
                        />
                    );
                });
        }
        else {
            originNavigate(href);    // 네비게이션 실행
        }
    };
}