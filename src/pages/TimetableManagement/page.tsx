
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
import {Fragment} from "react";


export default function Page() {
    const DAYS_OF_WEEK = [
        '월',
        '화',
        '수',
        '목',
        '금',
        '토',
        '일'
    ]
    const COLUMN_NAME_LIST = [
        '',
        '등교',
        '하교'
    ]

    const temp = [
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['', ''],
        ['', ''],
        ['', ''],
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
                <SaveButton>
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
                        {renderTableRow({data: temp})}
                    </EasyTable>
                </TableWrapper>
                <ImgRegistrationBox>
                    {/* 서버 이미지 없으면 */}
                    <DefaultImgIcon />
                    <ImgActionButton>
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



function renderTableRow({data}: {data: string[][]}) {
    return data.map((row, index) => (
        <Fragment key={index}>
            <TableCell>
                <TableCellText>
                    {row[0] === '' ? '-' : row[0]}
                </TableCellText>
                <button>
                    <DeleteIcon />
                </button>
            </TableCell>
            <TableCell>
                <TableCellText>
                    {row[1] === '' ? '-' : row[1]}
                </TableCellText>
                <button>
                    <DeleteIcon />
                </button>
            </TableCell>
        </Fragment>
    ))
}


