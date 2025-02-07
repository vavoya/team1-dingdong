import { ButtonContainer } from "./styles";
interface SolidButtonProps {
  text: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SolidButton({
  text = "확인",
  onClick = () => {},
  active = true,
}: SolidButtonProps) {
  return (
    <ButtonContainer disabled={!active} $active={active} onClick={onClick}>
      {text}
    </ButtonContainer>
  );
}
