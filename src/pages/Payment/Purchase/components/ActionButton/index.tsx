
import {unitPrice} from "@/env.ts";
import {axiosInstance} from "@/api";
import {useNavigate} from "react-router-dom";
import {queryClient} from "@/main.tsx";
import useToast from "@/hooks/useToast";
import {isAxiosError} from "axios";
import ActionButtonLayout from "@/pages/Payment/components/ActionButtonLayout";

interface ActionButtonProps {
    token: string
    busStopId: number
    busScheduleId: number
    wallet: number
}
export default function ActionButton({token, busStopId, busScheduleId, wallet}: ActionButtonProps) {
    const navigate = useNavigate();
    const isPaymentAvailable = unitPrice <= wallet
    const addToast = useToast()


    const confirmPurchase = async () => {
        if (!isPaymentAvailable) {
            navigate('/wallet')
        }

        try {
            await axiosInstance.post('/api/users/reservations/together', {
                token,
                busStopId,
                busScheduleId
            })

            // 결제 성공
            // 결제 내역 & 잔고 & 예매내역 초기화
            await queryClient.invalidateQueries({
                queryKey: ['/api/users/wallet/history', '/api/users/wallet/balance', '/api/users/reservations'],
                exact: false
            });
            sessionStorage.removeItem('/fixed-bus-select-bus')
            navigate('/payment/success')
        }
        catch (error) {
            // 결제 실패
            if (isAxiosError(error) && error.response?.status === 400) {
                addToast("결제 실패: 잘못된 결제 정보 입니다.")
            }
            else {
                addToast("결제 실패: 네트워크 오류. 다시 시도해주세요.")
            }
        }

    }

    return (
        <ActionButtonLayout confirmPurchase={confirmPurchase} isPaymentAvailable={isPaymentAvailable} />
    )
}