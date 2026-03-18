import { useRef, useState } from "react";
import { DATA } from "../const";
import { ToastContext } from "./ToastContext";
import type { ToastType } from "../types";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>(DATA);
  const nextId = useRef(DATA.length + 1);

  const addToast = (toast: Omit<ToastType, "id">) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider };
