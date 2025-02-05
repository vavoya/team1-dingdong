
// 스타일
import {
    ImgActionButton, ImgActionText, ImgRegistrationBox, InfoText, InfoTitle,
    PageDescription, PageInfoSection, PageInfoTextBox,
    PageMain,
    PageTitle, SaveButton, SaveButtonText,
    TableCell, TableCellText,
    TableHeaderText, TableWrapper
} from "@/pages/TimetableManagement/styles.ts";
// 컴포넌트
import PopHeader from "@/components/Headers/PopHeader";
import CreateTable from "@/pages/TimetableManagement/components/CreateTable";
import DefaultImgIcon from "@/components/designSystem/Icons/TimeTableManagement/DefaultImgIcon.tsx";
import PlusIcon from "@/components/designSystem/Icons/TimeTableManagement/PlusIcon.tsx";
import InfoIcon from "@/components/designSystem/Icons/TimeTableManagement/InfoIcon.tsx";
import DeleteIcon from "@/components/designSystem/Icons/TimeTableManagement/DeleteIcon.tsx";


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

    const temp = [
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['12:00', '12:00'],
        ['', ''],
        ['', ''],
        ['', ''],
    ]

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
                    <CreateTable
                        gap={{column: '16px', row: '6px'}}
                        title={{
                            column: [
                                <TableHeaderText>
                                    등교
                                </TableHeaderText>,
                                <TableHeaderText>
                                    하교
                                </TableHeaderText>
                            ],
                            row: [...DAYS_OF_WEEK.map(day => <TableHeaderText>{day}</TableHeaderText>)]
                        }}
                        columnWidth={[
                            '20px',
                            'calc((100% - 20px) / 2)',
                            'calc((100% - 20px) / 2)'
                        ]}
                    >
                        {renderTableBody({data: temp})}
                    </CreateTable>
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




// helper function
function renderTableBody({data}: {data: string[][]}) {

    return data
        .map((row, index) => (
            <tr key={index}>
                {renderTableRow({row})}
            </tr>
        ))
}

function renderTableRow({row}: {row: string[]}) {
    return row
        .map((time, index) => {
            return (
                <TableCell key={index}>
                    <TableCellText>
                        {time === '' ? '-' : time}
                    </TableCellText>
                    <button>
                        <DeleteIcon/>
                    </button>
                </TableCell>
            )
        })
}


