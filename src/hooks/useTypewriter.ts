import { useEffect, useRef, useState } from 'react';

type Options = {
  defaultText: string;
  target: string | null;
  typeMs?: number;
  eraseMs?: number;
  pauseMs?: number;
  reduce?: boolean;
};

export function useTypewriter({ defaultText, target, typeMs = 80, eraseMs = 50, pauseMs = 2300, reduce = false }: Options) {
  const [text, setText] = useState(defaultText);
  const [announce, setAnnounce] = useState<string>(defaultText);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending timers on unmount
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  useEffect(() => {
    if (reduce) { setText(defaultText); setAnnounce(defaultText); return; }
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }

    // No active target: animate back to default (erase then type once)
    if (!target) {
      if (text === defaultText) return;
      let pos = text.length;
      const current = text;
      const erase = () => {
        if (pos > 0) {
          pos -= 1; setText(current.slice(0, pos));
          timer.current = window.setTimeout(erase, eraseMs);
        } else {
          let p = 0;
          const type = () => {
            if (p < defaultText.length) {
              p += 1; setText(defaultText.slice(0, p));
              timer.current = window.setTimeout(type, typeMs);
            } else {
              setAnnounce(defaultText);
            }
          };
          timer.current = window.setTimeout(type, typeMs);
        }
      };
      timer.current = window.setTimeout(erase, eraseMs);
      return;
    }

    // Active target: always erase first, then loop type/pause/erase while target stays the same
    const current = text;
    let pos = current.length;
    let phase: 'eraseFirst' | 'type' | 'pause' | 'eraseLoop' = 'eraseFirst';
    const run = () => {
      if (phase === 'eraseFirst') {
        if (pos > 0) { pos -= 1; setText(current.slice(0, pos)); timer.current = window.setTimeout(run, eraseMs); }
        else { phase = 'type'; timer.current = window.setTimeout(run, typeMs); }
      } else if (phase === 'type') {
        if (pos < (target as string).length) { pos += 1; setText((target as string).slice(0, pos)); timer.current = window.setTimeout(run, typeMs); }
        else { setAnnounce(target as string); phase = 'pause'; timer.current = window.setTimeout(run, pauseMs); }
      } else if (phase === 'eraseLoop') {
        if (pos > 0) { pos -= 1; setText((target as string).slice(0, pos)); timer.current = window.setTimeout(run, eraseMs); }
        else { phase = 'type'; timer.current = window.setTimeout(run, typeMs); }
      } else { // pause -> eraseLoop
        phase = 'eraseLoop'; timer.current = window.setTimeout(run, eraseMs);
      }
    };
    timer.current = window.setTimeout(run, 200);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduce]);

  return { text, announce };
}

export default useTypewriter;
