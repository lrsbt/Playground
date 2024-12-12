import { colorNames } from "./constants";

interface Preset {
  name: string;
  values: {
    chroma: number;
    spread: number;
    offset: number;
    hue: number;
  };
}

export const presets = <Preset[]>[
  {
    name: "Starry Night",
    values: {
      chroma: 11,
      spread: -4.3,
      offset: -20,
      hue: 284
    }
  },
  {
    name: "Salty Spitoon",
    values: {
      chroma: 20,
      spread: -1.9,
      offset: -4,
      hue: 284
    }
  },
  {
    name: "Sophisticated",
    values: {
      chroma: 14,
      spread: 0,
      offset: 16,
      hue: 272
    }
  }
];

export const levaSetup = () => ({
  chroma: {
    value: presets[0].values.chroma,
    min: 0,
    max: 50,
    step: 1
  },
  spread: {
    value: presets[0].values.spread,
    min: -8,
    max: 8,
    step: 0.1
  },
  offset: {
    value: presets[0].values.offset,
    min: -50,
    max: 50,
    step: 1
  },
  hue: {
    value: presets[0].values.hue,
    min: 0,
    max: 371,
    step: 1
  },
  background: {
    value: "grey900",
    options: colorNames
  },
  border: {
    value: "grey800",
    options: colorNames
  },
  p: {
    value: "grey400",
    options: colorNames
  },
  btnBg: {
    value: "grey800",
    options: colorNames
  },
  btnText: {
    value: "grey50",
    options: colorNames
  },
  btnHovBg: {
    value: "grey700",
    options: colorNames
  },
  btnHovTxt: {
    value: "grey50",
    options: colorNames
  }
});
