import {Wrapper} from "@/pages/Wallet/component/HistoryList/styles.ts";
import {users_wallet_history, users_wallet_history_interface} from "@/api/query/users";
import {
    History,
    HistoryAmount,
    HistoryAmountBox, HistoryBalance,
    HistoryDate,
    HistoryStatus,
    HistoryStatusBox
} from "@/pages/Wallet/component/HistoryList/styles.ts";
import {useRef, useState} from "react";
import {getKstFormattedLabelPair} from "@/utils/time/getKstFormattedLabelPair.ts";
import LoadingCard from "@/pages/Home/component/LoadingCard";
import {queryClient} from "@/main.tsx";


export default function HistoryList({histories}: {histories: users_wallet_history_interface}) {
    const [contents, setContents] = useState<users_wallet_history_interface['histories']['content']>([...histories.histories.content]);
    const contentSizeRef = useRef({
        page: histories.histories.page.number,
        pageSize: 20,
    })
    const [isLast, setIsLast] = useState<boolean>(false);

    const getNextHistories = (errorCallbackF: Function) => {
        queryClient.fetchQuery(users_wallet_history({
            page: contentSizeRef.current.page + 1,
            pageSize: contentSizeRef.current.pageSize,
        })).then((result) => {
            const newContent = result.histories.content
            contentSizeRef.current.page = result.histories.page.number
            setIsLast(result.histories.page.number >= (result.histories.page.totalPages - 1))
            setContents([...contents, ...newContent])
        }).catch((err) => {
            errorCallbackF(err)
        })
    }

    return (
        <Wrapper>
            {
                contents.map((content, index) => (
                    <HistoryItem key={index} content={content}/>
                ))
            }
            {
                !isLast ? <LoadingCard getNextBusState={getNextHistories}/> : null
            }
        </Wrapper>
    )
}




function HistoryItem({ content }: {content: users_wallet_history_interface['histories']['content'][number]}) {
    const transactionStatus: Record<users_wallet_history_interface['histories']['content'][number]['type'], string> = {
        PAY: "예매",
        REFUND: "예매 환불",
        CHARGE: "무료 충전"
    }
    const transactionColorType: Record<users_wallet_history_interface['histories']['content'][number]['type'], boolean> = {
        PAY: false,
        REFUND: true,
        CHARGE: true
    }

    return (
        <History>
            <HistoryStatusBox>
                <HistoryStatus isDeposit={transactionColorType[content.type]}>
                    {transactionStatus[content.type]}
                </HistoryStatus>
                <HistoryDate>{getKstFormattedLabelPair(content.timeStamp).join(' ')}</HistoryDate>
            </HistoryStatusBox>
            <HistoryAmountBox>
                <HistoryAmount>{`${transactionColorType[content.type] ? '' : '-'}${content.amountMoney.toLocaleString()}원`}</HistoryAmount>
                <HistoryBalance>{content.remainMoney.toLocaleString() + "원"}</HistoryBalance>
            </HistoryAmountBox>
        </History>
    );
}
