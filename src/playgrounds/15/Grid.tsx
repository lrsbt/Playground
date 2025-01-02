import { animated } from "@react-spring/web";
import { Location } from "./types";
import { CELLSIZE, CELLSPACING, GRID } from "./const";
import { forwardRef } from "react";
import classNames from "classNames";

interface Props extends React.ComponentProps<"div"> {
  style: any;
}

const Grid = forwardRef(({ style, onPointerDown, ...props }: Props, ref) => {
  return (
    <animated.div
      ref={ref}
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
  );
});

interface GridRow {
  onSelect: () => void;
  rowIndex: number;
}

const GridRow = ({ rowIndex, ...props }: GridRow) => {
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
  onSelect: () => void;
  selected?: [number, number];
}

const Cell = ({ x, y, onSelect, selected }: CellProps) => {
  const style = {
    width: CELLSIZE,
    height: CELLSIZE,
    left: x * (CELLSIZE + CELLSPACING),
    top: y * (CELLSIZE + CELLSPACING)
  };
  const isSelected = x == selected?.[0] && y == selected?.[1];
  return (
    <div
      className={classNames("cell", { "cell--occupied": isSelected })}
      style={style}
      onClick={onSelect}
    >
      {/* {x} */}
    </div>
  );
};

export { Grid };
