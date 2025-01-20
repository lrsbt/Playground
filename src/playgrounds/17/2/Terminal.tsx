import classNames from "classNames";
import ReactHtmlParser from "react-html-parser";
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState
} from "react";
import { CopyThis } from "@app/components/Icons";

interface Props extends React.ComponentProps<"div"> {
  mode?: "bright" | "dark";
  title?: string;
  children: React.ReactNode;
}

type ChildProps = ReactElement<PropsWithChildren<TerminalLineProps>>;

const Terminal = ({ title, mode, className, children }: Props) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);

  const scrollToEnd = async () => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  };

  const copyToClipboard = () => {
    if (terminalRef.current)
      navigator.clipboard.writeText(terminalRef.current.innerText);
  };

  const classes = classNames("terminal", className, {
    "terminal--dark": mode === "dark",
    "terminal--bright": mode === "bright"
  });

  useEffect(() => {
    scrollToEnd();
  }, [currentLine]);

  return (
    <div className={classes}>
      <div className="terminal-header">
        {title}
        <a className="terminal-copyThis" onClick={copyToClipboard}>
          <CopyThis />
        </a>
      </div>
      <div className="terminal-content" ref={terminalRef}>
        {React.Children.map(children, (child, i) =>
          React.cloneElement(child as ChildProps, {
            isActive: currentLine === i,
            isDone: currentLine > i,
            onFinish: () => {
              setCurrentLine((l) => (l += 1));
            }
          })
        )}
      </div>
    </div>
  );
};

interface TerminalLineProps extends React.ComponentProps<"div"> {
  // Type
  type?: "progress";
  // Style
  noPrompt?: boolean;
  // Progress styling
  isActive?: boolean;
  isDone?: boolean;
  // Callback
  onFinish?: () => void;
  // Timing
  preDelay?: number;
  postDelay?: number;
  typeDelay?: number;
}

const TerminalLine = ({
  noPrompt,
  type,
  isActive,
  isDone,
  children,
  preDelay = 0,
  postDelay = 1000,
  typeDelay = 25,
  onFinish = () => {},
  ...props
}: TerminalLineProps) => {
  const [text, setText] = useState("");

  const wait = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const run = async () => {
    await wait(preDelay);

    if (type === "progress") {
      await showProgress();
    } else if (typeof children === "string") {
      await typeString(children, typeDelay);
    } else if (typeof children === "object") {
      await typeChildren(children);
    }

    await wait(postDelay);
    onFinish();
  };

  // Handles showing a progress-bar

  const showProgress = async () => {
    const progressLength = 20;
    const progressChar = "█";
    const chars = progressChar.repeat(progressLength);
    const progressPercent = 100;

    const runIt = async () => {
      for (let i = 1; i < chars.length + 1; i++) {
        const percent = Math.round((i / chars.length) * 100);
        const text = `${chars.slice(0, i)} ${percent}%`;
        setText(text);

        if (typeDelay > 0) await wait(typeDelay);
        if (percent > progressPercent) break;
      }
    };

    await runIt();
  };

  // Writes out a "string" of text

  const typeString = async (text: string, typeDelay: number) => {
    const runIt = async () => {
      for (const char of text) {
        setText((t) => `${t}${char}`);
        if (typeDelay > 0) await wait(typeDelay);
      }
    };

    await runIt();
  };

  // Handles <span>myText</span>

  const typeChildren = async (children: any) => {
    const runIt = async () => {
      const c = children?.length ? children : [children]; // Allow for a single child

      for (let i = 0; i < c.length; i++) {
        const { type, props } = c[i];
        setText((t) => `${t}<${type} class="${props.className}">`);
        await typeString(props.children, props.typeDelay || typeDelay);
        setText((t) => `${t}</${type}>`);
      }
    };

    await runIt();
  };

  useEffect(() => {
    if (isActive) run();
  }, [isActive]);

  return (
    <div
      className={classNames("terminal-line", {
        "terminal-line--active": isActive && text,
        "terminal-line--done": isDone,
        "terminal-line--noPrompt": noPrompt
      })}
      {...props}
    >
      {ReactHtmlParser(text)}
    </div>
  );
};

export { Terminal, TerminalLine };
