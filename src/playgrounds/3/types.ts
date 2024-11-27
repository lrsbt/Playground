export interface UseColorSchemeProps {
  chroma?: number;
  hue?: number;
  spread?: number;
  offset?: number;
}

export interface Color {
  color: string;
  name: string;
}

export interface Option {
  name: string;
  shortCut?: string;
  children?: Option[];
}

export type OptionGroup = Option[];
