import PopHeader from "@/components/Headers/PopHeader";
import DingDongCard from "@/pages/Payment/components/DingDongCard";
import {
    ButtonBox, ButtonText,
    CardBox,
    History,
    HistoryAmount,
    HistoryAmountBox,
    HistoryBalance,
    HistoryDate,
    HistoryList,
    HistoryStatus,
    HistoryStatusBox, Main,
    PageDivider,
    PageWrapper,
    RechargeButton,
    SendButton,
    SubTitle,
    Title
} from "@/pages/Wallet/styles.ts";
import {colors} from "@/styles/colors.ts";
import useToast from "@/hooks/useToast";
import {useNavigate} from "react-router-dom";


export default function Page() {
    const navigate = useNavigate();
    const setToast = useToast();

    const temp: HistoryItemProps[] = [
        {
            isDeposit: false,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: true,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: false,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: true,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: false,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: true,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: false,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        },
        {
            isDeposit: true,
            date: '24.12.27 11:00',
            amount: '10,000원',
            balance: '잔액페이 12,000원'
        }
    ]

    return (
        <PageWrapper>
            <PopHeader text={"결제 수단 관리"} />
            <Main>
                <Title>
                    딩동머니 관리
                </Title>
                <SubTitle>
                    결제 및 입금 내역을 확인하세요!
                </SubTitle>
                <CardBox>
                    <DingDongCard />
                </CardBox>
                <ButtonBox>
                    <SendButton onClick={() => setToast("새  토스트토스트토스트토스트토스트토스트토스트토스트토스트")}>
                        <ButtonText color={colors.gray90}>
                            내 계좌로 송금하기
                        </ButtonText>
                    </SendButton>
                    <RechargeButton onClick={() => navigate('/home')}>
                        <ButtonText color={colors.gray0}>
                            딩동 머니 채우기
                        </ButtonText>
                    </RechargeButton>
                </ButtonBox>
                <PageDivider />
                <HistoryList>
                    {
                        temp.map((data, key) => (
                            <HistoryItem key={key} isDeposit={data.isDeposit} date={data.date} amount={data.amount} balance={data.balance}/>
                        ))
                    }
                </HistoryList>
            </Main>
        </PageWrapper>
    )
}

interface HistoryItemProps {
    isDeposit: boolean;
    date: string;
    amount: string;
    balance: string;
}
function HistoryItem({isDeposit, date, amount, balance}: HistoryItemProps) {
    return (
        <History>
            <HistoryStatusBox>
                <HistoryStatus isDeposit={isDeposit}>
                    {isDeposit ? "입금" : "출금"}
                </HistoryStatus>
                <HistoryDate>
                    {date}
                </HistoryDate>
            </HistoryStatusBox>
            <HistoryAmountBox>
                <HistoryAmount>
                    {amount}
                </HistoryAmount>
                <HistoryBalance>
                    {balance}
                </HistoryBalance>
            </HistoryAmountBox>
        </History>
    )
}