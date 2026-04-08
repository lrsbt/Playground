export const COURT = {
  width: 6.4,
  length: 9.75,
  height: 5.64,
};

export const PHYSICS = {
  gravity: -9.8,
  drag: 0.999,
  restitution: {
    floor: 0.7 - 0.35,
    wall: 0.9 - 0.35,
    ceiling: 0.85 - 0.35,
  },
  sleepThreshold: 0.05,
};
