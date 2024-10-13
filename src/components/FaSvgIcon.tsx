interface FaIconProps {
  width: number;
  height: number;
  svgPathData: string;
}

interface FaSvgIconProps extends React.SVGProps<SVGSVGElement> {
  faIcon: FaIconProps;
}

const FaSvgIcon: React.FC<FaSvgIconProps> = ({ faIcon, ...rest }) => {
  const { width, height, svgPathData } = faIcon;
  return (
    <svg
      {...rest}
      viewBox={`0 0 ${width} ${height}`}
      width="1.5em"
      height="1.5em"
      fill="currentColor"
    >
      <path d={svgPathData}></path>
    </svg>
  );
};

export default FaSvgIcon;
