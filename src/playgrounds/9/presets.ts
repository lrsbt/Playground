import { folder } from "leva";
import { colorNames } from "./constants";

interface Preset {
  name: string;
  values: {
    chroma: number;
    spread: number;
    leftPush: number;
    offset: number;
    hue: number;
    //
    addWhite: boolean;
    background: string;
    border: string;
    p: string;
    btnBg: string;
    btnText: string;
    btnHovBg: string;
    btnHovTxt: string;
  };
}

export const presets = <Preset[]>[
  {
    name: "Starry Night",
    values: {
      chroma: 11,
      spread: -4.3,
      leftPush: 4.7,
      offset: -19,
      hue: 284,
      addWhite: true,
      background: "grey900",
      border: "grey800",
      p: "grey400",
      btnBg: "grey800",
      btnText: "grey50",
      btnHovBg: "grey700",
      btnHovTxt: "grey50"
    }
  },
  {
    name: "Salty Spitoon",
    values: {
      chroma: 20,
      spread: -1.9,
      leftPush: 4.7,
      offset: -4,
      hue: 284,
      addWhite: true,
      background: "grey900",
      border: "grey800",
      p: "grey400",
      btnBg: "grey800",
      btnText: "grey50",
      btnHovBg: "grey700",
      btnHovTxt: "grey50"
    }
  },
  {
    name: "Sophisticated",
    values: {
      chroma: 14,
      spread: 0,
      offset: 16,
      leftPush: 3.4,
      hue: 272,
      addWhite: true,
      background: "grey900",
      border: "grey800",
      p: "grey400",
      btnBg: "grey800",
      btnText: "grey50",
      btnHovBg: "grey700",
      btnHovTxt: "grey50"
    }
  },
  {
    name: "Noodle King",
    values: {
      chroma: 4,
      spread: -0.39999999999999947,
      leftPush: 0,
      offset: 10,
      hue: 371,
      addWhite: true,
      background: "grey900",
      border: "grey800",
      p: "grey400",
      btnBg: "grey800",
      btnText: "grey50",
      btnHovBg: "grey700",
      btnHovTxt: "grey50"
    }
  },
  {
    name: "Taxi Driver",
    values: {
      chroma: 17,
      spread: 0.3000000000000007,
      leftPush: -1.4000000000000004,
      offset: -7,
      hue: 272,
      addWhite: true,
      background: "grey900",
      border: "grey900",
      p: "grey300",
      btnBg: "grey800",
      btnText: "grey50",
      btnHovBg: "grey700",
      btnHovTxt: "grey50"
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
  leftPush: {
    value: presets[0].values.leftPush,
    min: -8,
    max: 8,
    step: 0.1
  },
  offset: {
    value: presets[0].values.offset,
    min: -100,
    max: 100,
    step: 1
  },
  hue: {
    value: presets[0].values.hue,
    min: 0,
    max: 371,
    step: 1
  },
  values: folder({
    addWhite: {
      value: true
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
  })
});
