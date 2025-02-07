import { ButtonContainer } from "./styles";
interface ConfirmButtonProps {
  text: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ConfirmButton({
  text = "확인",
  onClick = () => {},
  active = true,
}: ConfirmButtonProps) {
  return (
    <ButtonContainer disabled={!active} $active={active} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
}
