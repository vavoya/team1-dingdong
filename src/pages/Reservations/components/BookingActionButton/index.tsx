import {ActionButton, ActionText} from "@/pages/Reservations/components/BookingActionButton/styles.ts";



type BookingHistoryProps = {
    disabled?: boolean;
}
export default function BookingActionButton({disabled = false}: BookingHistoryProps) {


    return (
        <ActionButton disabled={disabled}>
            <ActionText disabled={disabled}>
                예매 취소
            </ActionText>
        </ActionButton>
    )
}