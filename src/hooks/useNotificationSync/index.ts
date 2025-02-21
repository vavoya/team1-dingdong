import {useSocket} from "@/hooks/useSocket";
import {useEffect, useState} from "react";
import {axiosInstance} from "@/api";
import useToast from "@/hooks/useToast";
import removeReservationCache from "@/api/queryCacheRemove/reservations/removeReservationCache.ts";

interface Notifications {
    notifications: {
        "content": [
            {
                type : "ALLOCATION_SUCCESS" | "ALLOCATION_FAILED" | "BUS_START"
                timestamp : string
                money : number
                reservationInfo: {
                    reservationId: number
                    startStationName: string
                    endStationName: string
                    startDate: string
                    expectedStartTime: string
                    expectedEndTime : string
                },
                read: boolean
            },
        ],
        page: {
            size: number
            number: number
            totalElements: number
            totalPages: number
        }
    }
}

const notificationHandlers: Record<Notifications['notifications']['content'][number]['type'], (addToast: (msg: string) => void) => void> = {
    // 배차 실패 -> 배차 대기 & 배차 실패 캐시 지우기
    ALLOCATION_FAILED: (addToast) => {
        removeReservationCache('PENDING')
        removeReservationCache('FAIL_ALLOCATED')
        removeReservationCache('ALL')
        removeReservationCache('HOME')
        addToast("예매한 차량 중 배차가 실패한 건이 있어요.")
    },
    // 배차 성공 -> 배차 대기 캐시 지우기
    ALLOCATION_SUCCESS: (addToast) => {
        removeReservationCache('PENDING')
        removeReservationCache('ALLOCATED')
        removeReservationCache('ALL')
        removeReservationCache('HOME')
        addToast("예매한 차량 중 배차가 완료된 건이 있어요.")
    },
    // 버스 출발 -> 뭐하징 이건
    BUS_START: (addToast) => {
        addToast("예매한 차량 중 출발한 건이 있어요.")
    }
}

interface useNotificationSyncProps {
    hasUnreadNotifications?: boolean
}
// 알림 받으면 최근 알림 1개 읽어서 캐시 무효화하고 토스트로 알리기 (캐시 무효화가 주 목적)
export default function useNotificationSync({hasUnreadNotifications = false}: useNotificationSyncProps) {
    const ws = useSocket();
    const [isNotification, setIsNotification] = useState<[boolean]>([hasUnreadNotifications]);
    const addToast = useToast()

    // 알림 구독
    useEffect(() => {
        if (!(ws instanceof  WebSocket)) return;

        const handleMessage = (message: MessageEvent) => {
            const data: string = message.data;
            if (data === 'alarm') {
                setIsNotification([true]);
                // 가장 최근 데이터 1개 가져오기
                axiosInstance.get<Notifications>('/api/users/notifications?page=0&pageSize=1')
                    .then(response => {
                        const result = response.data;
                        const type = result.notifications.content[0].type;
                        notificationHandlers[type](addToast)
                    })
            }
        };

        ws.addEventListener("message", handleMessage);

        return () => {
            ws.removeEventListener("message", handleMessage); // 언마운트 시 이벤트 리스너 삭제
        };
    }, [ws]); // `ws`가 변경될 때마다 실행

    // 알림 상태를 계속 반환
    return isNotification;
}