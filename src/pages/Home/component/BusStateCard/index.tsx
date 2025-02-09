// React
import {useLocation} from "react-router-dom";
// 스타일
import {
    ArrivalTime,
    Card, CardAction, CardActionText, CardBusInfo, CardBusNumber, CardDestination, CardDestinationText,
    CardHeader,
    CardInfo,
    CardLocation,
    CardState,
    CardStateText,
    CardTIme, Divider
} from "@/pages/Home/component/BusStateCard/styles.ts";
// 컴포넌트
import BusIcon from "@/components/designSystem/Icons/Home/BusIcon.tsx";
import ArrowRightIcon from "@/components/designSystem/Icons/Home/ArrowRightIcon.tsx";

interface BusStateCardProps {
    type?: number;
}
export default function BusStateCard({type = 0}: BusStateCardProps) {
    const location = useLocation();



    return (
        <Card>
            <CardHeader>
                <CardInfo>
                    <CardTIme>
                        오늘 12:00
                    </CardTIme>
                    <CardLocation>
                        학동역 탑승
                    </CardLocation>
                </CardInfo>
                {
                    type !== 0 ?
                        <CardState>
                            <CardStateText>
                                배차 대기
                            </CardStateText>
                        </CardState>:
                        null
                }
            </CardHeader>
            {
                type === 0 ?
                    <CardBusInfo>
                        <BusIcon />
                        <CardBusNumber>
                            버스01
                        </CardBusNumber>
                        <ArrivalTime>
                            4분 후 도착
                        </ArrivalTime>
                    </CardBusInfo>:
                    null
            }
            <CardDestination>
                <CardDestinationText>
                    13:00 학교 도착
                </CardDestinationText>
                {
                    type === 0 ?
                        <>
                            <Divider />
                            <CardDestinationText>
                                45분 소요
                            </CardDestinationText>
                        </>:
                        null
                }
            </CardDestination>
            {
                type === 0 && location.pathname !== '/bus-tracker' ?
                    <CardAction>
                        <CardActionText>
                            실시간 버스 위치 확인
                        </CardActionText>
                        <ArrowRightIcon />
                    </CardAction>:
                    null
            }
        </Card>
    )
}