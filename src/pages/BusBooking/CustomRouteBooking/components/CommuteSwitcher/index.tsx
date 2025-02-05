import HomeIcon from "@/components/designSystem/Icons/HomeIcon";
import {
  CommuteViewBox,
  DeparturePoint,
  Destination,
  LocationName,
  PointTitle,
  Subtitle,
  SubtitleText,
  TitleText,
  Wrapper,
} from "./styles";

export default function CommuteSwitcher() {
  return (
    <Wrapper>
      <Subtitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
            stroke="#FF6F00"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <SubtitleText>등교</SubtitleText>
      </Subtitle>
      <CommuteViewBox>
        <DeparturePoint>
          <PointTitle>
            <HomeIcon />
            <TitleText>집</TitleText>
          </PointTitle>

          <LocationName>학동역</LocationName>
        </DeparturePoint>
        <Destination>
          <PointTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.44667 1.91839C9.16998 1.76028 8.83031 1.76028 8.55362 1.91839L2.25362 5.51839C1.82205 5.76499 1.67211 6.31476 1.91872 6.74633C2.08467 7.03673 2.38789 7.19962 2.69999 7.19996V13.4998C2.20293 13.4998 1.79999 13.9027 1.79999 14.3998C1.79999 14.8969 2.20293 15.2998 2.69999 15.2998H15.3C15.797 15.2998 16.2 14.8969 16.2 14.3998C16.2 13.9027 15.797 13.4998 15.3 13.4998V7.19996C15.6122 7.19972 15.9156 7.03683 16.0816 6.74633C16.3282 6.31476 16.1782 5.76499 15.7467 5.51839L9.44667 1.91839ZM5.39999 8.0998C4.90293 8.0998 4.49999 8.50275 4.49999 8.9998V11.6998C4.49999 12.1969 4.90293 12.5998 5.39999 12.5998C5.89704 12.5998 6.29999 12.1969 6.29999 11.6998V8.9998C6.29999 8.50275 5.89704 8.0998 5.39999 8.0998ZM8.09999 8.9998C8.09999 8.50275 8.50293 8.0998 8.99999 8.0998C9.49704 8.0998 9.89999 8.50275 9.89999 8.9998V11.6998C9.89999 12.1969 9.49704 12.5998 8.99999 12.5998C8.50293 12.5998 8.09999 12.1969 8.09999 11.6998V8.9998ZM12.6 8.0998C12.1029 8.0998 11.7 8.50275 11.7 8.9998V11.6998C11.7 12.1969 12.1029 12.5998 12.6 12.5998C13.097 12.5998 13.5 12.1969 13.5 11.6998V8.9998C13.5 8.50275 13.097 8.0998 12.6 8.0998Z"
                fill="#59596E"
              />
            </svg>
            <TitleText>학교</TitleText>
          </PointTitle>

          <LocationName>서울대학교</LocationName>
        </Destination>
      </CommuteViewBox>
    </Wrapper>
  );
}
