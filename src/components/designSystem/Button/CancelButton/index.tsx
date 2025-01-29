import { ButtonContainer } from "./styles";
interface ButtonProps {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  text = "취소",
  onClick = () => {},
}: ButtonProps) {
  return <ButtonContainer onClick={onClick}>{text}</ButtonContainer>;
}
