import React, { useRef } from "react";
import classNames from "classNames";

interface Props {
  label?: string;
  isConnected?: boolean;
}

import { type SVGProps } from "react";
import { animated, useSpringValue } from "@react-spring/web";

interface IProps extends SVGProps<SVGSVGElement> {
  position: any;
}

export const LevelKnob = React.forwardRef(
  ({ position, ...props }: IProps, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill="none"
        viewBox="0 0 60 60"
        ref={ref}
        {...props}
      >
        <g filter="url(#a)">
          <circle cx="30" cy="30" r="30" fill="#BCB8AE" />
          <circle cx="30" cy="30" r="30" fill="url(#b)" />
        </g>
        {/* Shadow */}
        <animated.g
          filter="url(#c)"
          // opacity={position.interpolate({
          //   range: [0, 180, 280, 520],
          //   output: [0.5, 1, 0.5, 0.5],
          //   extrapolate: "clamp"
          // })}
        >
          <animated.path
            fill="#C0BBB1"
            d="M20 52.824V9.176A23.9 23.9 0 0 1 30 7c3.965 0 7.705.961 11 2.664v42.672A23.9 23.9 0 0 1 30 55c-3.569 0-6.956-.779-10-2.176"
          />
        </animated.g>
        <path fill="url(#d)" d="M28 0h4v22h-4z" />
        <g filter="url(#e)">
          <path fill="#242022" d="M32 7.082V22h-4V7.082a24.3 24.3 0 0 1 4 0" />
        </g>
        {/* left shadow */}
        <path
          fill="url(#f)"
          d="M15 12.264v37.472a24 24 0 0 0 5 3.088V9.176a24 24 0 0 0-5 3.088"
        />
        {/* right shadow */}
        <path
          fill="url(#g)"
          d="M45 12.264v37.472a24 24 0 0 1-5 3.088V9.176a24 24 0 0 1 5 3.088"
        />
        {/* Interpolated shadow on the knob base */}
        <defs>
          <linearGradient
            id="b"
            x1="0"
            x2="60"
            y1="30"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            <animated.stop
              stopColor={position.interpolate({
                range: [0, 50, 180, 280, 520],
                output: ["#999185", "#999185", "#CFCEC4", "#CFCEC4", "#CFCEC4"],
                extrapolate: "clamp"
              })}
            />
            <animated.stop
              offset="1"
              stopColor={position.interpolate({
                range: [0, 100, 220],
                output: ["#CFCEC4", "#CFCEC4", "#999185"],
                extrapolate: "clamp"
              })}
            />
          </linearGradient>

          <linearGradient
            id="d"
            x1="30"
            x2="30"
            y1="0"
            y2="7.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#242022" />
            <stop offset="1" stopColor="#242022" stopOpacity=".6" />
          </linearGradient>
          {/* left shadow def */}
          <linearGradient
            id="f"
            x1="15"
            x2="20"
            y1="31"
            y2="31"
            gradientUnits="userSpaceOnUse"
          >
            <animated.stop
              offset="1"
              stopColor={position.interpolate({
                range: [0, 50, 180, 280, 420],
                output: ["#999185", "#999185", "#CFCEC4", "#CFCEC4", "#999185"]
              })}
            />
          </linearGradient>
          <linearGradient
            id="g"
            x1="45"
            x2="40"
            y1="31"
            y2="31"
            gradientUnits="userSpaceOnUse"
          >
            <animated.stop
              offset="1"
              stopColor={position.interpolate({
                range: [0, 100, 320],
                output: ["#C0BBB1", "#C0BBB1", "#999185"]
              })}
            />
          </linearGradient>
          <filter
            id="a"
            width="60"
            height="62"
            x="0"
            y="0"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
            <feBlend in2="shape" result="effect1_innerShadow_117_209" />
          </filter>
          <filter
            id="c"
            width="29"
            height="56"
            x="16"
            y="7"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .25 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_117_209"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_117_209"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.3 0" />
            <feBlend in2="shape" result="effect2_innerShadow_117_209" />
          </filter>
          <filter
            id="e"
            width="4"
            height="16"
            x="28"
            y="7"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.25" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
            <feBlend in2="shape" result="effect1_innerShadow_117_209" />
          </filter>
        </defs>
      </svg>
    );
  }
);

const Level = ({ label }: Props) => {
  const knobRef = useRef<SVGSVGElement | null>(null);
  const valueRef = useRef<HTMLDivElement | null>(null);

  const startY = useRef(160);
  const currentY = useRef(0);
  const lastRot = useRef(startY.current);

  const minRot = useRef(0).current;
  const maxRot = useRef(320).current;
  const speed = useRef(1.5).current;

  const position = useSpringValue(startY.current);

  const onPointerDown = (event: any) => {
    document.addEventListener("pointermove", OnPointerMove);
    document.addEventListener("pointerup", OnPointerUp);

    startY.current = event.clientY;
  };

  const OnPointerMove = (event: any) => {
    const delta = startY.current - event.clientY;
    currentY.current = lastRot.current + delta * speed;

    if (currentY.current > maxRot) currentY.current = maxRot;
    if (currentY.current < minRot) currentY.current = minRot;
    if (valueRef.current) {
      valueRef.current.style = `background: conic-gradient(from -160deg, #a8d4f9 ${currentY.current}deg, #3C4456 0deg)`;
      knobRef.current.style = `transform: rotate(${currentY.current + 195}deg)`;
      position.set(currentY.current);
      console.log(currentY.current);
    }
  };

  const OnPointerUp = (event: any) => {
    lastRot.current = currentY.current;
    document.removeEventListener("pointermove", OnPointerMove);
    document.removeEventListener("pointerup", OnPointerUp);
  };

  return (
    <div className="level-container">
      <div className="level" onPointerDown={onPointerDown}>
        <div
          ref={valueRef}
          className="level-value"
          style={{
            background: `conic-gradient(from -160deg, #a8d4f9 ${startY.current}deg, #3C4456 0deg)`
          }}
        >
          <LevelKnob ref={knobRef} position={position} />
        </div>
      </div>
      <div className="level-label">{label}</div>
    </div>
  );
};

export { Level };
