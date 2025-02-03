import {LeftBox, NavButton, Title, Wrapper} from "@/components/Headers/PopHeader/styles.ts";
import ArrowLeftIcon from "@/components/designSystem/Icons/ArrowLeftIcon";
import {useNavigate} from "react-router-dom";


interface PropHeaderProps {
    text: string;
    children?: React.ReactNode;
}
export default function PopHeader({text, children}: PropHeaderProps) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // 브라우저 히스토리에서 한 단계 뒤로 이동
    };


    return (
        <Wrapper>
            <LeftBox>
                <NavButton onClick={handleGoBack}>
                    <ArrowLeftIcon />
                </NavButton>
                <Title>
                    {text}
                </Title>
            </LeftBox>
            {children}
        </Wrapper>
    )
}