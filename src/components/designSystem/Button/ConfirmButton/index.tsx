import { ButtonContainer } from "./styles";
interface ConfirmButtonProps {
  text: string;
  active?: boolean;
  clicked?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ConfirmButton({
  text = "확인",
  onClick = () => {},
  clicked = false,
  active = true,
}: ConfirmButtonProps) {
  return (
    <ButtonContainer
      disabled={!active}
      active={active}
      onClick={onClick}
      clicked={clicked}>
      {text}
    </ButtonContainer>
  );
}
