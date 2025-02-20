import {TO_HOME_ALLOCATED, TO_SCHOOL_ALLOCATED} from "@/api/query/users";
import {
    BusNumber,
    DateText,
    HistoryItem,
    InfoBox, Status, StatusInfo, TripDivide,
    TripInfo,
    TripText
} from "@/pages/Reservations/components/BookingHistory/styles.ts";
import {formatKstDate} from "@/utils/time/formatKstDate.ts";
import {formatKstTime} from "@/utils/time/formatKstTime.ts";
import BusIcon from "@/components/designSystem/Icons/Home/BusIcon.tsx";
import {TimeUntilArrival} from "@/pages/Home/component/BusStateCard";
import BookingActionButton from "../../BookingActionButton";

interface AllocatedItemProps {
    status: TO_SCHOOL_ALLOCATED['operationInfo']['busStatus'] | TO_HOME_ALLOCATED['operationInfo']['busStatus'];
    boardingDate: string
    boardingPoint: string
    dropOffPoint: string
    dropOffDate: string
    busName: string
}
export default function AllocatedItem({
                           status,
                           boardingDate,
                           boardingPoint,
                           dropOffDate,
                           dropOffPoint,
                           busName}: AllocatedItemProps) {
    return (
        <HistoryItem>
            <InfoBox>
                <DateText>
                    {formatKstDate(boardingDate)}
                </DateText>
                <TripInfo>
                    <TripText>
                        {`${boardingPoint} ${formatKstTime(boardingDate)} 탑승`}
                    </TripText>
                    <TripDivide/>
                    <TripText>
                        {`${dropOffPoint} ${formatKstTime(dropOffDate)} 도착`}
                    </TripText>
                </TripInfo>
                <StatusInfo>
                    {status === 'ENDED' ?
                        <Status>운행 종료</Status>: null}
                    {status === 'RUNNING' || status === 'READY' ?
                        <>
                            <BusIcon/>
                            <BusNumber>
                                {busName}
                            </BusNumber>
                            {status === 'READY' ?
                                <Status>배차 완료</Status>:
                                <TimeUntilArrival boardingDate={boardingDate} dropOffDate={dropOffDate}/>
                            }
                        </>: null}
                </StatusInfo>
            </InfoBox>
            <BookingActionButton disabled={true}/>
        </HistoryItem>
    )
}