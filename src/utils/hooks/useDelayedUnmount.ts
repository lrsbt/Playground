import { useState, useEffect } from "react";

export const useDelayedUnmout = (isOpen: boolean, time: number = 250) => {
  const [delayedUnmount, setDelayedUnmount] = useState(false);

  useEffect(() => {
    setTimeout(setDelayedUnmount, isOpen ? 0 : time, isOpen);
  }, [isOpen]);

  return delayedUnmount;
};
