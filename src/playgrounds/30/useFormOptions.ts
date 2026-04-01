export const useFormOptions = () => {
  const optionsUse = [
    { label: "Reading", value: "reading" },
    { label: "Distance", value: "distance" }
  ];

  const optionsLarge = [...Array(73)].map((_, i) => {
    const val = 6 - i * 0.25;
    const prefix = val > 0 ? "+" : "";
    return {
      label: `${prefix}${val}`,
      value: `${prefix}${val}`
    };
  });

  const optionsSmall = [...Array(13)].map((_, i) => {
    const val = i * 0.25;
    const prefix = val > 0 ? "+" : "";
    return {
      label: `${prefix}${val}`,
      value: `${prefix}${val}`
    };
  });

  return {
    optionsUse,
    optionsSmall,
    optionsLarge
  };
};
