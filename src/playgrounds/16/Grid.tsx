import { animated, useSpring } from "@react-spring/web";
import { Cell, Location } from "./types";
import { CELLSIZE, CELLSPACING, GRID } from "./const";
import { forwardRef, useEffect } from "react";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  style: any;
  selected: [number, number] | null;
  onSelect: (e: any) => void;
  cellData: Cell[];
}

const Grid = forwardRef(({ style, onPointerDown, ...props }: Props, ref) => (
  <animated.div
    ref={ref as React.RefObject<HTMLDivElement>}
    style={style}
    className="grid-container"
    onPointerDown={onPointerDown}
  >
    <div
      className="grid"
      style={{
        width: GRID * (CELLSIZE + CELLSPACING),
        height: GRID * (CELLSIZE + CELLSPACING)
      }}
    >
      {[...Array(GRID)].map((_, i) => (
        <GridRow key={i} rowIndex={i} {...props} />
      ))}
    </div>
  </animated.div>
));

interface GridRowProps {
  rowIndex: number;
  cellData: Cell[];
  onSelect: (e: any) => void;
}

const GridRow = ({ rowIndex, ...props }: GridRowProps) => {
  return [...Array(GRID)].map((_, colIndex) => (
    <Cell
      key={`${rowIndex}/${colIndex}`}
      x={colIndex}
      y={rowIndex}
      {...props}
    />
  ));
};

interface CellProps extends Location {
  onSelect: (e: any) => void;
  cellData: Cell[];
  selected?: [number, number];
}

const Cell = ({ x, y, onSelect, selected, cellData }: CellProps) => {
  const animateStyle = useSpring({ scale: 1 });

  const style = {
    width: CELLSIZE,
    height: CELLSIZE,
    left: x * (CELLSIZE + CELLSPACING),
    top: y * (CELLSIZE + CELLSPACING)
  };
  const isSelected = x == selected?.[0] && y == selected?.[1];
  const data = hasCellData(x, y, cellData);

  useEffect(() => {
    if (data?.skillName) {
      animateStyle.scale.start({
        from: 0.95,
        to: 1,
        config: {
          friction: 10
        }
      });
    }
  }, [data?.skillName]);

  return (
    <animated.div className="cell-container" style={animateStyle}>
      <div
        className={classNames(
          "cell",
          { "cell--selected": isSelected },
          { "cell--occupied": data },
          { "cell--hasImage": data?.icon }
        )}
        style={style}
        onClick={onSelect}
      >
        {data?.icon && <img src={data?.icon} className="cell-image" />}
      </div>
    </animated.div>
  );
};

const hasCellData = (x: number, y: number, cellData: Cell[]) => {
  return cellData.filter(
    (c) => c.location[0] === x && c.location[1] === y
  )?.[0];
};

export { Grid };
