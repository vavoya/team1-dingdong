import PopHeader from "@/components/Headers/PopHeader";
import DingDongCard from "@/pages/Payment/components/DingDongCard";
import {

    ButtonBox, ButtonText,
    CardBox,
    Main,
    PageDivider,
    PageWrapper,
    RechargeButton,
    SendButton,
    SubTitle,
    Title
} from "@/pages/Wallet/styles.ts";
import {colors} from "@/styles/colors.ts";
import useToast from "@/hooks/useToast";
import {useLoaderData} from "react-router-dom";
import {users_wallet_history_interface} from "@/api/query/users";
import HistoryList from "@/pages/Wallet/component/HistoryList";
import {getFreeChargeAvailable} from "@/api/wallet/getFreeChargeAvailable.ts";
import {postFreeCharge} from "@/api/wallet/postFreeCharge.ts";
import {FREE_CHARGE_PRICE} from "@/env.ts";
import {formatKst} from "@/utils/time/formatKst.ts";
import {useState} from "react";


export default function Page() {
    const addToast = useToast();
    const [histories]: [users_wallet_history_interface] = useLoaderData()
    const [historyList, setHistoryList] = useState<users_wallet_history_interface>({...histories})
    console.log(historyList)


    const actFreeCharge = async () => {
        try {
            if ((await getFreeChargeAvailable()).available) {
                await postFreeCharge()

                setHistoryList((prev) => ({
                    ...prev,
                    histories: {
                        ...prev.histories,
                        content: [
                            {
                                timeStamp: formatKst((new Date).toISOString()),
                                type: "FREE_CHARGE",
                                amountMoney: FREE_CHARGE_PRICE,
                                remainMoney: FREE_CHARGE_PRICE + prev.histories.content[0].remainMoney
                            },
                            ...prev.histories.content,
                        ]
                    }
                }))

                addToast("무료 충전이 성공 했습니다.")
            }
            else{
                addToast("무료 충전은 1일 한번 입니다.")
            }
        }
        catch (error) {
            console.log(error);
            addToast("네트워크에 에러가 발생했어요.")
        }
    }

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
                    <SendButton onClick={() => addToast("현재 지원하지 않는 기능입니다.")}>
                        <ButtonText color={colors.gray90}>
                            딩동 머니 충전
                        </ButtonText>
                    </SendButton>
                    <RechargeButton onClick={actFreeCharge}>
                        <ButtonText color={colors.gray0}>
                            딩동 머니 무료 충전
                        </ButtonText>
                    </RechargeButton>
                </ButtonBox>
                <PageDivider />
                <HistoryList histories={historyList} />
            </Main>
        </PageWrapper>
    )

}

