import { useEffect, useRef, useState } from 'react';

type Options = {
  defaultText: string;
  target: string | null;
  typeMs?: number;
  eraseMs?: number;
};

export function useTypewriter({ defaultText, target, typeMs = 80, eraseMs = 50 }: Options) {
  const [text, setText] = useState(defaultText);
  const [announce, setAnnounce] = useState<string>(defaultText);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending timers on unmount
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }

    // No active target: animate back to default (erase then type once)
    if (!target) {
      if (text === defaultText) return;
      const current = text;
      let pos = current.length;

      const typeDefault = () => {
        if (pos < defaultText.length) {
          pos += 1;
          setText(defaultText.slice(0, pos));
          timer.current = window.setTimeout(typeDefault, typeMs);
        } else {
          setAnnounce(defaultText);
        }
      };

      const eraseCurrent = () => {
        if (pos > 0) {
          pos -= 1;
          setText(current.slice(0, pos));
          timer.current = window.setTimeout(eraseCurrent, eraseMs);
        } else {
          timer.current = window.setTimeout(typeDefault, typeMs);
        }
      };

      timer.current = window.setTimeout(eraseCurrent, eraseMs);
      return;
    }

    if (text === target) {
      setAnnounce(target);
      return;
    }

    const current = text;
    let pos = current.length;

    const typeTarget = () => {
      if (pos < (target as string).length) {
        pos += 1;
        setText((target as string).slice(0, pos));
        timer.current = window.setTimeout(typeTarget, typeMs);
      } else {
        setAnnounce(target as string);
      }
    };

    const eraseCurrent = () => {
      if (pos > 0) {
        pos -= 1;
        setText(current.slice(0, pos));
        timer.current = window.setTimeout(eraseCurrent, eraseMs);
      } else {
        timer.current = window.setTimeout(typeTarget, typeMs);
      }
    };

    timer.current = window.setTimeout(eraseCurrent, eraseMs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return { text, announce };
}

export default useTypewriter;
