import classNames from "classNames";
import useMeasure from "react-use-measure";
import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { CONFIG, STUBTOAST } from "../../const";
import { useToast } from "../../Context/useToast";
import { ChevronUp, X } from "../../../../components/Icons";

import type { ToastType } from "../../types";

const Toast = ({ id, title, type, message }: ToastType) => {
  const { addToast, removeToast } = useToast();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [toastRef, { width: toastWidth }] = useMeasure();
  const [contentRef, { height: contentHeight }] = useMeasure();

  const handleExpand = () => setIsExpanded((v) => !v);
  const handlePause = () => setIsPaused((v) => !v);
  const handleClose = () => removeToast(id);

  const [expandStyle] = useSpring(
    () => ({
      height: isExpanded ? contentHeight : 0,
      config: { tension: 250 }
    }),
    [isExpanded]
  );

  const [timoutStyles] = useSpring(
    () => ({
      from: { width: 0, time: 15 },
      to: { width: toastWidth, time: 0 },
      pause: isPaused,
      config: {
        duration: CONFIG.DURATION
      },
      onRest: ({ cancelled, finished, value }) => {
        console.log({ cancelled, finished, value });
        if (finished) handleClose();
      }
    }),
    [toastWidth, isPaused]
  );

  return (
    <div
      key={id}
      ref={toastRef}
      className={classNames("toastt", `toast--${type}`, {
        "toast--expanded": isExpanded,
        "toast--paused": isPaused
      })}
    >
      <div className="toastt-wrap">
        <div className="toastt-header">
          <div className="toastt-icon">
            <div className="toastt-icon--chev">
              <ChevronUp stroke="#44cc99" strokeWidth={3} width={15} />
            </div>
          </div>
          <div className="toastt-title">{title}</div>
          <div className="toastt-actions">
            <animated.a
              href="#"
              onClick={handleExpand}
              className="toastt-actionExpand"
            >
              <ChevronUp />
            </animated.a>
            <a href="#" onClick={handleClose} className="toastt-actionClose">
              <X />
            </a>
          </div>
        </div>

        <animated.div className="toastt-content" style={expandStyle}>
          <div className="toastt-content-inner" ref={contentRef}>
            <div className="toastt-message">{message}</div>
            <div className="toastt-buttons">
              <a href="#" className="toastt-button" onClick={handleClose}>
                Okay
              </a>
              <a
                href="#"
                className="toastt-button"
                onClick={() => addToast(STUBTOAST)}
              >
                Add 1 more
              </a>
            </div>
          </div>
        </animated.div>
      </div>

      <div className="toastt-footer">
        <div className="toastt-closingMessage">
          <span className="toastt-closingText">
            This message will close in{" "}
            <animated.span className="bold">
              {timoutStyles.time.to((x) => Number(x.toFixed(0)) + 1)}
            </animated.span>{" "}
            seconds.
          </span>

          <a href="#" className="toastt-closingAction" onClick={handlePause}>
            <span>Click to stop.</span>
          </a>
        </div>
        <animated.div
          className="toastt-closingTimeout"
          style={{ width: timoutStyles.width }}
        />
      </div>
    </div>
  );
};

export { Toast };
