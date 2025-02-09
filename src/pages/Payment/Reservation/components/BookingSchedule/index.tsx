import EasyTable, {ColumnInferface, RowInterace} from "@/pages/TimetableManagement/components/EasyTable";
import {Fragment} from "react";
import {
    DirectionBox, DirectionText,
    DirectionType, DirectionTypeText,
    InfoBox,
    InfoText,
    TableBody,
    TableHead,
    TableText, TableWrapper, Title, Wrapper
} from "@/pages/Payment/Reservation/components/BookingSchedule/styles.ts";
import {colors} from "@/styles/colors.ts";
import ArrowRight2 from "@/components/designSystem/Icons/Payment/ArrowRight2.tsx";


export default function BookingSchedule() {
    const COLUMN_NAME_LIST = [
        "날짜",
        "탑승지",
        "도착 시간"
    ]
    const temp = [
        {
            date: '02.15 (수)',
            borderingPoint: '부산',
            arrivedAt: '11:00'
        },
        {
            date: '02.15 (수)',
            borderingPoint: '부산',
            arrivedAt: '11:00'
        },
        {
            date: '02.15 (수)',
            borderingPoint: '부산',
            arrivedAt: '11:00'
        },
        {
            date: '02.15 (수)',
            borderingPoint: '부산',
            arrivedAt: '11:00'
        },{
            date: '02.15 (수)',
            borderingPoint: '부산',
            arrivedAt: '11:00'
        }
    ]


    const colum: ColumnInferface = {
        count: 3,
        width: [
            '80px',
            'calc((100% - 80px) / 2)',
            'calc((100% - 80px) / 2)'
        ],
        headNode: [
            ...COLUMN_NAME_LIST.map((columnName, index) => (
                <TableHead  textAlignLeft={index !== (COLUMN_NAME_LIST.length - 1)}>
                    <TableText color={colors.gray70}>
                        {columnName}
                    </TableText>
                </TableHead>
            ))
        ]
    }
    const row: RowInterace = {
        count: temp.length + 1,
    }



    return (
        <Wrapper>
            <Title>
                예매 일정
            </Title>
            <InfoBox>
                <InfoText>
                    배차 확정 여부와 탑승 시각은
                </InfoText>
                <br />
                <InfoText>
                    탑승&nbsp;
                </InfoText>
                <InfoText isHighlight={true}>
                    48시간&nbsp;전
                </InfoText>
                <InfoText>
                    에 안내드려요.
                </InfoText>
            </InfoBox>
            <DirectionBox>
                <DirectionType>
                    <DirectionTypeText>등교</DirectionTypeText>
                </DirectionType>
                <DirectionText>집</DirectionText>
                <ArrowRight2 />
                <DirectionText>학교</DirectionText>
            </DirectionBox>
            <TableWrapper>
                <EasyTable column={colum} row={row}>
                    {
                        temp.map((row, index) => (
                            <Fragment key={index}>
                                <TableBody>
                                    <TableText color={colors.gray100}>
                                        {row.date}
                                    </TableText>
                                </TableBody>
                                <TableBody>
                                    <TableText color={colors.gray100}>
                                        {row.borderingPoint}
                                    </TableText>
                                </TableBody>
                                <TableBody textAlignLeft={false}>
                                    <TableText color={colors.gray100}>
                                        {row.arrivedAt}
                                    </TableText>
                                </TableBody>
                            </Fragment>
                        ))
                    }
                </EasyTable>
            </TableWrapper>
        </Wrapper>
    )
}