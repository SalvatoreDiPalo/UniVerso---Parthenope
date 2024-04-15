import Svg, { SvgProps, Path } from "react-native-svg";

export default function SvgComponent(props: SvgProps) {
  return (
    <Svg {...props}>
      <Path
        fill="#fff"
        d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z"
      />
    </Svg>
  );
}
