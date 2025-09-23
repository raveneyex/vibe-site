import { HoverCard } from "@/components/NavDeck/types";
import { useEffect } from "react";

const root = document.documentElement;
const cyan = 'rgba(0,255,163,0.12)';
const purple = 'rgba(168,85,247,0.14)';
const red = 'rgba(255,56,100,0.14)';

export default function useBackgroundTintOnHover(hoverCard: HoverCard) {
  useEffect(() => { 
    const tint = hoverCard === 'mag' ? purple : hoverCard === 'tat' ? red : cyan;
    root.style.setProperty('--tint', tint);
    return () => {
      // reset on unmount
      root.style.setProperty('--tint', cyan);
    };
  }, [hoverCard]);
}