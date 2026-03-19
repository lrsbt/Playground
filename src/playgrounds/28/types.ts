export interface ToastType {
  id: number;
  title: string;
  type: "success" | "error" | "warning" | "info";
  message?: string;
}
