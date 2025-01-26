import React, { ReactElement, useState } from "react";

interface Props {
  items: ReactElement<any, string>[];
  renderItem: (
    item: ReactElement<any, string>,
    isActive: boolean,
    onFinish: () => void
  ) => React.ReactNode;
  onDone: () => void;
}

const LineChildren = ({ items, renderItem, onDone }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onFinish = () => {
    if (selectedIndex === items.length - 1) {
      onDone();
    } else {
      setSelectedIndex((index) => (index += 1));
    }
  };

  return items.map((item, i) => {
    const isActive = selectedIndex === i;
    return renderItem(item, isActive, onFinish);
  });
};

export { LineChildren };
