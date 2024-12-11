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
  const textRef = useRef<any>(null);
  const toolTipRef = useRef<any>(null);
  const textAreaRef = useRef<any>(null);

  const [state, setState] = useState<States>();
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Position>();

  const [text, setText] = useState(""); // Text tp be annotated
  const [annotationText, setAnnotationText] = useState("");

  const [rating, setRating] = useLocalStorage("rating", 2);
  const [annotations, setAnnotations] = useLocalStorage<string[]>(
    "annotations",
    []
  );

  const [toolTipStyle, api] = useSpring(() => ({
    translateX: 0,
    translateY: 0,
    opacity: 0
  }));

  const isToolTipClickEvent = (e: any) => {
    // return !!e.target.closest(".toolTip");
    return (
      e.target?.className === "toolTip" ||
      e.target?.parentElement?.className === "toolTip" ||
      e.target?.parentElement?.parentElement?.className === "toolTip"
    );
  };

  const onSelectStart = (e: any) => {
    // Allow for tooltip clicks
    // also keep the selected text selected.
    if (isToolTipClickEvent(e)) {
      return;
      e.preventDefault();
    }
    hideToolTip();
    setState(States.SELECTING);
    setSelection(undefined);
  };

  const hideToolTip = () => {
    setPosition(undefined);
  };

  const highlightSelection = () => {
    let newText = sanitize(myText); // Currently breaks if the text contains \n etc

    if (selection) {
      [...annotations, selection.toString()].map((a) => {
        const parts = split(newText, a);
        parts[1] = `<span className="box-annotation">${parts[1]}</span>`;
        newText = parts.join("");
      });
      setText(newText);
    }
  };

  const removeHighlighting = () => {
    applyAnnotations();
  };

  const onMouseUp = (e: any) => {
    if (position) {
      console.log("click");
    }

    // Allow for tooltip clicks
    if (isToolTipClickEvent(e)) {
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
    const toolTipHeight = toolTipRef.current?.clientHeight || 50;

    setPosition({
      x: rect.left + rect.width / 2 - toolTipWidth / 2,
      y: rect.top + window.scrollY - toolTipHeight - 8
    });
  };

  const addAnnotation = () => {
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

  const sanitize = (string: string) => {
    return string.replace(/(\r\n|\n|\r)/gm, " ");
  };

  const applyAnnotations = () => {
    let newText = sanitize(myText); // Currently breaks if the text contains \n etc

    annotations.map((a) => {
      const parts = split(newText, a);
      console.log(parts);
      parts[1] = `<span className="box-annotation">${parts[1]}</span>`;
      newText = parts.join("");
    });

    setText(newText);
  };

  const clearAnnotations = async () => {
    setAnnotations([]);
  };

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useEffect(() => {
    applyAnnotations();
  }, [annotations]);

  useEffect(() => {
    if (position) {
      highlightSelection();
      textAreaRef.current.focus();
      toolTipRef.current.style.pointerEvents = "auto";
      api.start({
        from: {
          opacity: 0,
          translateX: position.x,
          translateY: position.y - 5
        },
        to: { opacity: 1, translateX: position.x, translateY: position.y },
        config: {
          friction: 12
        }
      });
    }
    if (!position) {
      removeHighlighting();
      toolTipRef.current.style.pointerEvents = "none";
      api.start({
        opacity: 0,
        config: {
          friction: 20
        }
      });
    }
  }, [position]);

  return (
    <FullScreen centerContent info={info}>
      <animated.div className="toolTip" style={toolTipStyle} ref={toolTipRef}>
        <textarea
          className="toolTip-textarea"
          value={annotationText}
          onChange={(e) => setAnnotationText(e.target.value)}
          placeholder="Type something"
          ref={textAreaRef}
        />
        <a className="button button--sm" onClick={addAnnotation}>
          Save
        </a>
      </animated.div>
      <section className="box">
        <header className="box-header">
          <div className="box-avatar">S</div>
          <div className="box-name">Round 1 | Prompt</div>
          <div className="box-title">What happens when I eat grape seeds?</div>
        </header>
        <main className="box-content">
          <div className="box-text" id="box-text" ref={textRef}>
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
