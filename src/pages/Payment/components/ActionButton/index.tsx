import {
    ActionButtonBox,
    ActionButtonPay,
    ActionButtonPayText,
    ActionButtonPop,
    ActionButtonPopText
} from "@/pages/Payment/components/ActionButton/styles.ts";


export default function ActionButton() {

    return (
        <ActionButtonBox>
            <ActionButtonPop>
                <ActionButtonPopText>
                    이전
                </ActionButtonPopText>
            </ActionButtonPop>
            <ActionButtonPay>
                <ActionButtonPayText>
                    결제하기
                </ActionButtonPayText>
            </ActionButtonPay>
        </ActionButtonBox>
    )
}