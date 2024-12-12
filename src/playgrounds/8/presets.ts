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
