import {BookingHistory} from "@/pages/Reservations/styles.ts";

type FilterButtonProps = {
    text: string;
    onClick: () => void;
    isActive?: boolean;
}
export default function FilterButton({text, onClick, isActive = false}: FilterButtonProps) {
    return (
        <BookingHistory.FilterButton isActive={isActive} onClick={onClick}>
            <BookingHistory.FilterText isActive={isActive}>
                {text}
            </BookingHistory.FilterText>
        </BookingHistory.FilterButton>
    )
}