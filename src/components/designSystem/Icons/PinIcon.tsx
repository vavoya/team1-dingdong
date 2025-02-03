import { colors } from "@/styles/colors";

export default function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="16"
      viewBox="0 0 4 16"
      fill="none">
      <line
        x1="2"
        y1="4.37114e-08"
        x2="2"
        y2="13"
        stroke={colors.gray100}
        strokeWidth="2"
      />
      <circle cx="2" cy="14" r="2" fill={colors.gray100} />
    </svg>
  );
}
