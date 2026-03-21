interface Props extends React.ComponentProps<"div"> {}

interface Props {
  x: number;
  y: number;
  variant: "small" | "large";
}

const sizes = {
  small: { size: 50, strokeWidth: 10, color: "#CEC6B6" },
  large: { size: 300, strokeWidth: 50, color: "#F7D48E" }
};

const Circle = ({ x, y, variant }: Props) => {
  const { size, strokeWidth, color } = sizes[variant];

  return (
    <svg
      width={size}
      height={size}
      stroke={color}
      fill="transparent"
      style={{
        position: "absolute",
        left: x,
        top: y
      }}
    >
      <circle
        r={size / 2 - strokeWidth / 2}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export { Circle };
