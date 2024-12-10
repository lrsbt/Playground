import React, { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { FullScreen } from "@app/components";
import { animated, useSpring } from "@react-spring/web";

import "./styles.css";
import info from "./info.md";
import { Star } from "@app/components/Icons/Star";
import { useLocalStorage } from "@app/hooks";

enum States {
  SELECTING,
  READY
}

interface Position {
  x: number;
  y: number;
}

const myText = `Black seedless grapes are prized for their lush, juicy pulp, very
sweet flavors, and highly
aromatic skins that offer a pleasant chewiness.
`;

const Playground = () => {
  const isRunning = useRef(false);
  const toolTipRef = useRef<any>(null);

  const [state, setState] = useState<States>();
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Position>();

  const [text, setText] = useState("");

  const [rating, setRating] = useLocalStorage("rating", 2);
  const [annotations, setAnnotations, clearAnnotation] = useLocalStorage<
    string[]
  >("annotations", []);

  const [toolTipStyle, api] = useSpring(() => ({
    translateX: 0,
    translateY: 0,
    opacity: 0
  }));

  const event_sToolTipClickEvent = (e: any) => {
    return (
      e.target?.className === "toolTip" ||
      e.target?.parentElement?.className === "toolTip" ||
      e.target?.parentElement?.parentElement?.className === "toolTip"
    );
  };

  const onSelectStart = (e: any) => {
    // Allow for tooltip clicks
    // also keep the selected text selected.
    if (event_sToolTipClickEvent(e)) {
      e.preventDefault();
      return;
    }
    hideToolTip();
    setState(States.SELECTING);
    setSelection(undefined);
  };

  const hideToolTip = () => {
    setPosition(undefined);
  };

  const onMouseUp = (e: any) => {
    // Allow for tooltip clicks
    if (event_sToolTipClickEvent(e)) {
      e.preventDefault();
      return;
    }

    const activeSelection = document.getSelection();
    const parentEl = activeSelection?.anchorNode?.parentElement;

    if (!activeSelection) return;
    if (!parentEl) return;
    if (!["box-text"]?.includes(parentEl.className)) return;

    const text = activeSelection.toString();
    const activeRange = activeSelection.getRangeAt(0);
    const rect = activeRange.getBoundingClientRect(); // for tooltip
    const content = activeRange.cloneContents(); // prevent selecing spans

    if (!text || content.querySelector("span")) {
      setState(States.READY);
      setSelection(undefined);
      return;
    }

    setSelection(text);

    const toolTipWidth = toolTipRef.current?.clientWidth || 110;

    setPosition({
      x: rect.left + rect.width / 2 - toolTipWidth / 2,
      y: rect.top + window.scrollY - 53
    });
  };

  const addAnnotation = async () => {
    if (selection) {
      setAnnotations([...annotations, selection]);
      window?.getSelection()?.empty();
      hideToolTip();
    }
  };

  const split = (string: string, separator: string) => {
    const regex = new RegExp(`(${separator})`, "");
    return string.split(regex);
  };

  const applyAnnotations = () => {
    let newText = myText;

    annotations.map((a) => {
      const splitParts = split(newText, a);
      splitParts[1] = `<span className="box-annotation">${splitParts[1]}</span>`;
      newText = splitParts.join("");
    });

    setText(newText);
  };

  const clearAnnotations = async () => {
    setAnnotations([]);
  };

  useEffect(() => {
    applyAnnotations();
  }, [annotations]);

  useEffect(() => {
    if (isRunning.current === false) applyAnnotations();
    isRunning.current = true;
  }, []);

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (position) {
      toolTipRef.current.style.pointerEvents = "auto";
      api.start({
        from: {
          opacity: 0,
          translateX: position.x,
          translateY: position.y - 5
        },
        to: { opacity: 1, translateX: position.x, translateY: position.y },
        config: {
          friction: 16
        }
      });
    }
    if (!position) {
      toolTipRef.current.style.pointerEvents = "none";
      api.start({
        opacity: 0
      });
    }
  }, [position]);

  return (
    <FullScreen centerContent info={info}>
      <animated.div className="toolTip" style={toolTipStyle} ref={toolTipRef}>
        <a onClick={addAnnotation}>Annotate</a>
      </animated.div>
      <section className="box">
        <header className="box-header">
          <div className="box-avatar">S</div>
          <div className="box-name">Round 1 | Prompt</div>
          <div className="box-title">What happens when I eat grape seeds?</div>
        </header>
        <main className="box-content">
          <div className="box-text" id="box-text">
            {parse(text)}
          </div>
        </main>
        <footer className="box-footer">
          <div className="box-buttons">
            <a className="button">Comments (4)</a>
            <a className="button" onClick={clearAnnotations}>
              Clear
            </a>
          </div>
          <div className="box-extra">
            <div>
              <div className="box-extra-label">Rate the answer</div>
              <div className="box-extra-content">
                <div className="box-extra--rating">
                  {[...Array(5)].map((_, i) => {
                    const className = i < rating ? "star star--filled" : "star";
                    return (
                      <Star
                        key={i}
                        className={className}
                        onClick={() => {
                          setRating(i + 1);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <div className="box-extra-label">Assessment</div>
              <div className="box-extra-content">
                <a className="button">Incomplete</a>
              </div>
            </div>
            <div>
              <div className="box-extra-label">Annotation</div>
              <div className="box-extra-content">
                <span className="box-extra-color" />
                Irrelevance
              </div>
            </div>
          </div>
        </footer>
      </section>
    </FullScreen>
  );
};

export default Playground;
