
// 스타일
import {
    ImgActionButton, ImgActionText, ImgRegistrationBox, InfoText, InfoTitle,
    PageDescription, PageInfoSection, PageInfoTextBox,
    PageMain,
    PageTitle, SaveButton, SaveButtonText,
    TableCell, TableCellText, TableHeader,
    TableHeaderText, TableWrapper
} from "@/pages/TimetableManagement/styles.ts";
// 컴포넌트
import PopHeader from "@/components/Headers/PopHeader";
import DefaultImgIcon from "@/components/designSystem/Icons/TimeTableManagement/DefaultImgIcon.tsx";
import PlusIcon from "@/components/designSystem/Icons/TimeTableManagement/PlusIcon.tsx";
import InfoIcon from "@/components/designSystem/Icons/TimeTableManagement/InfoIcon.tsx";
import DeleteIcon from "@/components/designSystem/Icons/TimeTableManagement/DeleteIcon.tsx";
import EasyTable, {ColumnInferface, RowInterace} from "@/pages/TimetableManagement/components/EasyTable";
import {colors} from "@/styles/colors.ts";
import {Fragment, useEffect, useRef, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {users_timetable_interface} from "@/api/query/users";
import {mountModal} from "@/components/Loading";
import TimePicker from "@/pages/TimetableManagement/components/TimePicker";
import useToast from "@/hooks/useToast";
import {putTimetable} from "@/api/timetable/putTimetable.ts";
import {isAxiosError} from "axios";
import {queryClient} from "@/main.tsx";


const fetchTimetable = async (timetable: users_timetable_interface, addToast: (message: string) => void) => {
    // 등교 하교 시간 검증. 등교 < 하교
    const timeArray = Object.values(timetable) as (keyof users_timetable_interface)[]
    for (let i = 0; i < 10; i += 2) {
        const time1 = parseInt((timeArray[i] ?? '00:00').split(':').join(), 10)
        const time2 = parseInt((timeArray[i + 1] ?? '00:00').split(':').join(), 10)

        if ((time1 > time2) && timeArray[i] && timeArray[i + 1]) {
            addToast("하교 시간은 등교 시간 이후여야 합니다.")
            return
        }
    }

    try {
        await putTimetable(timetable)
        addToast("시간표가 성공적으로 저장되었습니다.")
        await queryClient.invalidateQueries({
            queryKey: ["/api/users/timetable"]
        })
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            const { status } = error.response;

            if (status === 400) {
                return addToast("하교 시간은 등교 시간 이후여야 합니다.");
            }

            return addToast("알 수 없는 오류가 발생했습니다."); // 400 이외의 다른 응답 코드
        }

        addToast("네트워크 오류가 발생했습니다."); // AxiosError가 아닐 때 (예: 인터넷 끊김)
    }


}

export default function Page() {
    const [timetable]: [users_timetable_interface] = useLoaderData()
    const addToast = useToast();
    const timetableRef = useRef({
        ...timetable
    })
    const setTimetableRef = (key: string, value: string | null) => {
        const typeKey = key as keyof users_timetable_interface
        timetableRef.current[typeKey] = value
    }


    const DAYS_OF_WEEK = [
        '월',
        '화',
        '수',
        '목',
        '금',
    ]
    const COLUMN_NAME_LIST = [
        '',
        '등교',
        '하교'
    ]

    const column: ColumnInferface = {
        count: 3,
        width: [
            '20px',
            'calc((100% - 20px) / 2)',
            'calc((100% - 20px) / 2)'
        ],
        headNode: [
            ...COLUMN_NAME_LIST.map((columnName) => (
                <TableHeader>
                    <TableHeaderText color={colors.gray70}>
                        {columnName}
                    </TableHeaderText>
                </TableHeader>
            ))
        ],
        gap: '16px'
    }
    const row: RowInterace = {
        count: DAYS_OF_WEEK.length + 1,
        headNode: [
            ...DAYS_OF_WEEK.map((rowName) => (
                <TableHeader>
                    <TableHeaderText color={colors.gray70}>
                        {rowName}
                    </TableHeaderText>
                </TableHeader>
            ))
        ],
        gap: '6px;'
    }

    return (
        <div>
            <PopHeader text={"시간표 등록"}>
                <SaveButton onClick={() => fetchTimetable(timetableRef.current, addToast)}>
                    <SaveButtonText>
                        저장
                    </SaveButtonText>
                </SaveButton>
            </PopHeader>
            <PageMain>
                <PageTitle>
                    시간표 등록으로 더 쉬운 예매
                </PageTitle>
                <PageDescription>
                    나의 강의가 있는 요일과 시간에 맞추어 최적의 예매 옵션을 추천드려요.
                </PageDescription>
                <TableWrapper>
                    <EasyTable column={column} row={row}>
                        {renderTableRow({
                            timetable: timetableRef.current,
                            setTimetable: setTimetableRef,})}
                    </EasyTable>
                </TableWrapper>
                <ImgRegistrationBox>
                    {/* 서버 이미지 없으면 */}
                    <DefaultImgIcon />
                    <ImgActionButton onClick={() => addToast("현재 지원하지 않는 기능입니다.")}>
                        <PlusIcon />
                        <ImgActionText>
                            이미지 등록하기
                        </ImgActionText>
                    </ImgActionButton>
                </ImgRegistrationBox>
                <PageInfoSection>
                    <InfoIcon />
                    <PageInfoTextBox>
                        <InfoTitle>
                            에브리타임 시간표를 업로드하면 등하교 시간이 반영돼요.
                        </InfoTitle>
                        <InfoText>
                            에브리타임 시간표 탭 {">"} 설정 {">"} 이미지로 저장
                        </InfoText>
                    </PageInfoTextBox>
                </PageInfoSection>
            </PageMain>
        </div>
    )
}



interface RenderTableRowProps {
    timetable: users_timetable_interface
    setTimetable: (key: string, value: string | null) => void
}
function renderTableRow({ timetable, setTimetable }: RenderTableRowProps) {
    let data2: {key: keyof users_timetable_interface, time: string}[] = []
    const data: {key: keyof users_timetable_interface, time: string}[][] = []

    Object.keys(timetable).forEach((key, index) => {
        const typedKey = key as keyof users_timetable_interface
        const date = timetable[typedKey]?.split(':').slice(0, 2).join(':') ?? '-'
        if (index % 2 === 0) {
            data2 = [{
                key: typedKey,
                time: date
            }]
            data.push(data2)
        }
        else {
            data2.push({
                key: typedKey,
                time: date
            })
        }
    })


    return data.map((data, index) => (
        <Fragment key={index}>
            <TableItem timeKey={data[0].key} time={data[0].time} setTimetable={setTimetable} />
            <TableItem timeKey={data[1].key} time={data[1].time} setTimetable={setTimetable} />
        </Fragment>
    ));
}


interface TableItemProps {
    timeKey: string
    time: string
    setTimetable: (key: string, value: string | null) => void
}
function TableItem({ timeKey, time, setTimetable }: TableItemProps) {
    const [timeState, setTimeState] = useState(time)

    useEffect(() => {
        setTimetable(timeKey, timeState === '-' ? null : timeState)
    }, [timeState])


    return (
        <TableCell onClick={() => {
            const {render, unmountModal} = mountModal()
            render(
                <TimePicker
                    unmountModal={unmountModal}
                    timeState={timeState}
                    setTimeState={setTimeState}/>)
        }}>
            <TableCellText>
                {timeState}
            </TableCellText>
            {!(timeState === '-') && (
                <button onClick={(e) => {
                    e.stopPropagation()
                    setTimeState('-')
                }}>
                    <DeleteIcon />
                </button>
            )}
        </TableCell>
    )
}

