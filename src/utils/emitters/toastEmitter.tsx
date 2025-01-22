import mitt from "mitt";
import { useEffect, useRef, useState } from "react";

const EVENTS = { SHOW: "SHOW", HIDE: "HIDE" } as const;
const TIMEOUT = 2000;
const emitter = mitt();

export const showToast = (text: string) => emitter.emit(EVENTS.SHOW, text);
export const hideToast = () => emitter.emit(EVENTS.HIDE);

export interface Toast {
  id: number;
  text: string;
}

export const useToast = () => {
  const index = useRef(0);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = (text: string) => {
    setToasts((t) => {
      const id = index.current++;
      setTimeout(remove, TIMEOUT, id);
      return [...t, { id, text }];
    });
  };

  const remove = (id: Toast["id"]) => {
    setToasts((t) => t.filter((tt) => tt.id !== id));
  };

  const hide = () => setToasts([]); // todo

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
