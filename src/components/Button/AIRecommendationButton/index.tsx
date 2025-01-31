import { AI_RECOMMENDATION_TEXT } from "@/constants/buttonTexts";
import SparklesIcon from "@/components/designSystem/Icons/SparklesIcon";
import CheckCircleIcon from "@/components/designSystem/Icons/CheckCircleIcon";
import { ButtonContainer, Text } from "./styles";
interface AIRecommendationButtonProps {
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AIRecommendationButton({
  onClick = () => {},
  active = false,
}: AIRecommendationButtonProps) {
  return (
    <ButtonContainer onClick={onClick}>
      {active ? (
        <>
          <CheckCircleIcon />
          <Text active={active}>
            {AI_RECOMMENDATION_TEXT.getRecommendation}
          </Text>
        </>
      ) : (
        <>
          <SparklesIcon />
          <Text active={active}>
            {AI_RECOMMENDATION_TEXT.requestRecommendation}
          </Text>
        </>
      )}
    </ButtonContainer>
  );
}
