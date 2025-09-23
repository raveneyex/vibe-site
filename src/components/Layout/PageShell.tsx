import { useState, useEffect, type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode
}

export default function PageShell(props: PageShellProps) {
  const { children } = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  

  return (
    <main
      id="content"
      tabIndex={-1}
      role="main"
      className="min-h-[calc(100vh-6rem)] px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative overflow-hidden"
    >
      <div
        className={
          'route-enter transition-all duration-500 ease-snappy will-change-transform' +
          (ready
            ? ' opacity-100 translate-y-0'
            : ' opacity-0 translate-y-2')
        }
      >
        {children}
      </div>
    </main>
  );
}