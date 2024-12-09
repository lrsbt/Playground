import React, { useEffect, useRef, useState } from "react";
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
  width: number;
  height: number;
}

const text = `Black seedless grapes are prized for their lush, juicy pulp, very
sweet flavors, and highly
aromatic skins that offer a pleasant chewiness.
`;

const Playground = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<any>(null);
  const selectableContainerClasses = useRef(["box-text"]).current;

  const [state, setState] = useState<States>();
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Position>();
  const [annotations, setAnnotations] = useState<string[]>(["flavors"]);
  const isRunning = useRef(false);

  // const regexp = new RegExp("(" + annotations.join("|") + ")", "ig");
  // const myText = text.replace(regexp, '<span class="$&">$&</span>');

  const [rating, setRating] = useLocalStorage("rating", 2);

  // useEffect(() => {
  //   if (textRef?.current) {
  //     console.log({ x: textRef?.current });
  //     // textRef?.current?.innerHTML(myText);
  //   }
  // }, [textRef.current]);

  const isToolTipClickEvent = (e: any) => {
    return (
      e.target?.className === "toolTip" ||
      e.target?.parentElement?.className === "toolTip" ||
      e.target?.parentElement?.parentElement?.className === "toolTip"
    );
  };

  const onSelectStart = (e: any) => {
    // If clicking the annotation, don't hide tooltip
    // also keep the selected text selected.
    if (isToolTipClickEvent(e)) {
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
    // If clicking the annotation, don't hide tooltip
    if (isToolTipClickEvent(e)) {
      e.preventDefault();
      return;
    }

    const activeSelection = document.getSelection();
    const parentEl = activeSelection?.anchorNode?.parentElement;

    if (!activeSelection) return;
    if (!parentEl) return;
    if (!selectableContainerClasses?.includes(parentEl.className)) return;

    const text = activeSelection.toString();

    if (!text) {
      setState(States.READY);
      setSelection(undefined);
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text);

    const toolTipWidth = toolTipRef.current?.clientWidth || 110;

    setPosition({
      x: rect.left + rect.width / 2 - toolTipWidth / 2,
      y: rect.top + window.scrollY - 53
    });
  };

  const highlightSelection = () => {
    const selection = document.getSelection()?.getRangeAt(0);
    const selectedContent = selection?.extractContents();
    const span = document.createElement("span");
    span.className = "box-annotation";
    if (selectedContent) {
      span.appendChild(selectedContent);
      selection?.insertNode(span);
    }
  };

  const addAnnotation = () => {
    if (selection) {
      highlightSelection();
      setAnnotations([...annotations, selection]);
      window?.getSelection()?.empty();
      hideToolTip();
    }
  };

  const applyAnnotations = () => {
    const range = document.createRange();
    const text = document.getElementsByClassName("box-text")?.[0];
    if (text && text.firstChild) {
      const leftIndex = text.innerText.indexOf(annotations?.[0]);
      range.setStart(text.firstChild, leftIndex);
      range.setEnd(text.firstChild, leftIndex + annotations?.[0].length);
      const selectedContent = range?.extractContents();
      const span = document.createElement("span");
      span.className = "box-annotation";
      if (selectedContent) {
        span.appendChild(selectedContent);
        range?.insertNode(span);
      }
    }
  };

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

  const [toolTipStyle, api] = useSpring(() => ({
    translateX: 0,
    translateY: 0,
    opacity: 0
  }));

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

  // https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element

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
          <div className="box-text" ref={textRef}>
            Black seedless grapes are prized for their lush, juicy pulp, very
            sweet flavors, and highly aromatic skins that offer a pleasant
            chewiness.
            {/* <span className="box-annotation">flavors</span> */}
          </div>
        </main>
        <footer className="box-footer">
          <a className="button">Comments (4)</a>
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
