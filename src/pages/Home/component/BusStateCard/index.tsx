// React
import {useNavigate} from "react-router-dom";
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
import {getKstFormattedLabelPair} from "@/utils/time/getKstFormattedLabelPair.ts";
import {formatKstTime} from "@/utils/time/formatKstTime.ts";
import {getTravelDuration} from "@/utils/time/getTravelDuration.ts";
import {useEffect, useState} from "react";


interface PendingBusStateCardProps {
    TO_HOME?: {
        boardingDate: string;
        boardingPoint: string;
        dropOffPoint: string
    },
    TO_SCHOOL?: {
        boardingPoint: string
        dropOffPoint: string,
        dropOffDate: string
    }
}
export function PendingBusStateCard({TO_HOME, TO_SCHOOL}: PendingBusStateCardProps) {


    return (
        <Card>
            <CardHeader>
                <CardInfo>
                    <CardTIme>
                        {
                            // 하교
                            TO_HOME != null ?
                                getKstFormattedLabelPair(TO_HOME.boardingDate)[0] : null
                        }
                        {
                            // 등교
                            TO_SCHOOL != null ?
                                getKstFormattedLabelPair(TO_SCHOOL.dropOffDate)[0] : null
                        }
                    </CardTIme>
                    <CardLocation>
                        {
                            // 하교
                            TO_HOME != null ?
                                `${TO_HOME.boardingPoint} 탑승` : null
                        }
                        {
                            // 등교
                            TO_SCHOOL != null ?
                                `${TO_SCHOOL.dropOffPoint} 탑승` : null
                        }
                    </CardLocation>
                </CardInfo>
                <CardState>
                    <CardStateText>
                        배차 대기
                    </CardStateText>
                </CardState>
            </CardHeader>
            <CardDestination>
                <CardDestinationText>
                    {
                        // 하교
                        TO_HOME != null ?
                            `${formatKstTime(TO_HOME.boardingDate)} ${TO_HOME.dropOffPoint} 도착` : null
                    }
                    {
                        // 등교
                        TO_SCHOOL != null ?
                            `${formatKstTime(TO_SCHOOL.dropOffDate)} ${TO_SCHOOL.dropOffPoint} 도착` : null
                    }
                </CardDestinationText>
            </CardDestination>
        </Card>
    )
}

interface AllocatedBusStateCardProps {
    boardingDate: string;
    boardingPoint: string;
    dropOffPoint: string;
    dropOffDate: string;
    isRun: boolean;
    busNumber: string;
    busScheduleId: number;
    isLink: boolean
}
export function AllocatedBusStateCard({
                                          boardingDate,
                                          boardingPoint,
                                          dropOffPoint,
                                          dropOffDate,
                                          isRun,
                                          busNumber,
                                          busScheduleId,
                                          isLink = true
}: AllocatedBusStateCardProps) {
    const navigate = useNavigate();


    return (
        <Card>
            <CardHeader>
                <CardInfo>
                    <CardTIme>
                        {getKstFormattedLabelPair(boardingDate).join(' ')}
                    </CardTIme>
                    <CardLocation>
                        {`${boardingPoint} 탑승`}
                    </CardLocation>
                </CardInfo>
            </CardHeader>
            <CardBusInfo>
                <BusIcon />
                <CardBusNumber>
                    {busNumber}
                </CardBusNumber>
                {
                    isRun ? <TimeUntilArrival boardingDate={boardingDate}/> : null
                }
            </CardBusInfo>
            <CardDestination>
                <CardDestinationText>
                    {`${formatKstTime(dropOffDate)} ${dropOffPoint} 도착`}
                </CardDestinationText>
                <Divider />
                <CardDestinationText>
                    {`${getTravelDuration(boardingDate, dropOffDate)} 소요`}
                </CardDestinationText>
            </CardDestination>
            {
                isLink &&
                <CardAction onClick={() => navigate(`/bus-tracker?busScheduleId=${busScheduleId}`)}>
                    <CardActionText>
                        {isRun ? "실시간 버스 위치 확인" : "버스 경로 확인"}
                    </CardActionText>
                    <ArrowRightIcon />
                </CardAction>
            }
        </Card>
    )
}


interface TimeUntilArrivalProps {
    boardingDate: string
}
export function TimeUntilArrival({boardingDate}: TimeUntilArrivalProps) {
    const [leaveTIme, setLeaveTIme] = useState<string>("")

    const updateLeaveTime = () => {
        const time = getTravelDuration(new Date().toISOString(), boardingDate, 1)
        setLeaveTIme(time)
    }

    useEffect(() => {
        updateLeaveTime()
        const timeout = setTimeout(updateLeaveTime, 60 * 1000)
        return () => {
            clearTimeout(timeout)
        }
    }, []);


    return (
        <ArrivalTime>
            {leaveTIme}
        </ArrivalTime>
    )
}