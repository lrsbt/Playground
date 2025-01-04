import { useEffect, useRef } from "react";
import { elHasClass } from "@app/utils";
import { SpringRef, useSpring } from "@react-spring/web";

const useDraggableArea = (
  areaRef: React.RefObject<HTMLDivElement>,
  areaSpringRef: SpringRef,
  ignoreClass?: string,
  deselectClass?: string,
  deselectFn?: () => void
) => {
  const areaStyle = useSpring({
    translateX: 0,
    translateY: 0,
    ref: areaSpringRef
  });

  const areaStart = useRef([0, 0]);
  const areaCurrent = useRef([0, 0]);
  const areaLast = useRef([0, 0]);

  const isDragGuesture = useRef(false);

  const panToLocation = (x: number, y: number) => {
    areaCurrent.current = [areaLast.current[0] + x, areaLast.current[1] + y];
    areaSpringRef.start({
      translateX: areaCurrent.current[0],
      translateY: areaCurrent.current[1]
    });
    areaLast.current = areaCurrent.current;
  };

  const panTo = (event) => {
    const cam = [window.innerWidth / 2, window.innerHeight / 2];
    const targetRect = event.target.getBoundingClientRect();

    const areaDelta = [
      targetRect.x - cam[0] + targetRect.width / 2,
      targetRect.y - cam[1] + targetRect.height / 2
    ];

    areaCurrent.current = [
      areaLast.current[0] - areaDelta[0],
      areaLast.current[1] - areaDelta[1]
    ];

    areaSpringRef.start({
      translateX: areaCurrent.current[0],
      translateY: areaCurrent.current[1]
    });

    areaLast.current = areaCurrent.current;
  };

  const onPointerDown = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (ignoreClass && elHasClass(event, ignoreClass)) return;
    if (deselectClass && elHasClass(event, deselectClass)) {
      if (typeof deselectFn === "function") deselectFn();
      return;
    }
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    isDragGuesture.current = false;
    areaStart.current = [event.clientX, event.clientY];
  };

  const OnPointerMove = (event: MouseEvent) => {
    const areaDelta = [
      areaStart.current[0] - event.clientX,
      areaStart.current[1] - event.clientY
    ];

    // Allow for a bit of drag and it could still be
    // a click
    if (Math.abs(areaDelta[0] + areaDelta[1]) > 5) {
      isDragGuesture.current = true;
    }

    areaCurrent.current = [
      areaLast.current[0] - areaDelta[0],
      areaLast.current[1] - areaDelta[1]
    ];

    if (areaRef.current) {
      areaRef.current.style.cssText = `
        transform: translate(
          ${areaCurrent.current[0]}px,
          ${areaCurrent.current[1]}px
        )
      `;
    }
  };

  const OnPointerUp = (event: MouseEvent) => {
    areaLast.current = areaCurrent.current;
    areaSpringRef.set({
      translateX: areaLast.current[0],
      translateY: areaLast.current[1]
    });
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  // Painful bit but we need to catch all mouse-events
  // all the drags etc contain the click, so i use isDragGuesture
  // to figure out if something has been dragged, if not
  // it's a click!

  const onPointerSelect = (fn: () => void) => {
    if (isDragGuesture.current === false) {
      if (typeof fn === "function") fn();
    }
  };

  useEffect(() => {
    if (areaRef.current && areaSpringRef.current) {
      const targetRect = areaRef.current.getBoundingClientRect();
      panToLocation(
        (window.innerWidth - targetRect.width) / 4,
        (window.innerHeight - targetRect.height) / 4
      );
    }
  }, [areaRef.current, areaSpringRef.current]);

  return {
    areaStyle,
    onPointerDown,
    onPointerSelect,
    panTo
  };
};

export { useDraggableArea };
