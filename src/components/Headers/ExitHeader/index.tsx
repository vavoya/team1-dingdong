import {ActionButton, Title, Wrapper} from "@/components/Headers/ExitHeader/styles.ts";
import CancelIcon from "@/components/designSystem/Icons/CancelIcon.tsx";

interface ExitHeaderProps {
    text: string;
    onClick?: () => void;
}
export default function ExitHeader({text, onClick}: ExitHeaderProps) {


    return (
        <Wrapper>
            <Title>
                {text}
            </Title>
            <ActionButton onClick={onClick}>
                <CancelIcon />
            </ActionButton>
        </Wrapper>
    )
}