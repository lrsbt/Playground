import { animated, useSpring } from "@react-spring/web";
import { ICONS } from "./const";

interface Props {
  selectedCell: [number, number];
  handeSetCellData: (x: number, y: number, name: string, icon: string) => void;
}

const Toolbar = ({ handeSetCellData, selectedCell }: Props) => {
  const isSelected = typeof selectedCell?.[0] === "number";

  const [style] = useSpring(
    () => ({
      translateY: isSelected ? 0 : 100,
      opacity: isSelected ? 1 : 0,
      config: {
        friction: 16,
        tension: 150
      }
    }),
    [isSelected]
  );

  return (
    <animated.div className="toolbar" style={style}>
      {Object.entries(ICONS).map(([name, icon], v) => {
        const handleSelect = () => {
          const [x, y] = selectedCell;
          handeSetCellData(x, y, name, icon);
        };

        return (
          <a className="toolbar-icon" key={name} onClick={handleSelect}>
            <img src={icon} />
          </a>
        );
      })}
    </animated.div>
  );
};

export { Toolbar };
