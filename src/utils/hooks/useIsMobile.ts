import { useWindowSize } from "./useWindowSize";

export const useIsMobile = (breakpoint: 567 | 768 | 1024 = 768) => {
  const { width } = useWindowSize();
  return width < breakpoint;
};
