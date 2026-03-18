import { createContext } from "react";
import type { ToastType } from "../types";

type ToastContextType = {
  toasts: ToastType[];
  addToast: (toast: Omit<ToastType, "id">) => void;
  removeToast: (id: ToastType["id"]) => void;
};

export const ToastContext = createContext<ToastContextType | null>(null);
