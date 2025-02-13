// 미들웨어
import {LoaderFunctionArgs} from "react-router-dom";
import {mountModal, unmountModal} from "@/components/Loading";
import Modal from "@/components/Modal";
import {axiosInstance} from "@/api";

interface AccessRulesInterface {
    [accessPath: string]: {
        permittedPaths: string[];
        redirectPath: string;
    };
}

let previousUrl = ""
export async function middleware({request, params}: LoaderFunctionArgs) {
    if (params){}
    const currentUrl = new URL(request.url).pathname; // 현재 URL 가져오기

    const accessRules: AccessRulesInterface = {
        '/payment/purchase': {
            permittedPaths: ['/fixed-bus-select-bus', '/payment/success'],
            redirectPath: '/home'
        },
        '/payment/reservation': {
            permittedPaths: ['/custom-bus-booking', '/payment/success'],
            redirectPath: '/home'
        },
        '/fixed-bus-select-bus': {
            permittedPaths: ['/fixed-bus-booking', '/payment/purchase'],
            redirectPath: '/home'
        }
    };

    // 로그인이 안되었는데 페이지 접근, 리다이렉트는 각 loader이 401이 처리
    // 근데 로그인 되었는데 login이나 그 외에 접근한다? /home으로 가게 여기서 처리
    const response = await axiosInstance.post("/api/auth/login", {
        email: "test@test.com",
        password: "abcd1234!@"
    });
    console.log('로그인', response.status)

    // 로그인되어 있음
    if (response.status === 200) {

    }
    else {

    }


    // 현재 경로에 접근제어가 정의되어있는지
    if (currentUrl in accessRules) {
        const {permittedPaths, redirectPath} = accessRules[currentUrl];
        // 접근 허용안된 경로
        if (!permittedPaths.includes(previousUrl)) {
            // 모달 컨테이너 렌더링
            const { root, modalContainer } = mountModal();
            root.render(
                <Modal
                    title={["잘못된 접근입니다."]}
                    text={["홈으로 이동합니다."]}
                    isError={true}
                    leftButton={{
                        text: "확인",
                        onClick: () => {
                            unmountModal(root, modalContainer)

                            navigateTo(redirectPath)
                        },
                    }}
                />
            );
            updatePreviousUrl(currentUrl);
            throw new Error()
        }
    }
    updatePreviousUrl(currentUrl);

}


function navigateTo(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

function updatePreviousUrl(currentUrl: string) {
    previousUrl = currentUrl;
}
