import mitt from "mitt";
import { useEffect, useRef, useState } from "react";

export interface Toast {
  id: number;
  text: string;
  done: boolean;
}

const EVENTS = { SHOW: "SHOW", HIDE: "HIDE" } as const;
const TIMEOUT = 4000;
const emitter = mitt();

export const showToast = (text: Toast["text"]) =>
  emitter.emit(EVENTS.SHOW, text);
export const hideToast = (id: Toast["id"]) => emitter.emit(EVENTS.HIDE, id);

export const useToast = () => {
  const index = useRef(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (text: string) => {
    setToasts((t) => {
      const id = index.current++;
      const newState = [...t, { id, text, done: false }];
      setTimeout(remove, TIMEOUT, id);
      return newState;
    });
  };

  const remove = (id: Toast["id"]) => {
    setToasts((state) =>
      state.map((toast) => {
        if (toast.id === id) {
          return { ...toast, done: true };
        } else {
          return toast;
        }
      })
    );
  };

  const hide = (id: Toast["id"]) => {
    remove(id);
  };

  useEffect(() => {
    emitter.on(EVENTS.SHOW, show as any);
    emitter.on(EVENTS.HIDE, hide);

    return () => {
      emitter.off(EVENTS.SHOW, show as any);
      emitter.off(EVENTS.HIDE, hide);
    };
  }, []);

  return { toasts };
};
