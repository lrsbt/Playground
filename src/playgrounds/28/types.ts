export interface ToastType {
  id: number;
  title: string;
  type: "success" | "error" | "info";
  message?: string;
}
