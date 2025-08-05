export interface Item {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  title: string;
  color: string;
  bars: number;
}
