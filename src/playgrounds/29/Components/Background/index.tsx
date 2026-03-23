import { getRandomNumber } from "@app/utils";
import { pickOne } from "@app/utils";
import { Circle } from "./Circle";

type Location = [number, number];

const { innerWidth, innerHeight } = window;

const useRandomScreenLocations = (maxItems: number): Location[] => {
  return [...Array(maxItems)].map(() => [
    getRandomNumber(0, innerWidth),
    getRandomNumber(0, innerHeight)
  ]);
};

const Background = () => {
  const locations = useRandomScreenLocations(4);

  return (
    <div className="background">
      {locations.map(([x, y], i) => (
        <Circle key={i} x={x} y={y} variant={pickOne(["large", "small"])} />
      ))}
    </div>
  );
};

export { Background };
